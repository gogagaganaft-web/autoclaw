package main

import (
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

type filterCondition struct {
	field string
	op    string
	value interface{}
}

type filterNode struct {
	op         string
	conditions []filterNode
	leaf       *filterCondition
}

func parseFilter(raw json.RawMessage, columns []string) (func(row []interface{}) bool, error) {
	if raw == nil || string(raw) == "null" || string(raw) == "" {
		return nil, nil
	}

	var parsed interface{}
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return nil, err
	}

	node, err := buildFilterNode(parsed, columns)
	if err != nil {
		return nil, err
	}

	return compileMatcher(node, columns), nil
}

func buildFilterNode(item interface{}, columns []string) (filterNode, error) {
	list, ok := item.([]interface{})
	if !ok {
		return filterNode{}, fmt.Errorf("filter node must be array, got %T", item)
	}

	if len(list) == 0 {
		return filterNode{op: "leaf", leaf: &filterCondition{field: "", op: "true", value: true}}, nil
	}

	if len(list) == 3 && isString(list[0]) && isOperator(list[1]) {
		field, _ := list[0].(string)
		op, _ := list[1].(string)
		value := list[2]
		value = normalizeValue(value)
		return filterNode{
			op:   "leaf",
			leaf: &filterCondition{field: field, op: op, value: value},
		}, nil
	}

	if len(list) >= 2 {
		if len(list) >= 3 && isLogicalOp(list[1]) {
			op, _ := list[1].(string)
			left, err := buildFilterNode(list[0], columns)
			if err != nil {
				return filterNode{}, err
			}
			var right filterNode
			if _, ok := list[2].([]interface{}); ok {
				right, err = buildFilterNode(list[2], columns)
			} else {
				right, err = buildFilterNode([]interface{}{list[2]}, columns)
			}
			if err != nil {
				return filterNode{}, err
			}
			nodes := []filterNode{left, right}
			for i := 3; i < len(list); i += 2 {
				if i+1 < len(list) && isLogicalOp(list[i]) {
					next, err := buildFilterNode(list[i+1], columns)
					if err != nil {
						return filterNode{}, err
					}
					nodes = append(nodes, next)
				}
			}
			return filterNode{op: op, conditions: nodes}, nil
		}

		nodes := make([]filterNode, 0, len(list))
		for _, item := range list {
			sub, err := buildFilterNode(item, columns)
			if err != nil {
				return filterNode{}, err
			}
			nodes = append(nodes, sub)
		}
		return filterNode{op: "and", conditions: nodes}, nil
	}

	return filterNode{}, fmt.Errorf("invalid filter: %v", list)
}

func compileMatcher(node filterNode, columns []string) func(row []interface{}) bool {
	switch node.op {
	case "leaf":
		if node.leaf.op == "true" {
			return func(row []interface{}) bool { return true }
		}
		return compileLeaf(node.leaf, columns)
	case "and":
		subs := make([]func(row []interface{}) bool, len(node.conditions))
		for i, c := range node.conditions {
			subs[i] = compileMatcher(c, columns)
		}
		return func(row []interface{}) bool {
			for _, fn := range subs {
				if !fn(row) {
					return false
				}
			}
			return true
		}
	case "or":
		subs := make([]func(row []interface{}) bool, len(node.conditions))
		for i, c := range node.conditions {
			subs[i] = compileMatcher(c, columns)
		}
		return func(row []interface{}) bool {
			for _, fn := range subs {
				if fn(row) {
					return true
				}
			}
			return false
		}
	}
	return func(row []interface{}) bool { return true }
}

func compileLeaf(cond *filterCondition, columns []string) func(row []interface{}) bool {
	colIndex := -1
	for i, c := range columns {
		if c == cond.field {
			colIndex = i
			break
		}
	}
	if colIndex < 0 {
		return func(row []interface{}) bool { return false }
	}

	op := cond.op
	val := cond.value

	switch op {
	case "=":
		return func(row []interface{}) bool {
			return compareEqual(row[colIndex], val)
		}
	case "<>":
		return func(row []interface{}) bool {
			return !compareEqual(row[colIndex], val)
		}
	case ">":
		return func(row []interface{}) bool {
			return compareNumeric(row[colIndex], val) > 0
		}
	case ">=":
		return func(row []interface{}) bool {
			return compareNumeric(row[colIndex], val) >= 0
		}
	case "<":
		return func(row []interface{}) bool {
			return compareNumeric(row[colIndex], val) < 0
		}
	case "<=":
		return func(row []interface{}) bool {
			return compareNumeric(row[colIndex], val) <= 0
		}
	case "contains":
		return func(row []interface{}) bool {
			return stringContains(row[colIndex], val)
		}
	case "notcontains":
		return func(row []interface{}) bool {
			return !stringContains(row[colIndex], val)
		}
	case "startswith":
		return func(row []interface{}) bool {
			return stringStartsWith(row[colIndex], val)
		}
	case "endswith":
		return func(row []interface{}) bool {
			return stringEndsWith(row[colIndex], val)
		}
	}

	return func(row []interface{}) bool { return true }
}

