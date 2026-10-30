package main

import (
	"strings"

	"github.com/xuri/excelize/v2"
)

// buildPivotWorkbook формирует Excel-файл свода (широкая раскладка, как в просмотре):
//   - строка 1: заголовок отчёта (объединённый);
//   - строка 2: метки колонок свода (объединённые по числу полей данных);
//   - строка 3: названия полей;
//   - строки 4..N: комбинации строковых полей + значения по колонкам + итог строки;
//   - последняя строка: ИТОГО (по колонкам и общий).
//
// Оформление: заголовок, шапка, чередование строк, тонкие границы;
// числовой формат "0.00" (без группировки тысяч — в русской локали Excel
// разделитель групп не превращается в неразрывный пробел).
func buildPivotWorkbook(reportName string, rowSelectors, colSelectors []string, aggs []pivotAgg,
	rowCombos, colCombos []*pivotCombo, mat [][]*pivotCell, rowTotals, colTotals []*pivotCell, grand *pivotCell) (*excelize.File, error) {
	f := excelize.NewFile()
	sheet := "Свод"
	if err := f.SetSheetName("Sheet1", sheet); err != nil {
		return nil, err
	}
	nR := len(rowSelectors)
	K := len(aggs)
	totalCols := nR + (len(colCombos)+1)*K

	border := []excelize.Border{
		{Style: 1, Color: "000000", Type: "left"},
		{Style: 1, Color: "000000", Type: "right"},
		{Style: 1, Color: "000000", Type: "top"},
		{Style: 1, Color: "000000", Type: "bottom"},
	}
	titleStyle, _ := f.NewStyle(&excelize.Style{
		Font:      &excelize.Font{Bold: true, Size: 14},
		Alignment: &excelize.Alignment{Horizontal: "center", Vertical: "center"},
	})
	headStyle, _ := f.NewStyle(&excelize.Style{
		Font:      &excelize.Font{Bold: true},
		Alignment: &excelize.Alignment{Horizontal: "center", Vertical: "center", WrapText: true},
		Border:    border,
	})
	totalStyle, _ := f.NewStyle(&excelize.Style{
		Font:   &excelize.Font{Bold: true},
		NumFmt: 2,
		Border: border,
	})
	headTotalStyle, _ := f.NewStyle(&excelize.Style{
		Font:      &excelize.Font{Bold: true},
		Alignment: &excelize.Alignment{Horizontal: "center", Vertical: "center", WrapText: true},
		Border:    border,
	})
	zebraEven, _ := f.NewStyle(&excelize.Style{
		Border: border,
	})
	zebraOdd, _ := f.NewStyle(&excelize.Style{
		Border: border,
	})
	numEven, _ := f.NewStyle(&excelize.Style{
		NumFmt: 2,
		Border: border,
	})
	numOdd, _ := f.NewStyle(&excelize.Style{
		NumFmt: 2,
		Border: border,
	})

	// Строка 1: заголовок отчёта.
	lastCol, _ := excelize.CoordinatesToCellName(totalCols, 1)
	title := reportName
	if title == "" {
		title = "Свод"
	}
	_ = f.MergeCell(sheet, "A1", lastCol)
	_ = f.SetCellValue(sheet, "A1", title)
	_ = f.SetCellStyle(sheet, "A1", "A1", titleStyle)
	_ = f.SetRowHeight(sheet, 1, 25)

	// Строка 2: метки колонок свода.
	col := nR + 1
	for _, cc := range colCombos {
		label := ""
		if len(colSelectors) > 0 {
			parts := make([]string, len(cc.vals))
			for i, v := range cc.vals {
				parts[i] = fmtVal(v)
			}
			label = strings.Join(parts, " / ")
		}
		if K > 1 {
			start, _ := excelize.CoordinatesToCellName(col, 2)
			end, _ := excelize.CoordinatesToCellName(col+K-1, 2)
			_ = f.MergeCell(sheet, start, end)
		}
		if label != "" {
			cell, _ := excelize.CoordinatesToCellName(col, 2)
			_ = f.SetCellValue(sheet, cell, label)
		}
		col += K
	}
	if len(colCombos) > 0 {
		start, _ := excelize.CoordinatesToCellName(col, 2)
		end, _ := excelize.CoordinatesToCellName(col+K-1, 2)
		_ = f.MergeCell(sheet, start, end)
		_ = f.SetCellValue(sheet, start, "Итого")
	}

	// Строка 3: названия полей.
	row3 := make([]interface{}, 0, totalCols)
	for i := 0; i < nR; i++ {
		row3 = append(row3, rowSelectors[i])
	}
	for range colCombos {
		for _, ag := range aggs {
			row3 = append(row3, pivotAggCaption(ag))
		}
	}
	for _, ag := range aggs {
		row3 = append(row3, pivotAggCaption(ag))
	}
	if err := f.SetSheetRow(sheet, "A3", &row3); err != nil {
		return nil, err
	}
	_ = f.SetRowHeight(sheet, 2, 25)
	_ = f.SetRowHeight(sheet, 3, 25)

	// Стили для заголовочных строк.
	if nR > 0 {
		_ = f.SetCellStyle(sheet, "A2", "A3", headStyle)
	}
	if totalCols >= nR+1 {
		first, _ := excelize.CoordinatesToCellName(nR+1, 2)
		last, _ := excelize.CoordinatesToCellName(totalCols, 2)
		_ = f.SetCellStyle(sheet, first, last, headTotalStyle)
	}
	lastHeader, _ := excelize.CoordinatesToCellName(totalCols, 3)
	_ = f.SetCellStyle(sheet, "A3", lastHeader, headStyle)
	lastCol2, _ := excelize.CoordinatesToCellName(totalCols, 2)
	_ = f.SetCellStyle(sheet, "A2", lastCol2, headStyle)

	// Данные: сначала значения (SetSheetRow — он не понимает excelize.Cell),
	// затем стили диапазонами строк (SetCellStyle): текст с чередованием,
	// числа с форматом "0.00".
	rowNo := 4
	onlyTotals := len(combinedSelectors(rowSelectors, colSelectors)) == 0
	if !onlyTotals {
		for ri, rc := range rowCombos {
			row := make([]interface{}, 0, totalCols)
			for _, v := range rc.vals {
				row = append(row, fmtVal(v))
			}
			for ci := range colCombos {
				cell := mat[ri][ci]
				for k := range aggs {
					if cell != nil {
						row = append(row, pivotValue(cell, aggs[k]))
					} else {
						row = append(row, nil)
					}
				}
			}
			for k := range aggs {
				if rowTotals[ri] != nil {
					row = append(row, pivotValue(rowTotals[ri], aggs[k]))
				} else {
					row = append(row, nil)
				}
			}
			cellName, _ := excelize.CoordinatesToCellName(1, rowNo)
			if err := f.SetSheetRow(sheet, cellName, &row); err != nil {
				return nil, err
			}
			var textStyle, numStyle int
			if rowNo%2 == 0 {
				textStyle, numStyle = zebraEven, numEven
			} else {
				textStyle, numStyle = zebraOdd, numOdd
			}
			start := 1
			if nR > 0 {
				lastText, _ := excelize.CoordinatesToCellName(nR, rowNo)
				_ = f.SetCellStyle(sheet, cellName, lastText, textStyle)
				start = nR + 1
			}
			if start <= totalCols {
				firstNum, _ := excelize.CoordinatesToCellName(start, rowNo)
				lastNum, _ := excelize.CoordinatesToCellName(totalCols, rowNo)
				_ = f.SetCellStyle(sheet, firstNum, lastNum, numStyle)
			}
			rowNo++
		}
	}

	// Итоговая строка.
	last := make([]interface{}, 0, totalCols)
	if nR > 0 {
		last = append(last, "Итого")
		for i := 1; i < nR; i++ {
			last = append(last, nil)
		}
	}
	for ci := range colCombos {
		for k := range aggs {
			if colTotals[ci] != nil {
				last = append(last, pivotValue(colTotals[ci], aggs[k]))
			} else {
				last = append(last, nil)
			}
		}
	}
	for k := range aggs {
		if grand != nil {
			last = append(last, pivotValue(grand, aggs[k]))
		} else {
			last = append(last, nil)
		}
	}
	cellName, _ := excelize.CoordinatesToCellName(1, rowNo)
	if err := f.SetSheetRow(sheet, cellName, &last); err != nil {
		return nil, err
	}
	lastCell, _ := excelize.CoordinatesToCellName(totalCols, rowNo)
	_ = f.SetCellStyle(sheet, cellName, lastCell, totalStyle)

	// Ширина колонок.
	lastColName, _ := excelize.CoordinatesToCellName(totalCols, 1)
	_ = f.SetColWidth(sheet, "A", lastColName, 16)

	// Заморозка заголовков.
	_ = f.SetPanes(sheet, &excelize.Panes{
		Freeze:      true,
		YSplit:      3,
		TopLeftCell: "A4",
		ActivePane:  "bottomLeft",
	})
	return f, nil
}

func combinedSelectors(a, b []string) []string {
	out := make([]string, 0, len(a)+len(b))
	out = append(out, a...)
	out = append(out, b...)
	return out
}
