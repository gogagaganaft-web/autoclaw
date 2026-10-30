import { createHotContext as __vite__createHotContext } from "/gr/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/queries-admin.vue");import { defineComponent as _defineComponent } from "/gr/node_modules/.vite/deps/vue.js?v=a53956ad";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "/gr/node_modules/.vite/deps/vue.js?v=a53956ad";
import { DxButton } from "/gr/src/msi-vue/button/index.js";
import { DxDataGrid } from "/gr/src/msi-vue/data-grid/index.js";
import { DxSelectBox } from "/gr/src/msi-vue/select-box/index.js";
import { DxTagBox } from "/gr/src/msi-vue/tag-box/index.js";
import { DxTextBox } from "/gr/src/msi-vue/text-box/index.js";
import FilterPreview from "/gr/src/components/library/filter-preview.vue";
import HistoryDrawer from "/gr/src/components/common/history-drawer.vue";
import SqlEditor from "/gr/src/components/report-editor/sql-editor.vue";
import { filtersApi } from "/gr/src/services/filters-api.ts";
import { queriesApi } from "/gr/src/services/queries-api.ts";
import { reportsApi } from "/gr/src/services/reports-api.ts";
import { filterPrototype } from "/gr/src/utils/filter-prototypes.ts";
import { dynamicFilterValue, placeholderTokens } from "/gr/src/utils/filter-values.ts";
import { interpolateQuery } from "/gr/src/utils/query-interpolate.ts";
const _sfc_main = /*@__PURE__*/ _defineComponent({
	__name: "queries-admin",
	setup(__props, { expose: __expose }) {
		__expose();
		const items = ref([]);
		const filterDefs = ref([]);
		const dbOptions = ref([]);
		const status = ref("");
		const statusError = ref(false);
		const running = ref(false);
		const isNew = ref(false);
		const propsOpen = ref(true);
		const propsWidth = ref(380);
		const editorHeight = ref(340);
		const current = reactive({
			key: "",
			title: "",
			tags: [],
			db_key: "",
			filters: [],
			sql: ""
		});
		const draft = reactive({ sql: "" });
		const values = reactive({});
		const historyOpen = ref(false);
		const historyTitle = ref("");
		const historyItems = ref([]);
		const resultRows = ref([]);
		const resultColumns = ref([]);
		const resultHint = ref("");
		const editorRef = ref(null);
		// ─── ВЫЧИСЛЯЕМЫЕ ─────────────────────────────────────────────────────────────
		const canRun = computed(() => Boolean(draft.sql.trim()) && !running.value);
		const canSave = computed(() => Boolean(current.key.trim() && current.title.trim() && draft.sql.trim()));
		const dbLabel = computed(() => {
			const found = dbOptions.value.find((item) => item.id === current.db_key);
			return found ? found.name : current.db_key;
		});
		const filterOptions = computed(() => filterDefs.value.map((def) => ({
			field: def.field,
			caption: `${def.field} — ${def.label || def.type}`
		})));
		const themeOptions = computed(() => {
			const all = new Set();
			for (const item of items.value) {
				for (const tag of item.tags || []) all.add(tag);
			}
			return [...all].sort();
		});
		const selectedDefs = computed(() => filterDefs.value.filter((def) => current.filters.includes(def.field)));
		const insertTokens = computed(() => {
			const tokens = [];
			for (const def of selectedDefs.value) {
				const proto = filterPrototype(def.type);
				if (!proto) continue;
				tokens.push(...placeholderTokens(proto, def.field, def.config.var));
			}
			return [...new Set(tokens)];
		});
		// ─── ЗАГРУЗКА ───────────────────────────────────────────────────────────────
		async function load() {
			try {
				const [list, filters, databases] = await Promise.all([
					queriesApi.list(),
					filtersApi.list().catch(() => ({
						filters: [],
						total: 0
					})),
					reportsApi.getDatabases().catch(() => ({ databases: [] }))
				]);
				items.value = list.queries || [];
				filterDefs.value = filters.filters || [];
				dbOptions.value = (databases.databases || []).map((db) => ({
					id: db.id,
					name: db.name
				}));
				if (!items.value.length) return;
				const stillExists = items.value.some((item) => item.key === current.key);
				if (!stillExists) {
					open(items.value[0].key);
				}
			} catch (e) {
				status.value = `Не удалось прочитать запросы: ${e.message}`;
				statusError.value = true;
			}
		}
		function applyQuery(item) {
			current.key = item.key;
			current.title = item.title || "";
			current.tags = [...item.tags || []];
			current.db_key = item.db_key || "";
			current.filters = [...item.filters || []];
			current.sql = item.sql || "";
			draft.sql = item.sql || "";
			isNew.value = false;
			for (const key of Object.keys(values)) delete values[key];
			resultRows.value = [];
			resultColumns.value = [];
			resultHint.value = "";
		}
		function open(key) {
			const item = items.value.find((row) => row.key === key);
			if (!item) return;
			applyQuery(item);
			status.value = "";
			statusError.value = false;
		}
		function createNew() {
			current.key = "";
			current.title = "";
			current.tags = [];
			current.db_key = "";
			current.filters = [];
			current.sql = "";
			draft.sql = "";
			isNew.value = true;
			propsOpen.value = true;
			resultRows.value = [];
			resultColumns.value = [];
			resultHint.value = "";
			status.value = "Новый запрос: заполните свойства и SQL";
			statusError.value = false;
		}
		function duplicate() {
			if (!current.key) return;
			current.key = "";
			current.title = `${current.title} (копия)`;
			isNew.value = true;
			propsOpen.value = true;
			status.value = "Копия создана — задайте ключ";
			statusError.value = false;
		}
		// ─── СОХРАНЕНИЕ ─────────────────────────────────────────────────────────────
		function validate() {
			const errors = [];
			const key = current.key.trim();
			if (!key) errors.push("Укажите ключ запроса");
			else if (!/^[A-Za-zА-Яа-яЁё_][A-Za-zА-Яа-яЁё0-9_]*$/.test(key)) {
				errors.push("Ключ: буквы, цифры и подчёркивание, без пробелов");
			} else if (isNew.value && items.value.some((item) => item.key === key)) {
				errors.push(`Ключ «${key}» уже занят`);
			}
			if (!current.title.trim()) errors.push("Укажите название");
			if (!draft.sql.trim()) errors.push("SQL не заполнен");
			return errors;
		}
		async function save() {
			const errors = validate();
			if (errors.length) {
				status.value = errors[0];
				statusError.value = true;
				return;
			}
			const payload = {
				key: current.key.trim(),
				title: current.title.trim(),
				tags: current.tags,
				db_key: current.db_key,
				filters: current.filters,
				sql: draft.sql,
				columns: resultColumns.value.map((column) => ({
					dataField: column.dataField,
					caption: column.caption
				}))
			};
			try {
				if (isNew.value) {
					await queriesApi.create(payload);
					isNew.value = false;
					current.key = payload.key;
				} else {
					await queriesApi.update(current.key, payload);
				}
				await load();
				status.value = `Сохранено: ${payload.key}`;
				statusError.value = false;
			} catch (e) {
				status.value = `Не удалось сохранить: ${e.message}`;
				statusError.value = true;
			}
		}
		async function removeCurrent() {
			if (!current.key) return;
			if (!window.confirm(`Удалить запрос «${current.key}»?`)) return;
			try {
				await queriesApi.remove(current.key);
				current.key = "";
				await load();
				status.value = "Запрос удалён";
				statusError.value = false;
			} catch (e) {
				status.value = `Не удалось удалить: ${e.message}`;
				statusError.value = true;
			}
		}
		// ─── ВЫПОЛНЕНИЕ ─────────────────────────────────────────────────────────────
		async function openHistory() {
			if (!current.key) return;
			try {
				const data = await queriesApi.history(current.key);
				historyTitle.value = current.key;
				historyItems.value = (data.revisions || []).map((revision) => ({
					id: revision.id,
					action: revision.action,
					at: revision.changed_at,
					by: revision.changed_by,
					detail: revision.sql ? revision.sql.slice(0, 400) : undefined
				}));
				historyOpen.value = true;
			} catch (e) {
				status.value = `История недоступна: ${e.message}`;
				statusError.value = true;
			}
		}
		/** Динамические умолчания фильтров — как в боевом dynamicDefault. */
		function applyDefaults() {
			let filled = 0;
			for (const def of selectedDefs.value) {
				const proto = filterPrototype(def.type);
				if (!proto) continue;
				const value = dynamicFilterValue(proto);
				if (value === undefined) continue;
				values[def.field] = value;
				filled += 1;
			}
			status.value = filled ? `Подставлены значения по умолчанию: ${filled}` : "У выбранных фильтров нет динамических значений";
			statusError.value = filled === 0;
		}
		function setValue(field, value) {
			values[field] = value;
		}
		function insert(token) {
			editorRef.value?.insertPlaceholder(token);
		}
		function columnsFromResult(raw) {
			return raw.map((column, index) => {
				if (typeof column === "string") {
					return {
						dataField: column,
						caption: column
					};
				}
				const rec = column;
				return {
					dataField: String(rec.dataField ?? rec.name ?? `col${index + 1}`),
					caption: String(rec.caption ?? rec.dataField ?? rec.name ?? `col${index + 1}`)
				};
			});
		}
		async function run() {
			if (isNew.value) {
				status.value = "Сначала сохраните запрос";
				statusError.value = true;
				return;
			}
			const result = interpolateQuery(draft.sql, values);
			if (result.unresolved.length) {
				status.value = `Не заполнены значения: ${result.unresolved.join(", ")}`;
				statusError.value = true;
				return;
			}
			running.value = true;
			status.value = "Выполняется…";
			statusError.value = false;
			try {
				const response = await queriesApi.execute(current.db_key || "", result.sql);
				if (response.error) throw new Error(response.error);
				const columns = columnsFromResult(response.columns || []);
				const rows = (response.rows || []).map((row) => {
					const record = {};
					columns.forEach((column, index) => {
						record[column.dataField] = Array.isArray(row) ? row[index] : null;
					});
					return record;
				});
				resultColumns.value = columns.map((column) => ({
					dataField: column.dataField,
					caption: column.caption || column.dataField
				}));
				resultRows.value = rows;
				resultHint.value = `Строк: ${rows.length}${result.removedClauses ? `, вырезано условий: ${result.removedClauses}` : ""}`;
				await queriesApi.saveColumns(current.key, columns).catch(() => undefined);
				status.value = `Выполнено: ${rows.length} строк`;
				statusError.value = false;
			} catch (e) {
				resultRows.value = [];
				status.value = `Ошибка выполнения: ${e.message}`;
				statusError.value = true;
			} finally {
				running.value = false;
			}
		}
		// ─── РАЗДЕЛИТЕЛЬ ────────────────────────────────────────────────────────────
		let resizingVertical = false;
		let resizeStartY = 0;
		let resizeStartHeight = 0;
		function onVerticalMove(event) {
			if (!resizingVertical) return;
			const delta = event.clientY - resizeStartY;
			editorHeight.value = Math.min(window.innerHeight - 260, Math.max(140, resizeStartHeight + delta));
		}
		function stopVerticalResize() {
			resizingVertical = false;
			document.removeEventListener("mousemove", onVerticalMove);
			document.removeEventListener("mouseup", stopVerticalResize);
		}
		function startVerticalResize(event) {
			resizingVertical = true;
			resizeStartY = event.clientY;
			resizeStartHeight = editorHeight.value;
			document.addEventListener("mousemove", onVerticalMove);
			document.addEventListener("mouseup", stopVerticalResize);
		}
		onMounted(() => {
			void load();
		});
		onBeforeUnmount(() => {
			document.removeEventListener("mousemove", onVerticalMove);
			document.removeEventListener("mouseup", stopVerticalResize);
		});
		const __returned__ = {
			items,
			filterDefs,
			dbOptions,
			status,
			statusError,
			running,
			isNew,
			propsOpen,
			propsWidth,
			editorHeight,
			current,
			draft,
			values,
			historyOpen,
			historyTitle,
			historyItems,
			resultRows,
			resultColumns,
			resultHint,
			editorRef,
			canRun,
			canSave,
			dbLabel,
			filterOptions,
			themeOptions,
			selectedDefs,
			insertTokens,
			load,
			applyQuery,
			open,
			createNew,
			duplicate,
			validate,
			save,
			removeCurrent,
			openHistory,
			applyDefaults,
			setValue,
			insert,
			columnsFromResult,
			run,
			get resizingVertical() {
				return resizingVertical;
			},
			set resizingVertical(v) {
				resizingVertical = v;
			},
			get resizeStartY() {
				return resizeStartY;
			},
			set resizeStartY(v) {
				resizeStartY = v;
			},
			get resizeStartHeight() {
				return resizeStartHeight;
			},
			set resizeStartHeight(v) {
				resizeStartHeight = v;
			},
			onVerticalMove,
			stopVerticalResize,
			startVerticalResize,
			get DxButton() {
				return DxButton;
			},
			get DxDataGrid() {
				return DxDataGrid;
			},
			get DxSelectBox() {
				return DxSelectBox;
			},
			get DxTagBox() {
				return DxTagBox;
			},
			get DxTextBox() {
				return DxTextBox;
			},
			FilterPreview,
			HistoryDrawer,
			SqlEditor
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
import { createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, vShow as _vShow, withDirectives as _withDirectives } from "/gr/node_modules/.vite/deps/vue.js?v=a53956ad";
const _hoisted_1 = { class: "view-wrapper qa" };
const _hoisted_2 = { class: "qa__toolbar theme-dependent" };
const _hoisted_3 = { class: "qa__body" };
const _hoisted_4 = { class: "qa__list theme-dependent" };
const _hoisted_5 = { class: "qa__list-head" };
const _hoisted_6 = { class: "qa__count" };
const _hoisted_7 = { class: "qa__list-body" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "qa__list-title" };
const _hoisted_10 = { class: "qa__list-key" };
const _hoisted_11 = {
	key: 0,
	class: "qa__list-tags"
};
const _hoisted_12 = {
	key: 0,
	class: "qa__empty"
};
const _hoisted_13 = { class: "qa__editor" };
const _hoisted_14 = { class: "qa__editor-head" };
const _hoisted_15 = { class: "qa__title" };
const _hoisted_16 = { class: "qa__meta" };
const _hoisted_17 = { class: "qa__chips" };
const _hoisted_18 = ["title", "onClick"];
const _hoisted_19 = {
	key: 1,
	class: "qa__hint"
};
const _hoisted_20 = { class: "qa__result" };
const _hoisted_21 = {
	key: 0,
	class: "qa__result-hint"
};
const _hoisted_22 = { class: "qa__props-head" };
const _hoisted_23 = { class: "qa__props-body" };
const _hoisted_24 = { class: "qa__field" };
const _hoisted_25 = { class: "qa__field" };
const _hoisted_26 = { class: "qa__field" };
const _hoisted_27 = { class: "qa__field" };
const _hoisted_28 = { class: "qa__field" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return _openBlock(), _createElementBlock("div", _hoisted_1, [
		_createElementVNode("div", _hoisted_2, [
			_createVNode($setup["DxButton"], {
				icon: "refresh",
				"styling-mode": "outlined",
				hint: "Обновить список",
				onClick: _cache[0] || (_cache[0] = ($event) => $setup.load())
			}),
			_createVNode($setup["DxButton"], {
				icon: "plus",
				"styling-mode": "outlined",
				hint: "Новый запрос",
				onClick: _cache[1] || (_cache[1] = ($event) => $setup.createNew())
			}),
			_createVNode($setup["DxButton"], {
				icon: "copy",
				"styling-mode": "outlined",
				hint: "Дублировать",
				disabled: !$setup.current.key,
				onClick: _cache[2] || (_cache[2] = ($event) => $setup.duplicate())
			}, null, 8, ["disabled"]),
			_createVNode($setup["DxButton"], {
				icon: "trash",
				"styling-mode": "outlined",
				hint: "Удалить",
				disabled: !$setup.current.key,
				onClick: _cache[3] || (_cache[3] = ($event) => $setup.removeCurrent())
			}, null, 8, ["disabled"]),
			_cache[17] || (_cache[17] = _createElementVNode(
				"span",
				{ class: "qa__spacer" },
				null,
				-1
				/* CACHED */
			)),
			$setup.status ? (_openBlock(), _createElementBlock(
				"span",
				{
					key: 0,
					class: _normalizeClass(["qa__status", { "qa__status--error": $setup.statusError }])
				},
				_toDisplayString($setup.status),
				3
				/* TEXT, CLASS */
			)) : _createCommentVNode("v-if", true),
			_createVNode($setup["DxButton"], {
				text: "Выполнить",
				icon: "run",
				type: "success",
				"styling-mode": "contained",
				disabled: !$setup.canRun,
				onClick: _cache[4] || (_cache[4] = ($event) => $setup.run())
			}, null, 8, ["disabled"]),
			_createVNode($setup["DxButton"], {
				text: "Сохранить",
				icon: "save",
				type: "default",
				"styling-mode": "contained",
				disabled: !$setup.canSave,
				onClick: _cache[5] || (_cache[5] = ($event) => $setup.save())
			}, null, 8, ["disabled"])
		]),
		_createElementVNode("div", _hoisted_3, [
			_createElementVNode("aside", _hoisted_4, [_createElementVNode("div", _hoisted_5, [_cache[18] || (_cache[18] = _createTextVNode(
				" Запросы ",
				-1
				/* CACHED */
			)), _createElementVNode(
				"span",
				_hoisted_6,
				_toDisplayString($setup.items.length),
				1
				/* TEXT */
			)]), _createElementVNode("div", _hoisted_7, [(_openBlock(true), _createElementBlock(
				_Fragment,
				null,
				_renderList($setup.items, (item) => {
					return _openBlock(), _createElementBlock("button", {
						key: item.key,
						type: "button",
						class: _normalizeClass(["qa__list-item", { "qa__list-item--active": item.key === $setup.current.key }]),
						onClick: ($event) => $setup.open(item.key)
					}, [
						_createElementVNode(
							"span",
							_hoisted_9,
							_toDisplayString(item.title),
							1
							/* TEXT */
						),
						_createElementVNode(
							"span",
							_hoisted_10,
							_toDisplayString(item.key),
							1
							/* TEXT */
						),
						item.tags.length ? (_openBlock(), _createElementBlock(
							"span",
							_hoisted_11,
							_toDisplayString(item.tags.join(" · ")),
							1
							/* TEXT */
						)) : _createCommentVNode("v-if", true)
					], 10, _hoisted_8);
				}),
				128
				/* KEYED_FRAGMENT */
			)), !$setup.items.length ? (_openBlock(), _createElementBlock("div", _hoisted_12, " Пока нет запросов ")) : _createCommentVNode("v-if", true)])]),
			_createElementVNode("section", _hoisted_13, [
				_createElementVNode("div", _hoisted_14, [
					_createElementVNode(
						"span",
						_hoisted_15,
						_toDisplayString($setup.current.title || "Новый запрос"),
						1
						/* TEXT */
					),
					_createElementVNode("span", _hoisted_16, [_createTextVNode(
						_toDisplayString($setup.current.key),
						1
						/* TEXT */
					), $setup.dbLabel ? (_openBlock(), _createElementBlock(
						_Fragment,
						{ key: 0 },
						[_createTextVNode(
							" · " + _toDisplayString($setup.dbLabel),
							1
							/* TEXT */
						)],
						64
						/* STABLE_FRAGMENT */
					)) : _createCommentVNode("v-if", true)]),
					_cache[19] || (_cache[19] = _createElementVNode(
						"span",
						{ class: "qa__spacer" },
						null,
						-1
						/* CACHED */
					)),
					_createVNode($setup["DxButton"], {
						icon: "edit",
						"styling-mode": "text",
						hint: "Свойства и значения фильтров",
						onClick: _cache[6] || (_cache[6] = ($event) => $setup.propsOpen = !$setup.propsOpen)
					})
				]),
				_createElementVNode("div", _hoisted_17, [$setup.insertTokens.length ? (_openBlock(true), _createElementBlock(
					_Fragment,
					{ key: 0 },
					_renderList($setup.insertTokens, (token) => {
						return _openBlock(), _createElementBlock("button", {
							key: token,
							type: "button",
							class: "qa__chip",
							title: "Вставить " + token,
							onClick: ($event) => $setup.insert(token)
						}, _toDisplayString(token), 9, _hoisted_18);
					}),
					128
					/* KEYED_FRAGMENT */
				)) : (_openBlock(), _createElementBlock("span", _hoisted_19, "Выберите фильтры в свойствах — появятся плейсхолдеры"))]),
				_createElementVNode(
					"div",
					{
						class: "qa__monaco",
						style: _normalizeStyle({ height: `${$setup.editorHeight}px` })
					},
					[_createVNode($setup["SqlEditor"], {
						ref: "editorRef",
						modelValue: $setup.draft.sql,
						"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.draft.sql = $event),
						height: Math.max(120, $setup.editorHeight - 10)
					}, null, 8, ["modelValue", "height"])],
					4
					/* STYLE */
				),
				_createElementVNode(
					"div",
					{
						class: "qa__hsplitter",
						onMousedown: $setup.startVerticalResize
					},
					null,
					32
					/* NEED_HYDRATION */
				),
				_createElementVNode("div", _hoisted_20, [$setup.resultHint ? (_openBlock(), _createElementBlock(
					"div",
					_hoisted_21,
					_toDisplayString($setup.resultHint),
					1
					/* TEXT */
				)) : _createCommentVNode("v-if", true), _createVNode($setup["DxDataGrid"], {
					"data-source": $setup.resultRows,
					columns: $setup.resultColumns,
					"show-borders": true,
					"column-auto-width": true,
					"allow-column-resizing": true,
					"hover-state-enabled": true,
					height: "100%"
				}, null, 8, ["data-source", "columns"])])
			]),
			_withDirectives(_createElementVNode(
				"aside",
				{
					class: "qa__props theme-dependent",
					style: _normalizeStyle({ width: `${$setup.propsWidth}px` })
				},
				[_createElementVNode("header", _hoisted_22, [
					_cache[20] || (_cache[20] = _createElementVNode(
						"span",
						null,
						"Свойства запроса",
						-1
						/* CACHED */
					)),
					_createVNode($setup["DxButton"], {
						icon: "clock",
						"styling-mode": "text",
						hint: "История изменений",
						disabled: !$setup.current.key,
						onClick: _cache[8] || (_cache[8] = ($event) => $setup.openHistory())
					}, null, 8, ["disabled"]),
					_createVNode($setup["DxButton"], {
						icon: "close",
						"styling-mode": "text",
						hint: "Закрыть",
						onClick: _cache[9] || (_cache[9] = ($event) => $setup.propsOpen = false)
					})
				]), _createElementVNode("div", _hoisted_23, [
					_createElementVNode("label", _hoisted_24, [_cache[21] || (_cache[21] = _createElementVNode(
						"span",
						{ class: "qa__field-label" },
						[_createTextVNode("Ключ "), _createElementVNode("b", null, "*")],
						-1
						/* CACHED */
					)), _createVNode($setup["DxTextBox"], {
						value: $setup.current.key,
						disabled: !$setup.isNew,
						hint: $setup.isNew ? "Латиница или кириллица, без пробелов" : "Ключ нельзя изменить",
						onValueChanged: _cache[10] || (_cache[10] = ($event) => $setup.current.key = $event.value)
					}, null, 8, [
						"value",
						"disabled",
						"hint"
					])]),
					_createElementVNode("label", _hoisted_25, [_cache[22] || (_cache[22] = _createElementVNode(
						"span",
						{ class: "qa__field-label" },
						[_createTextVNode("Название "), _createElementVNode("b", null, "*")],
						-1
						/* CACHED */
					)), _createVNode($setup["DxTextBox"], {
						value: $setup.current.title,
						onValueChanged: _cache[11] || (_cache[11] = ($event) => $setup.current.title = $event.value)
					}, null, 8, ["value"])]),
					_createElementVNode("label", _hoisted_26, [_cache[23] || (_cache[23] = _createElementVNode(
						"span",
						{ class: "qa__field-label" },
						"Темы",
						-1
						/* CACHED */
					)), _createVNode($setup["DxTagBox"], {
						value: $setup.current.tags,
						items: $setup.themeOptions,
						"accept-custom-value": true,
						"show-selection-controls": true,
						placeholder: "ОСВ, КТР, Платежи…",
						onValueChanged: _cache[12] || (_cache[12] = ($event) => $setup.current.tags = $event.value || [])
					}, null, 8, ["value", "items"])]),
					_createElementVNode("label", _hoisted_27, [_cache[24] || (_cache[24] = _createElementVNode(
						"span",
						{ class: "qa__field-label" },
						"База данных",
						-1
						/* CACHED */
					)), _createVNode($setup["DxSelectBox"], {
						value: $setup.current.db_key,
						items: $setup.dbOptions,
						"value-expr": "id",
						"display-expr": "name",
						"show-clear-button": true,
						placeholder: "Не выбрана",
						onValueChanged: _cache[13] || (_cache[13] = ($event) => $setup.current.db_key = $event.value)
					}, null, 8, ["value", "items"])]),
					_createElementVNode("label", _hoisted_28, [
						_cache[25] || (_cache[25] = _createElementVNode(
							"span",
							{ class: "qa__field-label" },
							"Фильтры запроса",
							-1
							/* CACHED */
						)),
						_createVNode($setup["DxTagBox"], {
							value: $setup.current.filters,
							items: $setup.filterOptions,
							"value-expr": "field",
							"display-expr": "caption",
							"search-enabled": true,
							"show-selection-controls": true,
							placeholder: "Выберите фильтры",
							onValueChanged: _cache[14] || (_cache[14] = ($event) => $setup.current.filters = $event.value || [])
						}, null, 8, ["value", "items"]),
						_cache[26] || (_cache[26] = _createElementVNode(
							"span",
							{ class: "qa__hint" },
							"Из них строится форма значений и плейсхолдеры.",
							-1
							/* CACHED */
						))
					]),
					$setup.selectedDefs.length ? (_openBlock(), _createElementBlock(
						_Fragment,
						{ key: 0 },
						[
							_cache[27] || (_cache[27] = _createElementVNode(
								"div",
								{ class: "qa__section-title" },
								" Значения фильтров ",
								-1
								/* CACHED */
							)),
							_createVNode($setup["DxButton"], {
								text: "Значения по умолчанию",
								icon: "refresh",
								"styling-mode": "outlined",
								hint: "Подставить динамические умолчания (прошлый месяц, начало месяца)",
								onClick: _cache[15] || (_cache[15] = ($event) => $setup.applyDefaults())
							}),
							(_openBlock(true), _createElementBlock(
								_Fragment,
								null,
								_renderList($setup.selectedDefs, (def) => {
									return _openBlock(), _createElementBlock("div", {
										key: def.field,
										class: "qa__value"
									}, [_createVNode($setup["FilterPreview"], {
										def: def.config,
										"initial-value": $setup.values[def.field],
										"onUpdate:value": ($event) => $setup.setValue(def.field, $event)
									}, null, 8, [
										"def",
										"initial-value",
										"onUpdate:value"
									])]);
								}),
								128
								/* KEYED_FRAGMENT */
							))
						],
						64
						/* STABLE_FRAGMENT */
					)) : _createCommentVNode("v-if", true)
				])],
				4
				/* STYLE */
			), [[_vShow, $setup.propsOpen]])
		]),
		_createVNode($setup["HistoryDrawer"], {
			visible: $setup.historyOpen,
			title: $setup.historyTitle,
			items: $setup.historyItems,
			onClose: _cache[16] || (_cache[16] = ($event) => $setup.historyOpen = false)
		}, null, 8, [
			"visible",
			"title",
			"items"
		])
	]);
}
import "/gr/src/pages/queries-admin.vue?vue&type=style&index=0&scoped=1cd1f2eb&lang.css";
_sfc_main.__hmrId = "1cd1f2eb";
typeof __VUE_HMR_RUNTIME__ !== "undefined" && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main);
import.meta.hot.on("file-changed", ({ file }) => {
	__VUE_HMR_RUNTIME__.CHANGED_FILE = file;
});
import.meta.hot.accept((mod) => {
	if (!mod) return;
	const { default: updated, _rerender_only } = mod;
	if (_rerender_only) {
		__VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render);
	} else {
		__VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated);
	}
});
import _export_sfc from "/gr/@id/__x00__plugin-vue:export-helper";
export default /*#__PURE__*/ _export_sfc(_sfc_main, [
	["render", _sfc_render],
	["__scopeId", "data-v-1cd1f2eb"],
	["__file", "C:/AUTOCLAW/msi-vue/src/pages/queries-admin.vue"]
]);

//# sourceMappingURL=data:application/json;base64,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V0FBRSxPQUFBLFFBQVEsVUFBVSxPQUFPLFNBQUssQ0FBQTs7TUFFaEQsT0FBQSxRQUFBLE9BQUEsTUFBQTtPQUE0RTtPQUFBLEVBQXRFLE9BQU0sV0FBVTtPQUFDO09BQThDLENBQUE7O01BQUE7O0tBR3ZELE9BQUEsYUFBYSxVQUE3QixXQUFBLEdBQUE7TUFzQlc7TUFBQSxFQUFBLEtBQUEsRUFBQTtNQUFBO09BckJULE9BQUEsUUFBQSxPQUFBLE1BQUE7UUFFTTtRQUFBLEVBRkQsT0FBTSxvQkFBbUI7UUFBQztRQUUvQixDQUFBOztPQUFBO09BQ0EsYUFNRSxPQUFBLGFBQUE7UUFMQSxNQUFLO1FBQ0wsTUFBSztRQUNMLGdCQUFhO1FBQ2IsTUFBSztRQUNKLFNBQUssT0FBQSxRQUFBLE9BQUEsT0FBQSxXQUFFLE9BQUEsY0FBYTs7UUFFdkIsV0FBQSxJQUFBLEdBQUE7UUFVTTtRQUFBO1FBQUEsWUFUVSxPQUFBLGVBQVAsUUFBRztTQURaLE9BQUEsV0FBQSxHQUFBLG9CQVVNLE9BQUE7VUFSSCxLQUFLLElBQUk7VUFDVixPQUFNO1MsSUFFTixhQUlFLE9BQUEsa0JBQUE7VUFIQyxLQUFLLElBQUk7VUFDVCxpQkFBZSxPQUFBLE9BQU8sSUFBSTtVQUMxQixtQkFBWSxXQUFFLE9BQUEsU0FBUyxJQUFJLE9BQU8sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7RyxJQW5HekMsQ0FBQSxRQUFBLE9BQUEsU0FBUyxDOztFQTJHckIsYUFLRSxPQUFBLGtCQUFBO0dBSkMsU0FBUyxPQUFBO0dBQ1QsT0FBTyxPQUFBO0dBQ1AsT0FBTyxPQUFBO0dBQ1AsU0FBSyxPQUFBLFFBQUEsT0FBQSxPQUFBLFdBQUUsT0FBQSxjQUFXIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbInF1ZXJpZXMtYWRtaW4udnVlIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInZpZXctd3JhcHBlciBxYVwiPlxuICAgIDxkaXYgY2xhc3M9XCJxYV9fdG9vbGJhciB0aGVtZS1kZXBlbmRlbnRcIj5cbiAgICAgIDxkeC1idXR0b25cbiAgICAgICAgaWNvbj1cInJlZnJlc2hcIlxuICAgICAgICBzdHlsaW5nLW1vZGU9XCJvdXRsaW5lZFwiXG4gICAgICAgIGhpbnQ9XCLQntCx0L3QvtCy0LjRgtGMINGB0L/QuNGB0L7QulwiXG4gICAgICAgIEBjbGljaz1cImxvYWQoKVwiXG4gICAgICAvPlxuICAgICAgPGR4LWJ1dHRvblxuICAgICAgICBpY29uPVwicGx1c1wiXG4gICAgICAgIHN0eWxpbmctbW9kZT1cIm91dGxpbmVkXCJcbiAgICAgICAgaGludD1cItCd0L7QstGL0Lkg0LfQsNC/0YDQvtGBXCJcbiAgICAgICAgQGNsaWNrPVwiY3JlYXRlTmV3KClcIlxuICAgICAgLz5cbiAgICAgIDxkeC1idXR0b25cbiAgICAgICAgaWNvbj1cImNvcHlcIlxuICAgICAgICBzdHlsaW5nLW1vZGU9XCJvdXRsaW5lZFwiXG4gICAgICAgIGhpbnQ9XCLQlNGD0LHQu9C40YDQvtCy0LDRgtGMXCJcbiAgICAgICAgOmRpc2FibGVkPVwiIWN1cnJlbnQua2V5XCJcbiAgICAgICAgQGNsaWNrPVwiZHVwbGljYXRlKClcIlxuICAgICAgLz5cbiAgICAgIDxkeC1idXR0b25cbiAgICAgICAgaWNvbj1cInRyYXNoXCJcbiAgICAgICAgc3R5bGluZy1tb2RlPVwib3V0bGluZWRcIlxuICAgICAgICBoaW50PVwi0KPQtNCw0LvQuNGC0YxcIlxuICAgICAgICA6ZGlzYWJsZWQ9XCIhY3VycmVudC5rZXlcIlxuICAgICAgICBAY2xpY2s9XCJyZW1vdmVDdXJyZW50KClcIlxuICAgICAgLz5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJxYV9fc3BhY2VyXCIgLz5cblxuICAgICAgPHNwYW5cbiAgICAgICAgdi1pZj1cInN0YXR1c1wiXG4gICAgICAgIGNsYXNzPVwicWFfX3N0YXR1c1wiXG4gICAgICAgIDpjbGFzcz1cInsgJ3FhX19zdGF0dXMtLWVycm9yJzogc3RhdHVzRXJyb3IgfVwiXG4gICAgICA+e3sgc3RhdHVzIH19PC9zcGFuPlxuICAgICAgPGR4LWJ1dHRvblxuICAgICAgICB0ZXh0PVwi0JLRi9C/0L7Qu9C90LjRgtGMXCJcbiAgICAgICAgaWNvbj1cInJ1blwiXG4gICAgICAgIHR5cGU9XCJzdWNjZXNzXCJcbiAgICAgICAgc3R5bGluZy1tb2RlPVwiY29udGFpbmVkXCJcbiAgICAgICAgOmRpc2FibGVkPVwiIWNhblJ1blwiXG4gICAgICAgIEBjbGljaz1cInJ1bigpXCJcbiAgICAgIC8+XG4gICAgICA8ZHgtYnV0dG9uXG4gICAgICAgIHRleHQ9XCLQodC+0YXRgNCw0L3QuNGC0YxcIlxuICAgICAgICBpY29uPVwic2F2ZVwiXG4gICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgc3R5bGluZy1tb2RlPVwiY29udGFpbmVkXCJcbiAgICAgICAgOmRpc2FibGVkPVwiIWNhblNhdmVcIlxuICAgICAgICBAY2xpY2s9XCJzYXZlKClcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJxYV9fYm9keVwiPlxuICAgICAgPGFzaWRlIGNsYXNzPVwicWFfX2xpc3QgdGhlbWUtZGVwZW5kZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxYV9fbGlzdC1oZWFkXCI+XG4gICAgICAgICAg0JfQsNC/0YDQvtGB0YsgPHNwYW4gY2xhc3M9XCJxYV9fY291bnRcIj57eyBpdGVtcy5sZW5ndGggfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicWFfX2xpc3QtYm9keVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiXG4gICAgICAgICAgICA6a2V5PVwiaXRlbS5rZXlcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cInFhX19saXN0LWl0ZW1cIlxuICAgICAgICAgICAgOmNsYXNzPVwieyAncWFfX2xpc3QtaXRlbS0tYWN0aXZlJzogaXRlbS5rZXkgPT09IGN1cnJlbnQua2V5IH1cIlxuICAgICAgICAgICAgQGNsaWNrPVwib3BlbihpdGVtLmtleSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWFfX2xpc3QtdGl0bGVcIj57eyBpdGVtLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxYV9fbGlzdC1rZXlcIj57eyBpdGVtLmtleSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIHYtaWY9XCJpdGVtLnRhZ3MubGVuZ3RoXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxYV9fbGlzdC10YWdzXCJcbiAgICAgICAgICAgID57eyBpdGVtLnRhZ3Muam9pbignIMK3ICcpIH19PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHYtaWY9XCIhaXRlbXMubGVuZ3RoXCJcbiAgICAgICAgICAgIGNsYXNzPVwicWFfX2VtcHR5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDQn9C+0LrQsCDQvdC10YIg0LfQsNC/0YDQvtGB0L7QslxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYXNpZGU+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwicWFfX2VkaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicWFfX2VkaXRvci1oZWFkXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJxYV9fdGl0bGVcIj57eyBjdXJyZW50LnRpdGxlIHx8ICfQndC+0LLRi9C5INC30LDQv9GA0L7RgScgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJxYV9fbWV0YVwiPlxuICAgICAgICAgICAge3sgY3VycmVudC5rZXkgfX08dGVtcGxhdGUgdi1pZj1cImRiTGFiZWxcIj4gwrcge3sgZGJMYWJlbCB9fTwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWFfX3NwYWNlclwiIC8+XG4gICAgICAgICAgPGR4LWJ1dHRvblxuICAgICAgICAgICAgaWNvbj1cImVkaXRcIlxuICAgICAgICAgICAgc3R5bGluZy1tb2RlPVwidGV4dFwiXG4gICAgICAgICAgICBoaW50PVwi0KHQstC+0LnRgdGC0LLQsCDQuCDQt9C90LDRh9C10L3QuNGPINGE0LjQu9GM0YLRgNC+0LJcIlxuICAgICAgICAgICAgQGNsaWNrPVwicHJvcHNPcGVuID0gIXByb3BzT3BlblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInFhX19jaGlwc1wiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiaW5zZXJ0VG9rZW5zLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB2LWZvcj1cInRva2VuIGluIGluc2VydFRva2Vuc1wiXG4gICAgICAgICAgICAgIDprZXk9XCJ0b2tlblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cInFhX19jaGlwXCJcbiAgICAgICAgICAgICAgOnRpdGxlPVwiJ9CS0YHRgtCw0LLQuNGC0YwgJyArIHRva2VuXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiaW5zZXJ0KHRva2VuKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IHRva2VuIH19XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB2LWVsc2VcbiAgICAgICAgICAgIGNsYXNzPVwicWFfX2hpbnRcIlxuICAgICAgICAgID7QktGL0LHQtdGA0LjRgtC1INGE0LjQu9GM0YLRgNGLINCyINGB0LLQvtC50YHRgtCy0LDRhSDigJQg0L/QvtGP0LLRj9GC0YHRjyDQv9C70LXQudGB0YXQvtC70LTQtdGA0Ys8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInFhX19tb25hY29cIlxuICAgICAgICAgIDpzdHlsZT1cInsgaGVpZ2h0OiBgJHtlZGl0b3JIZWlnaHR9cHhgIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgPHNxbC1lZGl0b3JcbiAgICAgICAgICAgIHJlZj1cImVkaXRvclJlZlwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiZHJhZnQuc3FsXCJcbiAgICAgICAgICAgIDpoZWlnaHQ9XCJNYXRoLm1heCgxMjAsIGVkaXRvckhlaWdodCAtIDEwKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwicWFfX2hzcGxpdHRlclwiXG4gICAgICAgICAgQG1vdXNlZG93bj1cInN0YXJ0VmVydGljYWxSZXNpemVcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxYV9fcmVzdWx0XCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgdi1pZj1cInJlc3VsdEhpbnRcIlxuICAgICAgICAgICAgY2xhc3M9XCJxYV9fcmVzdWx0LWhpbnRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IHJlc3VsdEhpbnQgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZHgtZGF0YS1ncmlkXG4gICAgICAgICAgICA6ZGF0YS1zb3VyY2U9XCJyZXN1bHRSb3dzXCJcbiAgICAgICAgICAgIDpjb2x1bW5zPVwicmVzdWx0Q29sdW1uc1wiXG4gICAgICAgICAgICA6c2hvdy1ib3JkZXJzPVwidHJ1ZVwiXG4gICAgICAgICAgICA6Y29sdW1uLWF1dG8td2lkdGg9XCJ0cnVlXCJcbiAgICAgICAgICAgIDphbGxvdy1jb2x1bW4tcmVzaXppbmc9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpob3Zlci1zdGF0ZS1lbmFibGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPGFzaWRlXG4gICAgICAgIHYtc2hvdz1cInByb3BzT3BlblwiXG4gICAgICAgIGNsYXNzPVwicWFfX3Byb3BzIHRoZW1lLWRlcGVuZGVudFwiXG4gICAgICAgIDpzdHlsZT1cInsgd2lkdGg6IGAke3Byb3BzV2lkdGh9cHhgIH1cIlxuICAgICAgPlxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwicWFfX3Byb3BzLWhlYWRcIj5cbiAgICAgICAgICA8c3Bhbj7QodCy0L7QudGB0YLQstCwINC30LDQv9GA0L7RgdCwPC9zcGFuPlxuICAgICAgICAgIDxkeC1idXR0b25cbiAgICAgICAgICAgIGljb249XCJjbG9ja1wiXG4gICAgICAgICAgICBzdHlsaW5nLW1vZGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGhpbnQ9XCLQmNGB0YLQvtGA0LjRjyDQuNC30LzQtdC90LXQvdC40LlcIlxuICAgICAgICAgICAgOmRpc2FibGVkPVwiIWN1cnJlbnQua2V5XCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9wZW5IaXN0b3J5KClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGR4LWJ1dHRvblxuICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgIHN0eWxpbmctbW9kZT1cInRleHRcIlxuICAgICAgICAgICAgaGludD1cItCX0LDQutGA0YvRgtGMXCJcbiAgICAgICAgICAgIEBjbGljaz1cInByb3BzT3BlbiA9IGZhbHNlXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicWFfX3Byb3BzLWJvZHlcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJxYV9fZmllbGRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWFfX2ZpZWxkLWxhYmVsXCI+0JrQu9GO0YcgPGI+KjwvYj48L3NwYW4+XG4gICAgICAgICAgICA8ZHgtdGV4dC1ib3hcbiAgICAgICAgICAgICAgOnZhbHVlPVwiY3VycmVudC5rZXlcIlxuICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaXNOZXdcIlxuICAgICAgICAgICAgICA6aGludD1cImlzTmV3ID8gJ9Cb0LDRgtC40L3QuNGG0LAg0LjQu9C4INC60LjRgNC40LvQu9C40YbQsCwg0LHQtdC3INC/0YDQvtCx0LXQu9C+0LInIDogJ9Ca0LvRjtGHINC90LXQu9GM0LfRjyDQuNC30LzQtdC90LjRgtGMJ1wiXG4gICAgICAgICAgICAgIEB2YWx1ZS1jaGFuZ2VkPVwiY3VycmVudC5rZXkgPSAkZXZlbnQudmFsdWVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwicWFfX2ZpZWxkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFhX19maWVsZC1sYWJlbFwiPtCd0LDQt9Cy0LDQvdC40LUgPGI+KjwvYj48L3NwYW4+XG4gICAgICAgICAgICA8ZHgtdGV4dC1ib3hcbiAgICAgICAgICAgICAgOnZhbHVlPVwiY3VycmVudC50aXRsZVwiXG4gICAgICAgICAgICAgIEB2YWx1ZS1jaGFuZ2VkPVwiY3VycmVudC50aXRsZSA9ICRldmVudC52YWx1ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJxYV9fZmllbGRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWFfX2ZpZWxkLWxhYmVsXCI+0KLQtdC80Ys8L3NwYW4+XG4gICAgICAgICAgICA8ZHgtdGFnLWJveFxuICAgICAgICAgICAgICA6dmFsdWU9XCJjdXJyZW50LnRhZ3NcIlxuICAgICAgICAgICAgICA6aXRlbXM9XCJ0aGVtZU9wdGlvbnNcIlxuICAgICAgICAgICAgICA6YWNjZXB0LWN1c3RvbS12YWx1ZT1cInRydWVcIlxuICAgICAgICAgICAgICA6c2hvdy1zZWxlY3Rpb24tY29udHJvbHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQntCh0JIsINCa0KLQoCwg0J/Qu9Cw0YLQtdC20LjigKZcIlxuICAgICAgICAgICAgICBAdmFsdWUtY2hhbmdlZD1cImN1cnJlbnQudGFncyA9ICRldmVudC52YWx1ZSB8fCBbXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJxYV9fZmllbGRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWFfX2ZpZWxkLWxhYmVsXCI+0JHQsNC30LAg0LTQsNC90L3Ri9GFPC9zcGFuPlxuICAgICAgICAgICAgPGR4LXNlbGVjdC1ib3hcbiAgICAgICAgICAgICAgOnZhbHVlPVwiY3VycmVudC5kYl9rZXlcIlxuICAgICAgICAgICAgICA6aXRlbXM9XCJkYk9wdGlvbnNcIlxuICAgICAgICAgICAgICB2YWx1ZS1leHByPVwiaWRcIlxuICAgICAgICAgICAgICBkaXNwbGF5LWV4cHI9XCJuYW1lXCJcbiAgICAgICAgICAgICAgOnNob3ctY2xlYXItYnV0dG9uPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0J3QtSDQstGL0LHRgNCw0L3QsFwiXG4gICAgICAgICAgICAgIEB2YWx1ZS1jaGFuZ2VkPVwiY3VycmVudC5kYl9rZXkgPSAkZXZlbnQudmFsdWVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwicWFfX2ZpZWxkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFhX19maWVsZC1sYWJlbFwiPtCk0LjQu9GM0YLRgNGLINC30LDQv9GA0L7RgdCwPC9zcGFuPlxuICAgICAgICAgICAgPGR4LXRhZy1ib3hcbiAgICAgICAgICAgICAgOnZhbHVlPVwiY3VycmVudC5maWx0ZXJzXCJcbiAgICAgICAgICAgICAgOml0ZW1zPVwiZmlsdGVyT3B0aW9uc1wiXG4gICAgICAgICAgICAgIHZhbHVlLWV4cHI9XCJmaWVsZFwiXG4gICAgICAgICAgICAgIGRpc3BsYXktZXhwcj1cImNhcHRpb25cIlxuICAgICAgICAgICAgICA6c2VhcmNoLWVuYWJsZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgOnNob3ctc2VsZWN0aW9uLWNvbnRyb2xzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0JLRi9Cx0LXRgNC40YLQtSDRhNC40LvRjNGC0YDRi1wiXG4gICAgICAgICAgICAgIEB2YWx1ZS1jaGFuZ2VkPVwiY3VycmVudC5maWx0ZXJzID0gJGV2ZW50LnZhbHVlIHx8IFtdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFhX19oaW50XCI+0JjQtyDQvdC40YUg0YHRgtGA0L7QuNGC0YHRjyDRhNC+0YDQvNCwINC30L3QsNGH0LXQvdC40Lkg0Lgg0L/Qu9C10LnRgdGF0L7Qu9C00LXRgNGLLjwvc3Bhbj5cbiAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJzZWxlY3RlZERlZnMubGVuZ3RoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicWFfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAg0JfQvdCw0YfQtdC90LjRjyDRhNC40LvRjNGC0YDQvtCyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkeC1idXR0b25cbiAgICAgICAgICAgICAgdGV4dD1cItCX0L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIlxuICAgICAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgICAgIHN0eWxpbmctbW9kZT1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgaGludD1cItCf0L7QtNGB0YLQsNCy0LjRgtGMINC00LjQvdCw0LzQuNGH0LXRgdC60LjQtSDRg9C80L7Qu9GH0LDQvdC40Y8gKNC/0YDQvtGI0LvRi9C5INC80LXRgdGP0YYsINC90LDRh9Cw0LvQviDQvNC10YHRj9GG0LApXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiYXBwbHlEZWZhdWx0cygpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtZm9yPVwiZGVmIGluIHNlbGVjdGVkRGVmc1wiXG4gICAgICAgICAgICAgIDprZXk9XCJkZWYuZmllbGRcIlxuICAgICAgICAgICAgICBjbGFzcz1cInFhX192YWx1ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxmaWx0ZXItcHJldmlld1xuICAgICAgICAgICAgICAgIDpkZWY9XCJkZWYuY29uZmlnXCJcbiAgICAgICAgICAgICAgICA6aW5pdGlhbC12YWx1ZT1cInZhbHVlc1tkZWYuZmllbGRdXCJcbiAgICAgICAgICAgICAgICBAdXBkYXRlOnZhbHVlPVwic2V0VmFsdWUoZGVmLmZpZWxkLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hc2lkZT5cbiAgICA8L2Rpdj5cblxuICAgIDxoaXN0b3J5LWRyYXdlclxuICAgICAgOnZpc2libGU9XCJoaXN0b3J5T3BlblwiXG4gICAgICA6dGl0bGU9XCJoaXN0b3J5VGl0bGVcIlxuICAgICAgOml0ZW1zPVwiaGlzdG9yeUl0ZW1zXCJcbiAgICAgIEBjbG9zZT1cImhpc3RvcnlPcGVuID0gZmFsc2VcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNvbXB1dGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBEeEJ1dHRvbiB9IGZyb20gJ2RldmV4dHJlbWUtdnVlL2J1dHRvbic7XG5pbXBvcnQgeyBEeERhdGFHcmlkIH0gZnJvbSAnZGV2ZXh0cmVtZS12dWUvZGF0YS1ncmlkJztcbmltcG9ydCB7IER4U2VsZWN0Qm94IH0gZnJvbSAnZGV2ZXh0cmVtZS12dWUvc2VsZWN0LWJveCc7XG5pbXBvcnQgeyBEeFRhZ0JveCB9IGZyb20gJ2RldmV4dHJlbWUtdnVlL3RhZy1ib3gnO1xuaW1wb3J0IHsgRHhUZXh0Qm94IH0gZnJvbSAnZGV2ZXh0cmVtZS12dWUvdGV4dC1ib3gnO1xuaW1wb3J0IEZpbHRlclByZXZpZXcgZnJvbSAnQC9jb21wb25lbnRzL2xpYnJhcnkvZmlsdGVyLXByZXZpZXcudnVlJztcbmltcG9ydCBIaXN0b3J5RHJhd2VyLCB7IHR5cGUgSGlzdG9yeUl0ZW0gfSBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2hpc3RvcnktZHJhd2VyLnZ1ZSc7XG5pbXBvcnQgU3FsRWRpdG9yIGZyb20gJ0AvY29tcG9uZW50cy9yZXBvcnQtZWRpdG9yL3NxbC1lZGl0b3IudnVlJztcbmltcG9ydCB7IGZpbHRlcnNBcGksIHR5cGUgRmlsdGVyRGVmIH0gZnJvbSAnQC9zZXJ2aWNlcy9maWx0ZXJzLWFwaSc7XG5pbXBvcnQge1xuICBxdWVyaWVzQXBpLFxuICB0eXBlIFF1ZXJ5Q29sdW1uLFxuICB0eXBlIFF1ZXJ5RGVmLFxuICB0eXBlIFF1ZXJ5UGF5bG9hZCxcbn0gZnJvbSAnQC9zZXJ2aWNlcy9xdWVyaWVzLWFwaSc7XG5pbXBvcnQgeyByZXBvcnRzQXBpIH0gZnJvbSAnQC9zZXJ2aWNlcy9yZXBvcnRzLWFwaSc7XG5pbXBvcnQgeyBmaWx0ZXJQcm90b3R5cGUgfSBmcm9tICdAL3V0aWxzL2ZpbHRlci1wcm90b3R5cGVzJztcbmltcG9ydCB7IGR5bmFtaWNGaWx0ZXJWYWx1ZSwgcGxhY2Vob2xkZXJUb2tlbnMgfSBmcm9tICdAL3V0aWxzL2ZpbHRlci12YWx1ZXMnO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVRdWVyeSB9IGZyb20gJ0AvdXRpbHMvcXVlcnktaW50ZXJwb2xhdGUnO1xuXG4vLyDilIDilIDilIAg0KHQntCh0KLQntCv0J3QmNCVIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5pbnRlcmZhY2UgRGF0YWJhc2VPcHRpb24ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmNvbnN0IGl0ZW1zID0gcmVmPFF1ZXJ5RGVmW10+KFtdKTtcbmNvbnN0IGZpbHRlckRlZnMgPSByZWY8RmlsdGVyRGVmW10+KFtdKTtcbmNvbnN0IGRiT3B0aW9ucyA9IHJlZjxEYXRhYmFzZU9wdGlvbltdPihbXSk7XG5cbmNvbnN0IHN0YXR1cyA9IHJlZignJyk7XG5jb25zdCBzdGF0dXNFcnJvciA9IHJlZihmYWxzZSk7XG5jb25zdCBydW5uaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGlzTmV3ID0gcmVmKGZhbHNlKTtcbmNvbnN0IHByb3BzT3BlbiA9IHJlZih0cnVlKTtcbmNvbnN0IHByb3BzV2lkdGggPSByZWYoMzgwKTtcbmNvbnN0IGVkaXRvckhlaWdodCA9IHJlZigzNDApO1xuXG5jb25zdCBjdXJyZW50ID0gcmVhY3RpdmU8e1xuICBrZXk6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIGRiX2tleTogc3RyaW5nO1xuICBmaWx0ZXJzOiBzdHJpbmdbXTtcbiAgc3FsOiBzdHJpbmc7XG59Pih7XG4gIGtleTogJycsXG4gIHRpdGxlOiAnJyxcbiAgdGFnczogW10sXG4gIGRiX2tleTogJycsXG4gIGZpbHRlcnM6IFtdLFxuICBzcWw6ICcnLFxufSk7XG5cbmNvbnN0IGRyYWZ0ID0gcmVhY3RpdmU8eyBzcWw6IHN0cmluZyB9Pih7IHNxbDogJycgfSk7XG5jb25zdCB2YWx1ZXMgPSByZWFjdGl2ZTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oe30pO1xuXG5jb25zdCBoaXN0b3J5T3BlbiA9IHJlZihmYWxzZSk7XG5jb25zdCBoaXN0b3J5VGl0bGUgPSByZWYoJycpO1xuY29uc3QgaGlzdG9yeUl0ZW1zID0gcmVmPEhpc3RvcnlJdGVtW10+KFtdKTtcblxuY29uc3QgcmVzdWx0Um93cyA9IHJlZjxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdPihbXSk7XG5jb25zdCByZXN1bHRDb2x1bW5zID0gcmVmPEFycmF5PHsgZGF0YUZpZWxkOiBzdHJpbmc7IGNhcHRpb246IHN0cmluZyB9Pj4oW10pO1xuY29uc3QgcmVzdWx0SGludCA9IHJlZignJyk7XG5cbmNvbnN0IGVkaXRvclJlZiA9IHJlZjx7IGluc2VydFBsYWNlaG9sZGVyOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKTtcblxuLy8g4pSA4pSA4pSAINCS0KvQp9CY0KHQm9Cv0JXQnNCr0JUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IGNhblJ1biA9IGNvbXB1dGVkKCgpID0+IEJvb2xlYW4oZHJhZnQuc3FsLnRyaW0oKSkgJiYgIXJ1bm5pbmcudmFsdWUpO1xuY29uc3QgY2FuU2F2ZSA9IGNvbXB1dGVkKCgpID0+IEJvb2xlYW4oY3VycmVudC5rZXkudHJpbSgpICYmIGN1cnJlbnQudGl0bGUudHJpbSgpICYmIGRyYWZ0LnNxbC50cmltKCkpKTtcblxuY29uc3QgZGJMYWJlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgZm91bmQgPSBkYk9wdGlvbnMudmFsdWUuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gY3VycmVudC5kYl9rZXkpO1xuICByZXR1cm4gZm91bmQgPyBmb3VuZC5uYW1lIDogY3VycmVudC5kYl9rZXk7XG59KTtcblxuY29uc3QgZmlsdGVyT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IGZpbHRlckRlZnMudmFsdWUubWFwKChkZWYpID0+ICh7XG4gIGZpZWxkOiBkZWYuZmllbGQsXG4gIGNhcHRpb246IGAke2RlZi5maWVsZH0g4oCUICR7ZGVmLmxhYmVsIHx8IGRlZi50eXBlfWAsXG59KSkpO1xuXG5jb25zdCB0aGVtZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGFsbCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMudmFsdWUpIHtcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiBpdGVtLnRhZ3MgfHwgW10pIGFsbC5hZGQodGFnKTtcbiAgfVxuICByZXR1cm4gWy4uLmFsbF0uc29ydCgpO1xufSk7XG5cbmNvbnN0IHNlbGVjdGVkRGVmcyA9IGNvbXB1dGVkKCgpID0+IGZpbHRlckRlZnMudmFsdWUuZmlsdGVyKChkZWYpID0+IGN1cnJlbnQuZmlsdGVycy5pbmNsdWRlcyhkZWYuZmllbGQpKSk7XG5cbmNvbnN0IGluc2VydFRva2VucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgdG9rZW5zOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGRlZiBvZiBzZWxlY3RlZERlZnMudmFsdWUpIHtcbiAgICBjb25zdCBwcm90byA9IGZpbHRlclByb3RvdHlwZShkZWYudHlwZSk7XG4gICAgaWYgKCFwcm90bykgY29udGludWU7XG4gICAgdG9rZW5zLnB1c2goLi4ucGxhY2Vob2xkZXJUb2tlbnMocHJvdG8sIGRlZi5maWVsZCwgZGVmLmNvbmZpZy52YXIgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpKTtcbiAgfVxuICByZXR1cm4gWy4uLm5ldyBTZXQodG9rZW5zKV07XG59KTtcblxuLy8g4pSA4pSA4pSAINCX0JDQk9Cg0KPQl9Ca0JAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgW2xpc3QsIGZpbHRlcnMsIGRhdGFiYXNlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBxdWVyaWVzQXBpLmxpc3QoKSxcbiAgICAgIGZpbHRlcnNBcGkubGlzdCgpLmNhdGNoKCgpID0+ICh7IGZpbHRlcnM6IFtdIGFzIEZpbHRlckRlZltdLCB0b3RhbDogMCB9KSksXG4gICAgICByZXBvcnRzQXBpLmdldERhdGFiYXNlcygpLmNhdGNoKCgpID0+ICh7IGRhdGFiYXNlczogW10gfSkpLFxuICAgIF0pO1xuXG4gICAgaXRlbXMudmFsdWUgPSBsaXN0LnF1ZXJpZXMgfHwgW107XG4gICAgZmlsdGVyRGVmcy52YWx1ZSA9IGZpbHRlcnMuZmlsdGVycyB8fCBbXTtcbiAgICBkYk9wdGlvbnMudmFsdWUgPSAoZGF0YWJhc2VzLmRhdGFiYXNlcyB8fCBbXSkubWFwKChkYikgPT4gKHsgaWQ6IGRiLmlkLCBuYW1lOiBkYi5uYW1lIH0pKTtcblxuICAgIGlmICghaXRlbXMudmFsdWUubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjb25zdCBzdGlsbEV4aXN0cyA9IGl0ZW1zLnZhbHVlLnNvbWUoKGl0ZW0pID0+IGl0ZW0ua2V5ID09PSBjdXJyZW50LmtleSk7XG4gICAgaWYgKCFzdGlsbEV4aXN0cykge1xuICAgICAgb3BlbihpdGVtcy52YWx1ZVswXS5rZXkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0YXR1cy52YWx1ZSA9IGDQndC1INGD0LTQsNC70L7RgdGMINC/0YDQvtGH0LjRgtCw0YLRjCDQt9Cw0L/RgNC+0YHRizogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVF1ZXJ5KGl0ZW06IFF1ZXJ5RGVmKSB7XG4gIGN1cnJlbnQua2V5ID0gaXRlbS5rZXk7XG4gIGN1cnJlbnQudGl0bGUgPSBpdGVtLnRpdGxlIHx8ICcnO1xuICBjdXJyZW50LnRhZ3MgPSBbLi4uKGl0ZW0udGFncyB8fCBbXSldO1xuICBjdXJyZW50LmRiX2tleSA9IGl0ZW0uZGJfa2V5IHx8ICcnO1xuICBjdXJyZW50LmZpbHRlcnMgPSBbLi4uKGl0ZW0uZmlsdGVycyB8fCBbXSldO1xuICBjdXJyZW50LnNxbCA9IGl0ZW0uc3FsIHx8ICcnO1xuICBkcmFmdC5zcWwgPSBpdGVtLnNxbCB8fCAnJztcbiAgaXNOZXcudmFsdWUgPSBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZXMpKSBkZWxldGUgdmFsdWVzW2tleV07XG4gIHJlc3VsdFJvd3MudmFsdWUgPSBbXTtcbiAgcmVzdWx0Q29sdW1ucy52YWx1ZSA9IFtdO1xuICByZXN1bHRIaW50LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIG9wZW4oa2V5OiBzdHJpbmcpIHtcbiAgY29uc3QgaXRlbSA9IGl0ZW1zLnZhbHVlLmZpbmQoKHJvdykgPT4gcm93LmtleSA9PT0ga2V5KTtcbiAgaWYgKCFpdGVtKSByZXR1cm47XG4gIGFwcGx5UXVlcnkoaXRlbSk7XG4gIHN0YXR1cy52YWx1ZSA9ICcnO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXcoKSB7XG4gIGN1cnJlbnQua2V5ID0gJyc7XG4gIGN1cnJlbnQudGl0bGUgPSAnJztcbiAgY3VycmVudC50YWdzID0gW107XG4gIGN1cnJlbnQuZGJfa2V5ID0gJyc7XG4gIGN1cnJlbnQuZmlsdGVycyA9IFtdO1xuICBjdXJyZW50LnNxbCA9ICcnO1xuICBkcmFmdC5zcWwgPSAnJztcbiAgaXNOZXcudmFsdWUgPSB0cnVlO1xuICBwcm9wc09wZW4udmFsdWUgPSB0cnVlO1xuICByZXN1bHRSb3dzLnZhbHVlID0gW107XG4gIHJlc3VsdENvbHVtbnMudmFsdWUgPSBbXTtcbiAgcmVzdWx0SGludC52YWx1ZSA9ICcnO1xuICBzdGF0dXMudmFsdWUgPSAn0J3QvtCy0YvQuSDQt9Cw0L/RgNC+0YE6INC30LDQv9C+0LvQvdC40YLQtSDRgdCy0L7QudGB0YLQstCwINC4IFNRTCc7XG4gIHN0YXR1c0Vycm9yLnZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZSgpIHtcbiAgaWYgKCFjdXJyZW50LmtleSkgcmV0dXJuO1xuICBjdXJyZW50LmtleSA9ICcnO1xuICBjdXJyZW50LnRpdGxlID0gYCR7Y3VycmVudC50aXRsZX0gKNC60L7Qv9C40Y8pYDtcbiAgaXNOZXcudmFsdWUgPSB0cnVlO1xuICBwcm9wc09wZW4udmFsdWUgPSB0cnVlO1xuICBzdGF0dXMudmFsdWUgPSAn0JrQvtC/0LjRjyDRgdC+0LfQtNCw0L3QsCDigJQg0LfQsNC00LDQudGC0LUg0LrQu9GO0YcnO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xufVxuXG4vLyDilIDilIDilIAg0KHQntCl0KDQkNCd0JXQndCY0JUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIHZhbGlkYXRlKCk6IHN0cmluZ1tdIHtcbiAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBrZXkgPSBjdXJyZW50LmtleS50cmltKCk7XG5cbiAgaWYgKCFrZXkpIGVycm9ycy5wdXNoKCfQo9C60LDQttC40YLQtSDQutC70Y7RhyDQt9Cw0L/RgNC+0YHQsCcpO1xuICBlbHNlIGlmICghL15bQS1aYS160JAt0K/QsC3Rj9CB0ZFfXVtBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOV9dKiQvLnRlc3Qoa2V5KSkge1xuICAgIGVycm9ycy5wdXNoKCfQmtC70Y7Rhzog0LHRg9C60LLRiywg0YbQuNGE0YDRiyDQuCDQv9C+0LTRh9GR0YDQutC40LLQsNC90LjQtSwg0LHQtdC3INC/0YDQvtCx0LXQu9C+0LInKTtcbiAgfSBlbHNlIGlmIChpc05ldy52YWx1ZSAmJiBpdGVtcy52YWx1ZS5zb21lKChpdGVtKSA9PiBpdGVtLmtleSA9PT0ga2V5KSkge1xuICAgIGVycm9ycy5wdXNoKGDQmtC70Y7RhyDCqyR7a2V5fcK7INGD0LbQtSDQt9Cw0L3Rj9GCYCk7XG4gIH1cbiAgaWYgKCFjdXJyZW50LnRpdGxlLnRyaW0oKSkgZXJyb3JzLnB1c2goJ9Cj0LrQsNC20LjRgtC1INC90LDQt9Cy0LDQvdC40LUnKTtcbiAgaWYgKCFkcmFmdC5zcWwudHJpbSgpKSBlcnJvcnMucHVzaCgnU1FMINC90LUg0LfQsNC/0L7Qu9C90LXQvScpO1xuXG4gIHJldHVybiBlcnJvcnM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmUoKSB7XG4gIGNvbnN0IGVycm9ycyA9IHZhbGlkYXRlKCk7XG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gZXJyb3JzWzBdO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXlsb2FkOiBRdWVyeVBheWxvYWQgPSB7XG4gICAga2V5OiBjdXJyZW50LmtleS50cmltKCksXG4gICAgdGl0bGU6IGN1cnJlbnQudGl0bGUudHJpbSgpLFxuICAgIHRhZ3M6IGN1cnJlbnQudGFncyxcbiAgICBkYl9rZXk6IGN1cnJlbnQuZGJfa2V5LFxuICAgIGZpbHRlcnM6IGN1cnJlbnQuZmlsdGVycyxcbiAgICBzcWw6IGRyYWZ0LnNxbCxcbiAgICBjb2x1bW5zOiByZXN1bHRDb2x1bW5zLnZhbHVlLm1hcCgoY29sdW1uKSA9PiAoeyBkYXRhRmllbGQ6IGNvbHVtbi5kYXRhRmllbGQsIGNhcHRpb246IGNvbHVtbi5jYXB0aW9uIH0pKSxcbiAgfTtcblxuICB0cnkge1xuICAgIGlmIChpc05ldy52YWx1ZSkge1xuICAgICAgYXdhaXQgcXVlcmllc0FwaS5jcmVhdGUocGF5bG9hZCk7XG4gICAgICBpc05ldy52YWx1ZSA9IGZhbHNlO1xuICAgICAgY3VycmVudC5rZXkgPSBwYXlsb2FkLmtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcXVlcmllc0FwaS51cGRhdGUoY3VycmVudC5rZXksIHBheWxvYWQpO1xuICAgIH1cbiAgICBhd2FpdCBsb2FkKCk7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCh0L7RhdGA0LDQvdC10L3QvjogJHtwYXlsb2FkLmtleX1gO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGF0dXMudmFsdWUgPSBg0J3QtSDRg9C00LDQu9C+0YHRjCDRgdC+0YXRgNCw0L3QuNGC0Yw6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ3VycmVudCgpIHtcbiAgaWYgKCFjdXJyZW50LmtleSkgcmV0dXJuO1xuICBpZiAoIXdpbmRvdy5jb25maXJtKGDQo9C00LDQu9C40YLRjCDQt9Cw0L/RgNC+0YEgwqske2N1cnJlbnQua2V5fcK7P2ApKSByZXR1cm47XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBxdWVyaWVzQXBpLnJlbW92ZShjdXJyZW50LmtleSk7XG4gICAgY3VycmVudC5rZXkgPSAnJztcbiAgICBhd2FpdCBsb2FkKCk7XG4gICAgc3RhdHVzLnZhbHVlID0gJ9CX0LDQv9GA0L7RgSDRg9C00LDQu9GR0L0nO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGF0dXMudmFsdWUgPSBg0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgfVxufVxuXG4vLyDilIDilIDilIAg0JLQq9Cf0J7Qm9Cd0JXQndCY0JUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5IaXN0b3J5KCkge1xuICBpZiAoIWN1cnJlbnQua2V5KSByZXR1cm47XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHF1ZXJpZXNBcGkuaGlzdG9yeShjdXJyZW50LmtleSk7XG4gICAgaGlzdG9yeVRpdGxlLnZhbHVlID0gY3VycmVudC5rZXk7XG4gICAgaGlzdG9yeUl0ZW1zLnZhbHVlID0gKGRhdGEucmV2aXNpb25zIHx8IFtdKS5tYXAoKHJldmlzaW9uKSA9PiAoe1xuICAgICAgaWQ6IHJldmlzaW9uLmlkLFxuICAgICAgYWN0aW9uOiByZXZpc2lvbi5hY3Rpb24sXG4gICAgICBhdDogcmV2aXNpb24uY2hhbmdlZF9hdCxcbiAgICAgIGJ5OiByZXZpc2lvbi5jaGFuZ2VkX2J5LFxuICAgICAgZGV0YWlsOiByZXZpc2lvbi5zcWwgPyByZXZpc2lvbi5zcWwuc2xpY2UoMCwgNDAwKSA6IHVuZGVmaW5lZCxcbiAgICB9KSk7XG4gICAgaGlzdG9yeU9wZW4udmFsdWUgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCY0YHRgtC+0YDQuNGPINC90LXQtNC+0YHRgtGD0L/QvdCwOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWA7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSB0cnVlO1xuICB9XG59XG5cbi8qKiDQlNC40L3QsNC80LjRh9C10YHQutC40LUg0YPQvNC+0LvRh9Cw0L3QuNGPINGE0LjQu9GM0YLRgNC+0LIg4oCUINC60LDQuiDQsiDQsdC+0LXQstC+0LwgZHluYW1pY0RlZmF1bHQuICovXG5mdW5jdGlvbiBhcHBseURlZmF1bHRzKCkge1xuICBsZXQgZmlsbGVkID0gMDtcbiAgZm9yIChjb25zdCBkZWYgb2Ygc2VsZWN0ZWREZWZzLnZhbHVlKSB7XG4gICAgY29uc3QgcHJvdG8gPSBmaWx0ZXJQcm90b3R5cGUoZGVmLnR5cGUpO1xuICAgIGlmICghcHJvdG8pIGNvbnRpbnVlO1xuICAgIGNvbnN0IHZhbHVlID0gZHluYW1pY0ZpbHRlclZhbHVlKHByb3RvKTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgdmFsdWVzW2RlZi5maWVsZF0gPSB2YWx1ZTtcbiAgICBmaWxsZWQgKz0gMTtcbiAgfVxuICBzdGF0dXMudmFsdWUgPSBmaWxsZWRcbiAgICA/IGDQn9C+0LTRgdGC0LDQstC70LXQvdGLINC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y46ICR7ZmlsbGVkfWBcbiAgICA6ICfQoyDQstGL0LHRgNCw0L3QvdGL0YUg0YTQuNC70YzRgtGA0L7QsiDQvdC10YIg0LTQuNC90LDQvNC40YfQtdGB0LrQuNGFINC30L3QsNGH0LXQvdC40LknO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZpbGxlZCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gc2V0VmFsdWUoZmllbGQ6IHN0cmluZywgdmFsdWU6IHVua25vd24pIHtcbiAgdmFsdWVzW2ZpZWxkXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpbnNlcnQodG9rZW46IHN0cmluZykge1xuICBlZGl0b3JSZWYudmFsdWU/Lmluc2VydFBsYWNlaG9sZGVyKHRva2VuKTtcbn1cblxuZnVuY3Rpb24gY29sdW1uc0Zyb21SZXN1bHQocmF3OiB1bmtub3duW10pOiBRdWVyeUNvbHVtbltdIHtcbiAgcmV0dXJuIHJhdy5tYXAoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICBpZiAodHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB7IGRhdGFGaWVsZDogY29sdW1uLCBjYXB0aW9uOiBjb2x1bW4gfTtcbiAgICB9XG4gICAgY29uc3QgcmVjID0gY29sdW1uIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhRmllbGQ6IFN0cmluZyhyZWMuZGF0YUZpZWxkID8/IHJlYy5uYW1lID8/IGBjb2wke2luZGV4ICsgMX1gKSxcbiAgICAgIGNhcHRpb246IFN0cmluZyhyZWMuY2FwdGlvbiA/PyByZWMuZGF0YUZpZWxkID8/IHJlYy5uYW1lID8/IGBjb2wke2luZGV4ICsgMX1gKSxcbiAgICB9O1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xuICBpZiAoaXNOZXcudmFsdWUpIHtcbiAgICBzdGF0dXMudmFsdWUgPSAn0KHQvdCw0YfQsNC70LAg0YHQvtGF0YDQsNC90LjRgtC1INC30LDQv9GA0L7RgSc7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGludGVycG9sYXRlUXVlcnkoZHJhZnQuc3FsLCB2YWx1ZXMpO1xuICBpZiAocmVzdWx0LnVucmVzb2x2ZWQubGVuZ3RoKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCd0LUg0LfQsNC/0L7Qu9C90LXQvdGLINC30L3QsNGH0LXQvdC40Y86ICR7cmVzdWx0LnVucmVzb2x2ZWQuam9pbignLCAnKX1gO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBydW5uaW5nLnZhbHVlID0gdHJ1ZTtcbiAgc3RhdHVzLnZhbHVlID0gJ9CS0YvQv9C+0LvQvdGP0LXRgtGB0Y/igKYnO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBxdWVyaWVzQXBpLmV4ZWN1dGUoY3VycmVudC5kYl9rZXkgfHwgJycsIHJlc3VsdC5zcWwpO1xuICAgIGlmIChyZXNwb25zZS5lcnJvcikgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yKTtcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBjb2x1bW5zRnJvbVJlc3VsdChyZXNwb25zZS5jb2x1bW5zIHx8IFtdKTtcbiAgICBjb25zdCByb3dzID0gKHJlc3BvbnNlLnJvd3MgfHwgW10pLm1hcCgocm93KSA9PiB7XG4gICAgICBjb25zdCByZWNvcmQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgcmVjb3JkW2NvbHVtbi5kYXRhRmllbGRdID0gQXJyYXkuaXNBcnJheShyb3cpID8gcm93W2luZGV4XSA6IG51bGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfSk7XG5cbiAgICByZXN1bHRDb2x1bW5zLnZhbHVlID0gY29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKHsgZGF0YUZpZWxkOiBjb2x1bW4uZGF0YUZpZWxkLCBjYXB0aW9uOiBjb2x1bW4uY2FwdGlvbiB8fCBjb2x1bW4uZGF0YUZpZWxkIH0pKTtcbiAgICByZXN1bHRSb3dzLnZhbHVlID0gcm93cztcbiAgICByZXN1bHRIaW50LnZhbHVlID0gYNCh0YLRgNC+0Lo6ICR7cm93cy5sZW5ndGh9JHtyZXN1bHQucmVtb3ZlZENsYXVzZXMgPyBgLCDQstGL0YDQtdC30LDQvdC+INGD0YHQu9C+0LLQuNC5OiAke3Jlc3VsdC5yZW1vdmVkQ2xhdXNlc31gIDogJyd9YDtcblxuICAgIGF3YWl0IHF1ZXJpZXNBcGkuc2F2ZUNvbHVtbnMoY3VycmVudC5rZXksIGNvbHVtbnMpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCS0YvQv9C+0LvQvdC10L3QvjogJHtyb3dzLmxlbmd0aH0g0YHRgtGA0L7QumA7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlc3VsdFJvd3MudmFsdWUgPSBbXTtcbiAgICBzdGF0dXMudmFsdWUgPSBg0J7RiNC40LHQutCwINCy0YvQv9C+0LvQvdC10L3QuNGPOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWA7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIHJ1bm5pbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyDilIDilIDilIAg0KDQkNCX0JTQldCb0JjQotCV0JvQrCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxubGV0IHJlc2l6aW5nVmVydGljYWwgPSBmYWxzZTtcbmxldCByZXNpemVTdGFydFkgPSAwO1xubGV0IHJlc2l6ZVN0YXJ0SGVpZ2h0ID0gMDtcblxuZnVuY3Rpb24gb25WZXJ0aWNhbE1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgaWYgKCFyZXNpemluZ1ZlcnRpY2FsKSByZXR1cm47XG4gIGNvbnN0IGRlbHRhID0gZXZlbnQuY2xpZW50WSAtIHJlc2l6ZVN0YXJ0WTtcbiAgZWRpdG9ySGVpZ2h0LnZhbHVlID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gMjYwLCBNYXRoLm1heCgxNDAsIHJlc2l6ZVN0YXJ0SGVpZ2h0ICsgZGVsdGEpKTtcbn1cblxuZnVuY3Rpb24gc3RvcFZlcnRpY2FsUmVzaXplKCkge1xuICByZXNpemluZ1ZlcnRpY2FsID0gZmFsc2U7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uVmVydGljYWxNb3ZlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BWZXJ0aWNhbFJlc2l6ZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VmVydGljYWxSZXNpemUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgcmVzaXppbmdWZXJ0aWNhbCA9IHRydWU7XG4gIHJlc2l6ZVN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gIHJlc2l6ZVN0YXJ0SGVpZ2h0ID0gZWRpdG9ySGVpZ2h0LnZhbHVlO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvblZlcnRpY2FsTW92ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wVmVydGljYWxSZXNpemUpO1xufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICB2b2lkIGxvYWQoKTtcbn0pO1xuXG5vbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvblZlcnRpY2FsTW92ZSk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wVmVydGljYWxSZXNpemUpO1xufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5xYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbiAgbWluLWhlaWdodDogMDtcbn1cblxuLnFhX190b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBmbGV4OiAwIDAgYXV0bztcbn1cblxuLnFhX19zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLnFhX19zdGF0dXMge1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5xYV9fc3RhdHVzLS1lcnJvciB7XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci1kYW5nZXIsICNiOTFjMWMpO1xufVxuXG4ucWFfX2JvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxIDEgYXV0bztcbiAgbWluLWhlaWdodDogMDtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiAwIDEycHggMTJweDtcbn1cblxuLnFhX19saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMCAwIDI2MHB4O1xuICBtaW4taGVpZ2h0OiAwO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci10ZXh0LCAjMWYyOTM3KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tZHgtY29tcG9uZW50LWNvbG9yLWJnLCAjZmZmKTtcbn1cblxuLnFhX19saXN0LWhlYWQge1xuICBwYWRkaW5nOiA4cHggMTBweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjZTVlN2ViKTtcbn1cblxuLnFhX19jb3VudCB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbn1cblxuLnFhX19saXN0LWJvZHkge1xuICBmbGV4OiAxIDEgYXV0bztcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgbWluLWhlaWdodDogMDtcbn1cblxuLnFhX19saXN0LWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250OiBpbmhlcml0O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnFhX19saXN0LWl0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjZTVlN2ViKSAzMCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLnFhX19saXN0LWl0ZW0tLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1keC1jb2xvci1wcmltYXJ5LCAjMzM3YWI3KSAxMiUsIHRyYW5zcGFyZW50KTtcbn1cblxuLnFhX19saXN0LXRpdGxlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4ucWFfX2xpc3Qta2V5IHtcbiAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgQ29uc29sYXMsIG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBvcGFjaXR5OiAwLjY1O1xufVxuXG4ucWFfX2xpc3QtdGFncyB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4ucWFfX2VtcHR5IHtcbiAgcGFkZGluZzogMTZweCAxMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLnFhX19lZGl0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxIDEgYXV0bztcbiAgbWluLXdpZHRoOiAwO1xuICBtaW4taGVpZ2h0OiAwO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci10ZXh0LCAjMWYyOTM3KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tZHgtY29tcG9uZW50LWNvbG9yLWJnLCAjZmZmKTtcbn1cblxuLnFhX19lZGl0b3ItaGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xufVxuXG4ucWFfX3RpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnFhX19tZXRhIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBvcGFjaXR5OiAwLjY1O1xufVxuXG4ucWFfX2NoaXBzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogOHB4IDEycHggMDtcbn1cblxuLnFhX19jaGlwIHtcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIENvbnNvbGFzLCBtb25vc3BhY2U7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjY2JkNWUxKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5xYV9fY2hpcDpob3ZlciB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZHgtY29sb3ItcHJpbWFyeSwgIzMzN2FiNyk7XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci1wcmltYXJ5LCAjMzM3YWI3KTtcbn1cblxuLnFhX19oaW50IHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi5xYV9fbW9uYWNvIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG59XG5cbi5xYV9faHNwbGl0dGVyIHtcbiAgaGVpZ2h0OiA2cHg7XG4gIGN1cnNvcjogcm93LXJlc2l6ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0tZHgtY29tcG9uZW50LWNvbG9yLWJnLCAjZmZmKTtcbiAgZmxleDogMCAwIGF1dG87XG59XG5cbi5xYV9faHNwbGl0dGVyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWR4LWNvbG9yLXByaW1hcnksICMzMzdhYjcpIDI1JSwgdmFyKC0tZHgtY29tcG9uZW50LWNvbG9yLWJnLCAjZmZmKSk7XG59XG5cbi5xYV9fcmVzdWx0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMSAxIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIHBhZGRpbmc6IDRweDtcbn1cblxuLnFhX19yZXN1bHQtaGludCB7XG4gIHBhZGRpbmc6IDJweCA4cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC43O1xuICBmbGV4OiAwIDAgYXV0bztcbn1cblxuLnFhX19wcm9wcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY29sb3I6IHZhcigtLWR4LWNvbG9yLXRleHQsICMxZjI5MzcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1keC1jb21wb25lbnQtY29sb3ItYmcsICNmZmYpO1xufVxuXG4ucWFfX3Byb3BzLWhlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogNnB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGZsZXg6IDAgMCBhdXRvO1xufVxuXG4ucWFfX3Byb3BzLWJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBtaW4taGVpZ2h0OiAwO1xufVxuXG4ucWFfX2ZpZWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLnFhX19maWVsZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6IHZhcigtLWR4LWNvbG9yLXRleHQsICM0YjU1NjMpO1xufVxuXG4ucWFfX3NlY3Rpb24tdGl0bGUge1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4ucWFfX3ZhbHVlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA2cHg7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2NiZDVlMSk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbjwvc3R5bGU+XG4iXX0=