func isOperator(v interface{}) bool {
	op, ok := v.(string)
	if !ok {
		return false
	}
	switch op {
	case "=", "<>", ">", ">=", "<", "<=", "contains", "notcontains", "startswith", "endswith":
		return true
	}
	return false
}

func isLogicalOp(v interface{}) bool {
	op, ok := v.(string)
	return ok && (op == "and" || op == "or")
}

func isString(v interface{}) bool {
	_, ok := v.(string)
	return ok
}

func normalizeValue(v interface{}) interface{} {
	switch val := v.(type) {
	case string:
		if f, err := strconv.ParseFloat(val, 64); err == nil {
			return f
		}
		return strings.ToLower(val)
	case float64:
		return val
	case bool:
		return val
	case nil:
		return nil
	default:
		return fmt.Sprintf("%v", val)
	}
}

func valueToString(v interface{}) string {
	if v == nil {
		return ""
	}
	switch val := v.(type) {
	case string:
		return strings.ToLower(val)
	case float64:
		return strconv.FormatFloat(val, 'f', -1, 64)
	case int64:
		return strconv.FormatInt(val, 10)
	case bool:
		if val {
			return "true"
		}
		return "false"
	default:
		return strings.ToLower(fmt.Sprintf("%v", val))
	}
}

func compareEqual(a, b interface{}) bool {
	if a == nil && b == nil {
		return true
	}
	if a == nil || b == nil {
		return false
	}

	af, aOk := toFloat(a)
	bf, bOk := toFloat(b)
	if aOk && bOk {
		return af == bf
	}

	return valueToString(a) == valueToString(b)
}

func compareNumeric(a, b interface{}) float64 {
	af, aOk := toFloat(a)
	bf, bOk := toFloat(b)
	if aOk && bOk {
		return af - bf
	}
	return float64(strings.Compare(valueToString(a), valueToString(b)))
}

func toFloat(v interface{}) (float64, bool) {
	switch val := v.(type) {
	case float64:
		return val, true
	case int64:
		return float64(val), true
	case int:
		return float64(val), true
	case string:
		if f, err := strconv.ParseFloat(val, 64); err == nil {
			return f, true
		}
		return 0, false
	case json.Number:
		if f, err := val.Float64(); err == nil {
			return f, true
		}
		return 0, false
	default:
		return 0, false
	}
}

func stringContains(a, b interface{}) bool {
	return strings.Contains(valueToString(a), valueToString(b))
}

func stringStartsWith(a, b interface{}) bool {
	return strings.HasPrefix(valueToString(a), valueToString(b))
}

func stringEndsWith(a, b interface{}) bool {
	return strings.HasSuffix(valueToString(a), valueToString(b))
}

type sortCondition struct {
	selector string
	desc     bool
}

func applySort(rows [][]interface{}, columns []string, raw json.RawMessage) error {
	if raw == nil || string(raw) == "null" || string(raw) == "" {
		return nil
	}

	var parsed []interface{}
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return err
	}

	conditions := make([]sortCondition, 0, len(parsed))
	for _, item := range parsed {
		switch v := item.(type) {
		case string:
			conditions = append(conditions, sortCondition{selector: v, desc: false})
		case map[string]interface{}:
			sel, _ := v["selector"].(string)
			desc, _ := v["desc"].(bool)
			if sel != "" {
				conditions = append(conditions, sortCondition{selector: sel, desc: desc})
			}
		}
	}

	if len(conditions) == 0 {
		return nil
	}

	type sortCol struct {
		index int
		desc  bool
	}
	sortCols := make([]sortCol, 0, len(conditions))
	for _, c := range conditions {
		for i, col := range columns {
			if col == c.selector {
				sortCols = append(sortCols, sortCol{index: i, desc: c.desc})
				break
			}
		}
	}
	if len(sortCols) == 0 {
		return nil
	}

	sort.SliceStable(rows, func(i, j int) bool {
		for _, sc := range sortCols {
			a := rows[i][sc.index]
			b := rows[j][sc.index]

			af, aOK := toFloat(a)
			bf, bOK := toFloat(b)
			var cmp int
			if aOK && bOK {
				if af < bf {
					cmp = -1
				} else if af > bf {
					cmp = 1
				} else {
					cmp = 0
				}
			} else {
				cmp = strings.Compare(valueToString(a), valueToString(b))
			}

			if cmp != 0 {
				if sc.desc {
					return cmp > 0
				}
				return cmp < 0
			}
		}
		return false
	})

	return nil
}

func getDistinctValues(rows [][]interface{}, colIndex int) []interface{} {
	seen := make(map[string]bool)
	result := make([]interface{}, 0)

	for _, row := range rows {
		if colIndex < 0 || colIndex >= len(row) {
			continue
		}
		val := row[colIndex]
		key := valueToString(val)
		if !seen[key] {
			seen[key] = true
			result = append(result, val)
		}
	}
	return result
}
