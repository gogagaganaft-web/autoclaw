import { createHotContext as __vite__createHotContext } from "/gr/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/queries-admin.vue");import { defineComponent as _defineComponent } from "/gr/node_modules/.vite/deps/vue.js?v=74dfea3c";
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "/gr/node_modules/.vite/deps/vue.js?v=74dfea3c";
import { DxButton } from "/gr/src/msi-vue/button/index.js";
import { DxColumn, DxDataGrid, DxPaging } from "/gr/src/msi-vue/data-grid/index.js";
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
		const allItems = ref([]);
		const filterDefs = ref([]);
		const dbOptions = ref([]);
		const status = ref("");
		const statusError = ref(false);
		/** Уникальные темы для header-фильтра колонки «Темы». */
		const tagsHeaderFilter = computed(() => {
			const set = new Set();
			for (const item of allItems.value) {
				for (const tag of item.tags || []) set.add(tag);
			}
			return [...set].sort().map((tag) => ({
				value: tag,
				text: tag
			}));
		});
		const running = ref(false);
		const isNew = ref(false);
		const listOpen = ref(true);
		const filtersOpen = ref(true);
		// Стартовые пропорции: 20% / 40% / 40% ширины окна.
		const listWidth = ref(Math.round(window.innerWidth * .2));
		const filtersWidth = ref(Math.round(window.innerWidth * .4));
		const editorHeight = ref(340);
		const resultHeight = ref(320);
		const active = reactive({
			key: "",
			title: "",
			tags: [],
			db_key: "",
			filters: []
		});
		const draft = reactive({
			sql: "",
			dirty: false
		});
		const values = reactive({});
		const historyOpen = ref(false);
		const historyTitle = ref("");
		const historyItems = ref([]);
		const resultRows = ref([]);
		const resultColumns = ref([]);
		const editorRef = ref(null);
		const resultGridRef = ref(null);
		const listGridRef = ref(null);
		/** Сборка MSI игнорирует searchPanel/filterRow в конструкторе DataGrid —
		*  включаем пост-созданием после первого запуска. */
		function enableResultGridSearch() {
			const inst = resultGridRef.value?.instance;
			if (!inst) return;
			try {
				inst.option("filterRow", {
					visible: true,
					applyFilter: "auto"
				});
				inst.option("searchPanel", { visible: false });
				inst.option("headerFilter", { visible: true });
			} catch {}
		}
		watch([resultRows, resultColumns], () => {
			void nextTick(() => enableResultGridSearch());
		});
		// ─── СПИСОК ЗАПРОСОВ: DataGrid с правкой в строке ───────────────────────────
		const gridRows = computed(() => items.value.map((item) => ({
			key: item.key,
			title: item.title || item.key,
			tagsText: (item.tags || []).join(", ")
		})));
		const listColumns = [{
			dataField: "title",
			caption: "Название",
			editing: { allowUpdating: true }
		}, {
			dataField: "tagsText",
			caption: "Темы",
			editing: { allowUpdating: true }
		}];
		function onGridRowClick(e) {
			if (e.rowType !== "data" || !e.data?.key) return;
			if (e.data.key !== active.key) open(e.data.key);
		}
		/** Поиск в левом гриде: searchPanel и filterRow сборки MSI применяем
		*  пост-созданием (в конструкторе игнорируются). */
		function applyListSearch() {
			const inst = listGridRef.value?.instance;
			if (!inst) return;
			try {
				inst.option("searchPanel", {
					visible: true,
					width: 200,
					placeholder: "Поиск…"
				});
				inst.option("filterRow", {
					visible: true,
					applyFilter: "auto"
				});
				inst.option("headerFilter", { visible: true });
			} catch {}
		}
		/** Правка названия/тем в строке: читаем отчёт, меняем только эти поля. */
		async function onGridRowUpdated(e) {
			const key = String(e?.key ?? e?.data?.key ?? "");
			if (!key) return;
			try {
				const report = await queriesApi.get(key);
				const title = String(e?.data?.title ?? report.title ?? "");
				const tags = String(e?.data?.tagsText ?? (report.tags || []).join(", ")).split(",").map((t) => t.trim()).filter(Boolean);
				await queriesApi.update(key, {
					key,
					title,
					tags,
					db_key: report.db_key || "",
					filters: report.filters || [],
					sql: report.sql || "",
					columns: report.columns || []
				});
				items.value = items.value.map((item) => item.key === key ? {
					...item,
					title,
					tags
				} : item);
				if (active.key === key) {
					active.title = title;
					active.tags = tags;
				}
				status.value = "Строка сохранена";
				statusError.value = false;
			} catch (err) {
				status.value = `Не удалось сохранить строку: ${err.message}`;
				statusError.value = true;
			}
		}
		// ─── ВЫЧИСЛЯЕМЫЕ ────────────────────────────────────────────────────────────
		const canRun = computed(() => Boolean(draft.sql.trim()) && !running.value && !isNew.value);
		const canSave = computed(() => Boolean(active.key.trim() && active.title.trim() && draft.sql.trim()) && draft.dirty);
		const dbLabel = computed(() => {
			const found = dbOptions.value.find((item) => item.id === active.db_key);
			return found ? found.name : active.db_key;
		});
		const filterOptions = computed(() => filterDefs.value.map((def) => ({
			field: def.field,
			caption: `${def.field} — ${def.label || def.type}`
		})));
		const themeOptions = computed(() => {
			const all = new Set();
			for (const item of allItems.value) {
				for (const tag of item.tags || []) all.add(tag);
			}
			return [...all].sort();
		});
		const selectedDefs = computed(() => filterDefs.value.filter((def) => active.filters.includes(def.field)));
		// Подключение фильтра — сразу стартовое значение в placeholder var:
		// диапазоны получают d/m/n_start+end, чтобы чип в SQL сразу был «заполнен».
		watch(selectedDefs, (defs) => {
			for (const def of defs) {
				if (values[def.field] !== undefined) continue;
				const proto = filterPrototype(def.type);
				if (!proto) continue;
				const value = dynamicFilterValue(proto);
				if (value === undefined) continue;
				values[def.field] = value;
			}
		});
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
				allItems.value = list.queries || [];
				items.value = allItems.value;
				filterDefs.value = filters.filters || [];
				dbOptions.value = (databases.databases || []).map((db) => ({
					id: db.id,
					name: db.name
				}));
				if (allItems.value.length && !allItems.value.some((i) => i.key === active.key)) {
					open(allItems.value[0].key);
				}
			} catch (e) {
				status.value = `Не удалось прочитать запросы: ${e.message}`;
				statusError.value = true;
			} finally {
				void nextTick(() => applyListSearch());
			}
		}
		function applyQuery(item) {
			active.key = item.key;
			active.title = item.title || "";
			active.tags = [...item.tags || []];
			active.db_key = item.db_key || "";
			active.filters = [...item.filters || []];
			draft.sql = item.sql || "";
			draft.dirty = false;
			isNew.value = false;
			for (const key of Object.keys(values)) delete values[key];
			resultRows.value = [];
			resultColumns.value = [];
		}
		function open(key) {
			const item = items.value.find((row) => row.key === key) ?? allItems.value.find((row) => row.key === key);
			if (!item) return;
			applyQuery(item);
			status.value = "";
			statusError.value = false;
		}
		function set(field, value) {
			active[field] = value;
			draft.dirty = true;
		}
		function onSqlInput() {
			draft.dirty = true;
		}
		function createNew() {
			active.key = "";
			active.title = "";
			active.tags = [];
			active.db_key = "";
			active.filters = [];
			draft.sql = "";
			draft.dirty = true;
			isNew.value = true;
			for (const key of Object.keys(values)) delete values[key];
			resultRows.value = [];
			resultColumns.value = [];
			status.value = "Новый запрос: заполните свойства и SQL";
			statusError.value = false;
			void nextTick(() => {
				document.querySelector(".qq__scroll")?.scrollTo({ top: 0 });
			});
		}
		function duplicate() {
			if (!active.key) return;
			active.key = "";
			active.title = `${active.title} (копия)`;
			isNew.value = true;
			draft.dirty = true;
			status.value = "Копия создана — задайте ключ";
			statusError.value = false;
		}
		// ─── СОХРАНЕНИЕ ─────────────────────────────────────────────────────────────
		function validate() {
			const errors = [];
			const key = active.key.trim();
			if (!key) errors.push("Укажите ключ запроса");
			else if (!/^[A-Za-zА-Яа-яЁё_][A-Za-zА-Яа-яЁё0-9_]*$/.test(key)) {
				errors.push("Ключ: буквы, цифры и подчёркивание, без пробелов");
			} else if (isNew.value && allItems.value.some((item) => item.key === key)) {
				errors.push(`Ключ «${key}» уже занят`);
			}
			if (!active.title.trim()) errors.push("Укажите название");
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
				key: active.key.trim(),
				title: active.title.trim(),
				tags: active.tags,
				db_key: active.db_key,
				filters: active.filters,
				sql: draft.sql,
				columns: resultColumns.value.map((c) => ({
					dataField: c.dataField,
					caption: c.caption
				}))
			};
			try {
				if (isNew.value) {
					await queriesApi.create(payload);
					isNew.value = false;
					active.key = payload.key;
				} else {
					await queriesApi.update(active.key, payload);
				}
				draft.dirty = false;
				await load();
				status.value = `Сохранено: ${payload.key}`;
				statusError.value = false;
			} catch (e) {
				status.value = `Не удалось сохранить: ${e.message}`;
				statusError.value = true;
			}
		}
		async function removeCurrent() {
			if (!active.key || isNew.value) return;
			if (!window.confirm(`Удалить запрос «${active.key}»?`)) return;
			try {
				await queriesApi.remove(active.key);
				active.key = "";
				await load();
				status.value = "Запрос удалён";
				statusError.value = false;
			} catch (e) {
				status.value = `Не удалось удалить: ${e.message}`;
				statusError.value = true;
			}
		}
		// ─── ВЫПОЛНЕНИЕ И ФИЛЬТРЫ ──────────────────────────────────────────────────
		async function openHistory() {
			if (!active.key) return;
			try {
				const data = await queriesApi.history(active.key);
				historyTitle.value = active.key;
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
				if (typeof column === "string") return {
					dataField: column,
					caption: column
				};
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
			const result = interpolateQuery(draft.sql, varValues());
			if (result.unresolved.length) {
				status.value = `Не заполнены значения: ${result.unresolved.join(", ")}`;
				statusError.value = true;
				return;
			}
			running.value = true;
			status.value = "Выполняется…";
			statusError.value = false;
			try {
				const response = await queriesApi.execute(active.db_key || "", result.sql);
				if (response.error) throw new Error(response.error);
				const columns = columnsFromResult(response.columns || []);
				const rows = (response.rows || []).map((row) => {
					const record = {};
					columns.forEach((column, index) => {
						record[column.dataField] = Array.isArray(row) ? row[index] : null;
					});
					return record;
				});
				resultColumns.value = columns.map((c) => ({
					dataField: c.dataField,
					caption: c.caption || c.dataField
				}));
				resultRows.value = rows;
				await queriesApi.saveColumns(active.key, columns).catch(() => undefined);
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
		/**
		* Карта значений по var-контракту SQL: {fond} ← values['ФОНД'],
		* {m_start}/{m_end} ← диапазон. Диапазон с двумя var разворачивается
		* в два скаляра — как buildPayload отчёта.
		*/
		function varValues() {
			const out = {};
			for (const def of selectedDefs.value) {
				const proto = filterPrototype(def.type);
				if (!proto) continue;
				const names = placeholderTokens(proto, def.field, def.config.var).map((token) => token.replace(/^\{|\}$/g, ""));
				const raw = values[def.field];
				if (names.length >= 2 && raw && typeof raw === "object" && !Array.isArray(raw)) {
					const rec = raw;
					out[names[0]] = rec.start ?? "";
					out[names[1]] = rec.end ?? "";
				} else if (names.length >= 1) {
					out[names[0]] = raw;
				} else {
					out[def.field] = raw;
				}
			}
			return out;
		}
		// ─── РЕСАЙЗЫ ────────────────────────────────────────────────────────────────
		let resizingList = false;
		let listStartX = 0;
		let listStartW = 0;
		function onListMove(event) {
			if (!resizingList) return;
			const delta = event.clientX - listStartX;
			listWidth.value = Math.min(560, Math.max(220, listStartW + delta));
		}
		function onListUp() {
			resizingList = false;
			document.removeEventListener("mousemove", onListMove);
			document.removeEventListener("mouseup", onListUp);
		}
		function startListResize(event) {
			resizingList = true;
			listStartX = event.clientX;
			listStartW = listWidth.value;
			document.addEventListener("mousemove", onListMove);
			document.addEventListener("mouseup", onListUp);
		}
		let resizingFilters = false;
		let filtersStartX = 0;
		let filtersStartW = 0;
		function onFiltersMove(event) {
			if (!resizingFilters) return;
			const delta = filtersStartX - event.clientX;
			filtersWidth.value = Math.min(700, Math.max(280, filtersStartW + delta));
		}
		function onFiltersUp() {
			resizingFilters = false;
			document.removeEventListener("mousemove", onFiltersMove);
			document.removeEventListener("mouseup", onFiltersUp);
		}
		function startFiltersResize(event) {
			resizingFilters = true;
			filtersStartX = event.clientX;
			filtersStartW = filtersWidth.value;
			document.addEventListener("mousemove", onFiltersMove);
			document.addEventListener("mouseup", onFiltersUp);
		}
		let resizingSql = false;
		let sqlStartY = 0;
		let sqlStartEditor = 0;
		let sqlStartResult = 0;
		function onSqlMove(event) {
			if (!resizingSql) return;
			const delta = event.clientY - sqlStartY;
			const total = sqlStartEditor + sqlStartResult;
			editorHeight.value = Math.min(total - 160, Math.max(140, sqlStartEditor + delta));
			resultHeight.value = Math.max(120, total - editorHeight.value);
		}
		function onSqlUp() {
			resizingSql = false;
			document.removeEventListener("mousemove", onSqlMove);
			document.removeEventListener("mouseup", onSqlUp);
		}
		function startSqlResize(event) {
			resizingSql = true;
			sqlStartY = event.clientY;
			sqlStartEditor = editorHeight.value;
			sqlStartResult = resultHeight.value;
			document.addEventListener("mousemove", onSqlMove);
			document.addEventListener("mouseup", onSqlUp);
		}
		// Свободное место для редактора между списком и фильтрами.
		function relayout() {
			void nextTick(() => {
				try {
					editorRef.value?.["relayoutEditor"]?.();
				} catch {}
			});
		}
		watch([
			listWidth,
			filtersWidth,
			listOpen,
			filtersOpen
		], relayout);
		onMounted(() => {
			void nextTick(() => applyListSearch());
			void load();
		});
		onBeforeUnmount(() => {
			document.removeEventListener("mousemove", onListMove);
			document.removeEventListener("mouseup", onListUp);
			document.removeEventListener("mousemove", onFiltersMove);
			document.removeEventListener("mouseup", onFiltersUp);
			document.removeEventListener("mousemove", onSqlMove);
			document.removeEventListener("mouseup", onSqlUp);
		});
		const __returned__ = {
			items,
			allItems,
			filterDefs,
			dbOptions,
			status,
			statusError,
			tagsHeaderFilter,
			running,
			isNew,
			listOpen,
			filtersOpen,
			listWidth,
			filtersWidth,
			editorHeight,
			resultHeight,
			active,
			draft,
			values,
			historyOpen,
			historyTitle,
			historyItems,
			resultRows,
			resultColumns,
			editorRef,
			resultGridRef,
			listGridRef,
			enableResultGridSearch,
			gridRows,
			listColumns,
			onGridRowClick,
			applyListSearch,
			onGridRowUpdated,
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
			set,
			onSqlInput,
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
			varValues,
			get resizingList() {
				return resizingList;
			},
			set resizingList(v) {
				resizingList = v;
			},
			get listStartX() {
				return listStartX;
			},
			set listStartX(v) {
				listStartX = v;
			},
			get listStartW() {
				return listStartW;
			},
			set listStartW(v) {
				listStartW = v;
			},
			onListMove,
			onListUp,
			startListResize,
			get resizingFilters() {
				return resizingFilters;
			},
			set resizingFilters(v) {
				resizingFilters = v;
			},
			get filtersStartX() {
				return filtersStartX;
			},
			set filtersStartX(v) {
				filtersStartX = v;
			},
			get filtersStartW() {
				return filtersStartW;
			},
			set filtersStartW(v) {
				filtersStartW = v;
			},
			onFiltersMove,
			onFiltersUp,
			startFiltersResize,
			get resizingSql() {
				return resizingSql;
			},
			set resizingSql(v) {
				resizingSql = v;
			},
			get sqlStartY() {
				return sqlStartY;
			},
			set sqlStartY(v) {
				sqlStartY = v;
			},
			get sqlStartEditor() {
				return sqlStartEditor;
			},
			set sqlStartEditor(v) {
				sqlStartEditor = v;
			},
			get sqlStartResult() {
				return sqlStartResult;
			},
			set sqlStartResult(v) {
				sqlStartResult = v;
			},
			onSqlMove,
			onSqlUp,
			startSqlResize,
			relayout,
			get DxButton() {
				return DxButton;
			},
			get DxColumn() {
				return DxColumn;
			},
			get DxDataGrid() {
				return DxDataGrid;
			},
			get DxPaging() {
				return DxPaging;
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
import { createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, withCtx as _withCtx, vShow as _vShow, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, createTextVNode as _createTextVNode, renderList as _renderList, Fragment as _Fragment, createBlock as _createBlock } from "/gr/node_modules/.vite/deps/vue.js?v=74dfea3c";
const _hoisted_1 = { class: "view-wrapper qq" };
const _hoisted_2 = { class: "qq__toolbar theme-dependent" };
const _hoisted_3 = { class: "qq__body" };
const _hoisted_4 = { class: "qq__grid-wrap" };
const _hoisted_5 = {
	key: 1,
	class: "qq__panel theme-dependent"
};
const _hoisted_6 = { class: "qq__head" };
const _hoisted_7 = { class: "qq__head-title" };
const _hoisted_8 = { class: "qq__head-sub" };
const _hoisted_9 = { class: "qq__scroll" };
const _hoisted_10 = { class: "qq__props-grid" };
const _hoisted_11 = {
	key: 0,
	class: "qq__field"
};
const _hoisted_12 = {
	key: 1,
	class: "qq__field"
};
const _hoisted_13 = { class: "qq__field" };
const _hoisted_14 = { class: "qq__field" };
const _hoisted_15 = { class: "qq__chips" };
const _hoisted_16 = ["title", "onClick"];
const _hoisted_17 = { class: "qq__monaco" };
const _hoisted_18 = { class: "qq__result" };
const _hoisted_19 = { class: "qq__filters-head" };
const _hoisted_20 = { class: "qq__filters-body" };
const _hoisted_21 = { class: "qq__value-label" };
const _hoisted_22 = { class: "qq__value-key" };
const _hoisted_23 = {
	key: 1,
	class: "qq__hint"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return _openBlock(), _createElementBlock("div", _hoisted_1, [
		_createElementVNode("div", _hoisted_2, [
			_createVNode($setup["DxButton"], {
				icon: "panelleft",
				"styling-mode": "outlined",
				hint: $setup.listOpen ? "Скрыть список" : "Показать список",
				onClick: _cache[0] || (_cache[0] = ($event) => $setup.listOpen = !$setup.listOpen)
			}, null, 8, ["hint"]),
			_createVNode($setup["DxButton"], {
				icon: "panelright",
				"styling-mode": "outlined",
				hint: $setup.filtersOpen ? "Скрыть фильтры" : "Показать фильтры",
				onClick: _cache[1] || (_cache[1] = ($event) => $setup.filtersOpen = !$setup.filtersOpen)
			}, null, 8, ["hint"]),
			_createVNode($setup["DxButton"], {
				icon: "plus",
				text: "Новый",
				"styling-mode": "outlined",
				hint: "Новый запрос",
				onClick: _cache[2] || (_cache[2] = ($event) => $setup.createNew())
			}),
			_createVNode($setup["DxButton"], {
				icon: "copy",
				"styling-mode": "outlined",
				hint: "Дублировать выбранный",
				disabled: !$setup.active.key || $setup.isNew,
				onClick: _cache[3] || (_cache[3] = ($event) => $setup.duplicate())
			}, null, 8, ["disabled"]),
			_createVNode($setup["DxButton"], {
				icon: "trash",
				"styling-mode": "outlined",
				hint: "Удалить выбранный",
				disabled: !$setup.active.key || $setup.isNew,
				onClick: _cache[4] || (_cache[4] = ($event) => $setup.removeCurrent())
			}, null, 8, ["disabled"]),
			_cache[17] || (_cache[17] = _createElementVNode(
				"span",
				{ class: "qq__spacer" },
				null,
				-1
				/* CACHED */
			)),
			$setup.status ? (_openBlock(), _createElementBlock(
				"span",
				{
					key: 0,
					class: _normalizeClass(["qq__status", { "qq__status--error": $setup.statusError }])
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
				onClick: _cache[5] || (_cache[5] = ($event) => $setup.run())
			}, null, 8, ["disabled"]),
			_createVNode($setup["DxButton"], {
				text: "Сохранить",
				icon: "save",
				type: "default",
				"styling-mode": "contained",
				disabled: !$setup.canSave,
				onClick: _cache[6] || (_cache[6] = ($event) => $setup.save())
			}, null, 8, ["disabled"])
		]),
		_createElementVNode("div", _hoisted_3, [
			_createCommentVNode(" ─── Слева: DataGrid запросов (Ключ скрыт, Название, Темы) ────── "),
			_withDirectives(_createElementVNode(
				"aside",
				{
					class: "qq__list theme-dependent",
					style: _normalizeStyle({ width: `${$setup.listWidth}px` })
				},
				[_createElementVNode("div", _hoisted_4, [_createVNode($setup["DxDataGrid"], {
					ref: "listGridRef",
					"data-source": $setup.gridRows,
					"key-expr": "key",
					columns: $setup.listColumns,
					"show-borders": false,
					"show-column-lines": false,
					"show-column-headers": true,
					"column-auto-width": true,
					"word-wrap-enabled": true,
					"hover-state-enabled": true,
					"filter-row": {
						visible: true,
						applyFilter: "auto"
					},
					"header-filter": { visible: true },
					"selected-row-keys": $setup.active.key ? [$setup.active.key] : [],
					"focused-row-key": $setup.active.key,
					"focused-row-enabled": "",
					height: "100%",
					onRowClick: $setup.onGridRowClick,
					onRowUpdated: $setup.onGridRowUpdated
				}, {
					default: _withCtx(() => [
						_createVNode($setup["DxColumn"], {
							"data-field": "key",
							caption: "Ключ",
							visible: false
						}),
						_createVNode($setup["DxColumn"], {
							"data-field": "title",
							caption: "Название",
							editing: { allowUpdating: true }
						}),
						_createVNode($setup["DxColumn"], {
							"data-field": "tagsText",
							caption: "Темы",
							editing: { allowUpdating: true },
							"header-filter": { dataSource: $setup.tagsHeaderFilter }
						}, null, 8, ["header-filter"]),
						_createVNode($setup["DxPaging"], { "page-size": 50 })
					]),
					_: 1
				}, 8, [
					"data-source",
					"selected-row-keys",
					"focused-row-key"
				])])],
				4
				/* STYLE */
			), [[_vShow, $setup.listOpen]]),
			_createCommentVNode(" Скрытый список: сплиттер заменяет кнопку-кнопкой в тулбаре,\n           здесь остаётся тонкая полоса для возврата через тулбар "),
			$setup.listOpen ? (_openBlock(), _createElementBlock(
				"div",
				{
					key: 0,
					class: "qq__splitter",
					role: "separator",
					"aria-orientation": "vertical",
					title: "Потяните, чтобы изменить ширину списка",
					onMousedown: $setup.startListResize
				},
				null,
				32
				/* NEED_HYDRATION */
			)) : _createCommentVNode("v-if", true),
			_createCommentVNode(" ─── Центр: редактор SQL + грид результата ─────────────────────── "),
			$setup.active.key || $setup.isNew ? (_openBlock(), _createElementBlock("section", _hoisted_5, [_createElementVNode("header", _hoisted_6, [_createElementVNode("div", _hoisted_7, [_createTextVNode(
				_toDisplayString($setup.active.title || "Новый запрос") + " ",
				1
				/* TEXT */
			), _createElementVNode(
				"span",
				_hoisted_8,
				"· " + _toDisplayString($setup.active.key || "без ключа"),
				1
				/* TEXT */
			)]), _createVNode($setup["DxButton"], {
				icon: "clock",
				"styling-mode": "text",
				hint: "История изменений",
				disabled: !$setup.active.key || $setup.isNew,
				onClick: _cache[7] || (_cache[7] = ($event) => $setup.openHistory())
			}, null, 8, ["disabled"])]), _createElementVNode("div", _hoisted_9, [
				_createCommentVNode(" Свойства: ключ (новый) и темы — база переехала в шапку "),
				_createElementVNode("div", _hoisted_10, [
					$setup.isNew ? (_openBlock(), _createElementBlock("label", _hoisted_11, [_cache[18] || (_cache[18] = _createElementVNode(
						"span",
						{ class: "qq__field-label" },
						[_createTextVNode("Ключ "), _createElementVNode("b", null, "*")],
						-1
						/* CACHED */
					)), _createVNode($setup["DxTextBox"], {
						value: $setup.active.key,
						placeholder: "OSV_platezhi",
						onValueChanged: _cache[8] || (_cache[8] = ($event) => $setup.set("key", $event.value))
					}, null, 8, ["value"])])) : _createCommentVNode("v-if", true),
					$setup.isNew ? (_openBlock(), _createElementBlock("label", _hoisted_12, [_cache[19] || (_cache[19] = _createElementVNode(
						"span",
						{ class: "qq__field-label" },
						[_createTextVNode("Название "), _createElementVNode("b", null, "*")],
						-1
						/* CACHED */
					)), _createVNode($setup["DxTextBox"], {
						value: $setup.active.title,
						placeholder: "ОСВ: платежи",
						onValueChanged: _cache[9] || (_cache[9] = ($event) => $setup.set("title", $event.value))
					}, null, 8, ["value"])])) : _createCommentVNode("v-if", true),
					_createElementVNode("label", _hoisted_13, [_cache[20] || (_cache[20] = _createElementVNode(
						"span",
						{ class: "qq__field-label" },
						"Темы",
						-1
						/* CACHED */
					)), _createVNode($setup["DxTagBox"], {
						value: $setup.active.tags,
						items: $setup.themeOptions,
						"accept-custom-value": true,
						"show-selection-controls": true,
						placeholder: "ОСВ, КТР…",
						onValueChanged: _cache[10] || (_cache[10] = ($event) => $setup.set("tags", $event.value || []))
					}, null, 8, ["value", "items"])]),
					_createElementVNode("label", _hoisted_14, [_cache[21] || (_cache[21] = _createElementVNode(
						"span",
						{ class: "qq__field-label" },
						"База данных",
						-1
						/* CACHED */
					)), _createVNode($setup["DxSelectBox"], {
						value: $setup.active.db_key,
						items: $setup.dbOptions,
						"value-expr": "id",
						"display-expr": "name",
						"show-clear-button": true,
						placeholder: "Не выбрана",
						onValueChanged: _cache[11] || (_cache[11] = ($event) => $setup.set("db_key", $event.value))
					}, null, 8, ["value", "items"])])
				]),
				_createCommentVNode(" SQL "),
				_createElementVNode("div", _hoisted_15, [(_openBlock(true), _createElementBlock(
					_Fragment,
					null,
					_renderList($setup.insertTokens, (token) => {
						return _openBlock(), _createElementBlock("button", {
							key: token,
							type: "button",
							class: "qq__chip",
							title: "Вставить " + token,
							onClick: ($event) => $setup.insert(token)
						}, _toDisplayString(token), 9, _hoisted_16);
					}),
					128
					/* KEYED_FRAGMENT */
				))]),
				_createElementVNode("div", _hoisted_17, [_createVNode($setup["SqlEditor"], {
					ref: "editorRef",
					modelValue: $setup.draft.sql,
					"onUpdate:modelValue": [_cache[12] || (_cache[12] = ($event) => $setup.draft.sql = $event), _cache[13] || (_cache[13] = ($event) => $setup.onSqlInput($event))],
					height: $setup.editorHeight,
					"db-name": $setup.active.db_key
				}, null, 8, [
					"modelValue",
					"height",
					"db-name"
				])]),
				_createCommentVNode(" Горизонтальный ресайз редактор ↔ грид "),
				_createElementVNode(
					"div",
					{
						class: "qq__hresizer",
						role: "separator",
						"aria-orientation": "horizontal",
						title: "Потяните, чтобы изменить высоту редактора и таблицы",
						onMousedown: $setup.startSqlResize
					},
					null,
					32
					/* NEED_HYDRATION */
				),
				_createElementVNode("div", _hoisted_18, [_createVNode($setup["DxDataGrid"], {
					ref: "resultGridRef",
					"data-source": $setup.resultRows,
					columns: $setup.resultColumns,
					"show-borders": true,
					"column-auto-width": true,
					"allow-column-resizing": true,
					"hover-state-enabled": true,
					height: "100%"
				}, null, 8, ["data-source", "columns"])])
			])])) : (_openBlock(), _createElementBlock(
				_Fragment,
				{ key: 2 },
				[_createCommentVNode(" Пустое состояние "), _cache[22] || (_cache[22] = _createElementVNode(
					"section",
					{ class: "qq__placeholder theme-dependent" },
					" Выберите запрос в списке слева или создайте новый. ",
					-1
					/* CACHED */
				))],
				2112
				/* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
			)),
			_createCommentVNode(" ─── Справа: фильтры запроса и их значения ─────────────────────── "),
			$setup.active.key || $setup.isNew ? (_openBlock(), _createElementBlock(
				_Fragment,
				{ key: 3 },
				[_createElementVNode(
					"div",
					{
						class: "qq__splitter",
						title: "Потяните, чтобы изменить ширину блока фильтров",
						onMousedown: $setup.startFiltersResize
					},
					null,
					32
					/* NEED_HYDRATION */
				), _withDirectives(_createElementVNode(
					"aside",
					{
						class: "qq__filters theme-dependent",
						style: _normalizeStyle({ width: `${$setup.filtersWidth}px` })
					},
					[
						_createElementVNode("header", _hoisted_19, [_cache[23] || (_cache[23] = _createElementVNode(
							"span",
							null,
							"Фильтры запроса",
							-1
							/* CACHED */
						)), $setup.selectedDefs.length ? (_openBlock(), _createBlock($setup["DxButton"], {
							key: 0,
							icon: "refresh",
							"styling-mode": "text",
							hint: "Подставить динамические умолчания (прошлый месяц…)",
							onClick: _cache[14] || (_cache[14] = ($event) => $setup.applyDefaults())
						})) : _createCommentVNode("v-if", true)]),
						_createCommentVNode(" Свой скролл: выбор фильтров + значения, фильтры бывают высокими "),
						_createElementVNode("div", _hoisted_20, [
							_createVNode($setup["DxTagBox"], {
								class: "qq__filters-tag",
								value: $setup.active.filters,
								items: $setup.filterOptions,
								"value-expr": "field",
								"display-expr": "caption",
								"search-enabled": true,
								"show-selection-controls": true,
								placeholder: "Выберите фильтры — из них строится форма и плейсхолдеры",
								onValueChanged: _cache[15] || (_cache[15] = ($event) => $setup.set("filters", $event.value || []))
							}, null, 8, ["value", "items"]),
							_cache[25] || (_cache[25] = _createElementVNode(
								"span",
								{ class: "qq__hint" },
								"Чекбоксы подключают фильтр; ниже появятся его значения.",
								-1
								/* CACHED */
							)),
							$setup.selectedDefs.length ? (_openBlock(), _createElementBlock(
								_Fragment,
								{ key: 0 },
								[_cache[24] || (_cache[24] = _createElementVNode(
									"div",
									{ class: "qq__section-title" },
									"Значения фильтров",
									-1
									/* CACHED */
								)), (_openBlock(true), _createElementBlock(
									_Fragment,
									null,
									_renderList($setup.selectedDefs, (def) => {
										return _openBlock(), _createElementBlock("div", {
											key: def.field,
											class: "qq__value"
										}, [_createElementVNode("div", _hoisted_21, [_createTextVNode(
											_toDisplayString(def.label || def.field) + " ",
											1
											/* TEXT */
										), _createElementVNode(
											"code",
											_hoisted_22,
											_toDisplayString(def.field),
											1
											/* TEXT */
										)]), (_openBlock(), _createBlock($setup["FilterPreview"], {
											key: `qv:${$setup.active.key}:${def.field}`,
											def: def.config,
											"initial-value": $setup.values[def.field],
											"onUpdate:value": ($event) => $setup.setValue(def.field, $event)
										}, null, 8, [
											"def",
											"initial-value",
											"onUpdate:value"
										]))]);
									}),
									128
									/* KEYED_FRAGMENT */
								))],
								64
								/* STABLE_FRAGMENT */
							)) : (_openBlock(), _createElementBlock("div", _hoisted_23, " Фильтры не подключены — выберите хотя бы один. "))
						])
					],
					4
					/* STYLE */
				), [[_vShow, $setup.filtersOpen]])],
				64
				/* STABLE_FRAGMENT */
			)) : _createCommentVNode("v-if", true)
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

//# sourceMappingURL=data:application/json;base64,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OztJLElBdERNLENBQUEsUUFBQSxPQUFBLFdBQVcsQzs7Ozs7RUE2RHpCLGFBS0UsT0FBQSxrQkFBQTtHQUpDLFNBQVMsT0FBQTtHQUNULE9BQU8sT0FBQTtHQUNQLE9BQU8sT0FBQTtHQUNQLFNBQUssT0FBQSxRQUFBLE9BQUEsT0FBQSxXQUFFLE9BQUEsY0FBVyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJxdWVyaWVzLWFkbWluLnZ1ZSJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ2aWV3LXdyYXBwZXIgcXFcIj5cbiAgICA8ZGl2IGNsYXNzPVwicXFfX3Rvb2xiYXIgdGhlbWUtZGVwZW5kZW50XCI+XG4gICAgICA8ZHgtYnV0dG9uXG4gICAgICAgIGljb249XCJwYW5lbGxlZnRcIlxuICAgICAgICBzdHlsaW5nLW1vZGU9XCJvdXRsaW5lZFwiXG4gICAgICAgIDpoaW50PVwibGlzdE9wZW4gPyAn0KHQutGA0YvRgtGMINGB0L/QuNGB0L7QuicgOiAn0J/QvtC60LDQt9Cw0YLRjCDRgdC/0LjRgdC+0LonXCJcbiAgICAgICAgQGNsaWNrPVwibGlzdE9wZW4gPSAhbGlzdE9wZW5cIlxuICAgICAgLz5cbiAgICAgIDxkeC1idXR0b25cbiAgICAgICAgaWNvbj1cInBhbmVscmlnaHRcIlxuICAgICAgICBzdHlsaW5nLW1vZGU9XCJvdXRsaW5lZFwiXG4gICAgICAgIDpoaW50PVwiZmlsdGVyc09wZW4gPyAn0KHQutGA0YvRgtGMINGE0LjQu9GM0YLRgNGLJyA6ICfQn9C+0LrQsNC30LDRgtGMINGE0LjQu9GM0YLRgNGLJ1wiXG4gICAgICAgIEBjbGljaz1cImZpbHRlcnNPcGVuID0gIWZpbHRlcnNPcGVuXCJcbiAgICAgIC8+XG4gICAgICA8ZHgtYnV0dG9uXG4gICAgICAgIGljb249XCJwbHVzXCJcbiAgICAgICAgdGV4dD1cItCd0L7QstGL0LlcIlxuICAgICAgICBzdHlsaW5nLW1vZGU9XCJvdXRsaW5lZFwiXG4gICAgICAgIGhpbnQ9XCLQndC+0LLRi9C5INC30LDQv9GA0L7RgVwiXG4gICAgICAgIEBjbGljaz1cImNyZWF0ZU5ldygpXCJcbiAgICAgIC8+XG4gICAgICA8ZHgtYnV0dG9uXG4gICAgICAgIGljb249XCJjb3B5XCJcbiAgICAgICAgc3R5bGluZy1tb2RlPVwib3V0bGluZWRcIlxuICAgICAgICBoaW50PVwi0JTRg9Cx0LvQuNGA0L7QstCw0YLRjCDQstGL0LHRgNCw0L3QvdGL0LlcIlxuICAgICAgICA6ZGlzYWJsZWQ9XCIhYWN0aXZlLmtleSB8fCBpc05ld1wiXG4gICAgICAgIEBjbGljaz1cImR1cGxpY2F0ZSgpXCJcbiAgICAgIC8+XG4gICAgICA8ZHgtYnV0dG9uXG4gICAgICAgIGljb249XCJ0cmFzaFwiXG4gICAgICAgIHN0eWxpbmctbW9kZT1cIm91dGxpbmVkXCJcbiAgICAgICAgaGludD1cItCj0LTQsNC70LjRgtGMINCy0YvQsdGA0LDQvdC90YvQuVwiXG4gICAgICAgIDpkaXNhYmxlZD1cIiFhY3RpdmUua2V5IHx8IGlzTmV3XCJcbiAgICAgICAgQGNsaWNrPVwicmVtb3ZlQ3VycmVudCgpXCJcbiAgICAgIC8+XG5cbiAgICAgIDxzcGFuIGNsYXNzPVwicXFfX3NwYWNlclwiIC8+XG5cbiAgICAgIDxzcGFuXG4gICAgICAgIHYtaWY9XCJzdGF0dXNcIlxuICAgICAgICBjbGFzcz1cInFxX19zdGF0dXNcIlxuICAgICAgICA6Y2xhc3M9XCJ7ICdxcV9fc3RhdHVzLS1lcnJvcic6IHN0YXR1c0Vycm9yIH1cIlxuICAgICAgPnt7IHN0YXR1cyB9fTwvc3Bhbj5cbiAgICAgIDxkeC1idXR0b25cbiAgICAgICAgdGV4dD1cItCS0YvQv9C+0LvQvdC40YLRjFwiXG4gICAgICAgIGljb249XCJydW5cIlxuICAgICAgICB0eXBlPVwic3VjY2Vzc1wiXG4gICAgICAgIHN0eWxpbmctbW9kZT1cImNvbnRhaW5lZFwiXG4gICAgICAgIDpkaXNhYmxlZD1cIiFjYW5SdW5cIlxuICAgICAgICBAY2xpY2s9XCJydW4oKVwiXG4gICAgICAvPlxuICAgICAgPGR4LWJ1dHRvblxuICAgICAgICB0ZXh0PVwi0KHQvtGF0YDQsNC90LjRgtGMXCJcbiAgICAgICAgaWNvbj1cInNhdmVcIlxuICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgIHN0eWxpbmctbW9kZT1cImNvbnRhaW5lZFwiXG4gICAgICAgIDpkaXNhYmxlZD1cIiFjYW5TYXZlXCJcbiAgICAgICAgQGNsaWNrPVwic2F2ZSgpXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicXFfX2JvZHlcIj5cbiAgICAgIDwhLS0g4pSA4pSA4pSAINCh0LvQtdCy0LA6IERhdGFHcmlkINC30LDQv9GA0L7RgdC+0LIgKNCa0LvRjtGHINGB0LrRgNGL0YIsINCd0LDQt9Cy0LDQvdC40LUsINCi0LXQvNGLKSDilIDilIDilIDilIDilIDilIAgLS0+XG4gICAgICA8YXNpZGVcbiAgICAgICAgdi1zaG93PVwibGlzdE9wZW5cIlxuICAgICAgICBjbGFzcz1cInFxX19saXN0IHRoZW1lLWRlcGVuZGVudFwiXG4gICAgICAgIDpzdHlsZT1cInsgd2lkdGg6IGAke2xpc3RXaWR0aH1weGAgfVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxcV9fZ3JpZC13cmFwXCI+XG4gICAgICAgICAgPGR4LWRhdGEtZ3JpZFxuICAgICAgICAgICAgcmVmPVwibGlzdEdyaWRSZWZcIlxuICAgICAgICAgICAgOmRhdGEtc291cmNlPVwiZ3JpZFJvd3NcIlxuICAgICAgICAgICAga2V5LWV4cHI9XCJrZXlcIlxuICAgICAgICAgICAgOmNvbHVtbnM9XCJsaXN0Q29sdW1uc1wiXG4gICAgICAgICAgICA6c2hvdy1ib3JkZXJzPVwiZmFsc2VcIlxuICAgICAgICAgICAgOnNob3ctY29sdW1uLWxpbmVzPVwiZmFsc2VcIlxuICAgICAgICAgICAgOnNob3ctY29sdW1uLWhlYWRlcnM9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb2x1bW4tYXV0by13aWR0aD1cInRydWVcIlxuICAgICAgICAgICAgOndvcmQtd3JhcC1lbmFibGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICA6aG92ZXItc3RhdGUtZW5hYmxlZD1cInRydWVcIlxuICAgICAgICAgICAgOmZpbHRlci1yb3c9XCJ7IHZpc2libGU6IHRydWUsIGFwcGx5RmlsdGVyOiAnYXV0bycgfVwiXG4gICAgICAgICAgICA6aGVhZGVyLWZpbHRlcj1cInsgdmlzaWJsZTogdHJ1ZSB9XCJcbiAgICAgICAgICAgIDpzZWxlY3RlZC1yb3cta2V5cz1cImFjdGl2ZS5rZXkgPyBbYWN0aXZlLmtleV0gOiBbXVwiXG4gICAgICAgICAgICA6Zm9jdXNlZC1yb3cta2V5PVwiYWN0aXZlLmtleVwiXG4gICAgICAgICAgICBmb2N1c2VkLXJvdy1lbmFibGVkXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAgIEByb3ctY2xpY2s9XCJvbkdyaWRSb3dDbGlja1wiXG4gICAgICAgICAgICBAcm93LXVwZGF0ZWQ9XCJvbkdyaWRSb3dVcGRhdGVkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZHgtY29sdW1uXG4gICAgICAgICAgICAgIGRhdGEtZmllbGQ9XCJrZXlcIlxuICAgICAgICAgICAgICBjYXB0aW9uPVwi0JrQu9GO0YdcIlxuICAgICAgICAgICAgICA6dmlzaWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZHgtY29sdW1uXG4gICAgICAgICAgICAgIGRhdGEtZmllbGQ9XCJ0aXRsZVwiXG4gICAgICAgICAgICAgIGNhcHRpb249XCLQndCw0LfQstCw0L3QuNC1XCJcbiAgICAgICAgICAgICAgOmVkaXRpbmc9XCJ7IGFsbG93VXBkYXRpbmc6IHRydWUgfVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGR4LWNvbHVtblxuICAgICAgICAgICAgICBkYXRhLWZpZWxkPVwidGFnc1RleHRcIlxuICAgICAgICAgICAgICBjYXB0aW9uPVwi0KLQtdC80YtcIlxuICAgICAgICAgICAgICA6ZWRpdGluZz1cInsgYWxsb3dVcGRhdGluZzogdHJ1ZSB9XCJcbiAgICAgICAgICAgICAgOmhlYWRlci1maWx0ZXI9XCJ7IGRhdGFTb3VyY2U6IHRhZ3NIZWFkZXJGaWx0ZXIgfVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGR4LXBhZ2luZyA6cGFnZS1zaXplPVwiNTBcIiAvPlxuICAgICAgICAgIDwvZHgtZGF0YS1ncmlkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYXNpZGU+XG5cbiAgICAgIDwhLS0g0KHQutGA0YvRgtGL0Lkg0YHQv9C40YHQvtC6OiDRgdC/0LvQuNGC0YLQtdGAINC30LDQvNC10L3Rj9C10YIg0LrQvdC+0L/QutGDLdC60L3QvtC/0LrQvtC5INCyINGC0YPQu9Cx0LDRgNC1LFxuICAgICAgICAgICDQt9C00LXRgdGMINC+0YHRgtCw0ZHRgtGB0Y8g0YLQvtC90LrQsNGPINC/0L7Qu9C+0YHQsCDQtNC70Y8g0LLQvtC30LLRgNCw0YLQsCDRh9C10YDQtdC3INGC0YPQu9Cx0LDRgCAtLT5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImxpc3RPcGVuXCJcbiAgICAgICAgY2xhc3M9XCJxcV9fc3BsaXR0ZXJcIlxuICAgICAgICByb2xlPVwic2VwYXJhdG9yXCJcbiAgICAgICAgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcbiAgICAgICAgdGl0bGU9XCLQn9C+0YLRj9C90LjRgtC1LCDRh9GC0L7QsdGLINC40LfQvNC10L3QuNGC0Ywg0YjQuNGA0LjQvdGDINGB0L/QuNGB0LrQsFwiXG4gICAgICAgIEBtb3VzZWRvd249XCJzdGFydExpc3RSZXNpemVcIlxuICAgICAgLz5cblxuICAgICAgPCEtLSDilIDilIDilIAg0KbQtdC90YLRgDog0YDQtdC00LDQutGC0L7RgCBTUUwgKyDQs9GA0LjQtCDRgNC10LfRg9C70YzRgtCw0YLQsCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG4gICAgICA8c2VjdGlvblxuICAgICAgICB2LWlmPVwiYWN0aXZlLmtleSB8fCBpc05ld1wiXG4gICAgICAgIGNsYXNzPVwicXFfX3BhbmVsIHRoZW1lLWRlcGVuZGVudFwiXG4gICAgICA+XG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJxcV9faGVhZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxcV9faGVhZC10aXRsZVwiPlxuICAgICAgICAgICAge3sgYWN0aXZlLnRpdGxlIHx8ICfQndC+0LLRi9C5INC30LDQv9GA0L7RgScgfX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicXFfX2hlYWQtc3ViXCI+wrcge3sgYWN0aXZlLmtleSB8fCAn0LHQtdC3INC60LvRjtGH0LAnIH19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkeC1idXR0b25cbiAgICAgICAgICAgIGljb249XCJjbG9ja1wiXG4gICAgICAgICAgICBzdHlsaW5nLW1vZGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGhpbnQ9XCLQmNGB0YLQvtGA0LjRjyDQuNC30LzQtdC90LXQvdC40LlcIlxuICAgICAgICAgICAgOmRpc2FibGVkPVwiIWFjdGl2ZS5rZXkgfHwgaXNOZXdcIlxuICAgICAgICAgICAgQGNsaWNrPVwib3Blbkhpc3RvcnkoKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInFxX19zY3JvbGxcIj5cbiAgICAgICAgICA8IS0tINCh0LLQvtC50YHRgtCy0LA6INC60LvRjtGHICjQvdC+0LLRi9C5KSDQuCDRgtC10LzRiyDigJQg0LHQsNC30LAg0L/QtdGA0LXQtdGF0LDQu9CwINCyINGI0LDQv9C60YMgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInFxX19wcm9wcy1ncmlkXCI+XG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgdi1pZj1cImlzTmV3XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxcV9fZmllbGRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFxX19maWVsZC1sYWJlbFwiPtCa0LvRjtGHIDxiPio8L2I+PC9zcGFuPlxuICAgICAgICAgICAgICA8ZHgtdGV4dC1ib3hcbiAgICAgICAgICAgICAgICA6dmFsdWU9XCJhY3RpdmUua2V5XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk9TVl9wbGF0ZXpoaVwiXG4gICAgICAgICAgICAgICAgQHZhbHVlLWNoYW5nZWQ9XCJzZXQoJ2tleScsICRldmVudC52YWx1ZSlcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICB2LWlmPVwiaXNOZXdcIlxuICAgICAgICAgICAgICBjbGFzcz1cInFxX19maWVsZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicXFfX2ZpZWxkLWxhYmVsXCI+0J3QsNC30LLQsNC90LjQtSA8Yj4qPC9iPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPGR4LXRleHQtYm94XG4gICAgICAgICAgICAgICAgOnZhbHVlPVwiYWN0aXZlLnRpdGxlXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCe0KHQkjog0L/Qu9Cw0YLQtdC20LhcIlxuICAgICAgICAgICAgICAgIEB2YWx1ZS1jaGFuZ2VkPVwic2V0KCd0aXRsZScsICRldmVudC52YWx1ZSlcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInFxX19maWVsZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFxX19maWVsZC1sYWJlbFwiPtCi0LXQvNGLPC9zcGFuPlxuICAgICAgICAgICAgICA8ZHgtdGFnLWJveFxuICAgICAgICAgICAgICAgIDp2YWx1ZT1cImFjdGl2ZS50YWdzXCJcbiAgICAgICAgICAgICAgICA6aXRlbXM9XCJ0aGVtZU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIDphY2NlcHQtY3VzdG9tLXZhbHVlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgOnNob3ctc2VsZWN0aW9uLWNvbnRyb2xzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQntCh0JIsINCa0KLQoOKAplwiXG4gICAgICAgICAgICAgICAgQHZhbHVlLWNoYW5nZWQ9XCJzZXQoJ3RhZ3MnLCAkZXZlbnQudmFsdWUgfHwgW10pXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJxcV9fZmllbGRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxcV9fZmllbGQtbGFiZWxcIj7QkdCw0LfQsCDQtNCw0L3QvdGL0YU8L3NwYW4+XG4gICAgICAgICAgICAgIDxkeC1zZWxlY3QtYm94XG4gICAgICAgICAgICAgICAgOnZhbHVlPVwiYWN0aXZlLmRiX2tleVwiXG4gICAgICAgICAgICAgICAgOml0ZW1zPVwiZGJPcHRpb25zXCJcbiAgICAgICAgICAgICAgICB2YWx1ZS1leHByPVwiaWRcIlxuICAgICAgICAgICAgICAgIGRpc3BsYXktZXhwcj1cIm5hbWVcIlxuICAgICAgICAgICAgICAgIDpzaG93LWNsZWFyLWJ1dHRvbj1cInRydWVcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0J3QtSDQstGL0LHRgNCw0L3QsFwiXG4gICAgICAgICAgICAgICAgQHZhbHVlLWNoYW5nZWQ9XCJzZXQoJ2RiX2tleScsICRldmVudC52YWx1ZSlcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwhLS0gU1FMIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxcV9fY2hpcHNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdi1mb3I9XCJ0b2tlbiBpbiBpbnNlcnRUb2tlbnNcIlxuICAgICAgICAgICAgICA6a2V5PVwidG9rZW5cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxcV9fY2hpcFwiXG4gICAgICAgICAgICAgIDp0aXRsZT1cIifQktGB0YLQsNCy0LjRgtGMICcgKyB0b2tlblwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImluc2VydCh0b2tlbilcIlxuICAgICAgICAgICAgPnt7IHRva2VuIH19PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInFxX19tb25hY29cIj5cbiAgICAgICAgICAgIDxzcWwtZWRpdG9yXG4gICAgICAgICAgICAgIHJlZj1cImVkaXRvclJlZlwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJkcmFmdC5zcWxcIlxuICAgICAgICAgICAgICA6aGVpZ2h0PVwiZWRpdG9ySGVpZ2h0XCJcbiAgICAgICAgICAgICAgOmRiLW5hbWU9XCJhY3RpdmUuZGJfa2V5XCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uU3FsSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPCEtLSDQk9C+0YDQuNC30L7QvdGC0LDQu9GM0L3Ri9C5INGA0LXRgdCw0LnQtyDRgNC10LTQsNC60YLQvtGAIOKGlCDQs9GA0LjQtCAtLT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInFxX19ocmVzaXplclwiXG4gICAgICAgICAgICByb2xlPVwic2VwYXJhdG9yXCJcbiAgICAgICAgICAgIGFyaWEtb3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcbiAgICAgICAgICAgIHRpdGxlPVwi0J/QvtGC0Y/QvdC40YLQtSwg0YfRgtC+0LHRiyDQuNC30LzQtdC90LjRgtGMINCy0YvRgdC+0YLRgyDRgNC10LTQsNC60YLQvtGA0LAg0Lgg0YLQsNCx0LvQuNGG0YtcIlxuICAgICAgICAgICAgQG1vdXNlZG93bj1cInN0YXJ0U3FsUmVzaXplXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxcV9fcmVzdWx0XCI+XG4gICAgICAgICAgICA8ZHgtZGF0YS1ncmlkXG4gICAgICAgICAgICAgIHJlZj1cInJlc3VsdEdyaWRSZWZcIlxuICAgICAgICAgICAgICA6ZGF0YS1zb3VyY2U9XCJyZXN1bHRSb3dzXCJcbiAgICAgICAgICAgICAgOmNvbHVtbnM9XCJyZXN1bHRDb2x1bW5zXCJcbiAgICAgICAgICAgICAgOnNob3ctYm9yZGVycz1cInRydWVcIlxuICAgICAgICAgICAgICA6Y29sdW1uLWF1dG8td2lkdGg9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgOmFsbG93LWNvbHVtbi1yZXNpemluZz1cInRydWVcIlxuICAgICAgICAgICAgICA6aG92ZXItc3RhdGUtZW5hYmxlZD1cInRydWVcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8IS0tINCf0YPRgdGC0L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUgLS0+XG4gICAgICA8c2VjdGlvblxuICAgICAgICB2LWVsc2VcbiAgICAgICAgY2xhc3M9XCJxcV9fcGxhY2Vob2xkZXIgdGhlbWUtZGVwZW5kZW50XCJcbiAgICAgID5cbiAgICAgICAg0JLRi9Cx0LXRgNC40YLQtSDQt9Cw0L/RgNC+0YEg0LIg0YHQv9C40YHQutC1INGB0LvQtdCy0LAg0LjQu9C4INGB0L7Qt9C00LDQudGC0LUg0L3QvtCy0YvQuS5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPCEtLSDilIDilIDilIAg0KHQv9GA0LDQstCwOiDRhNC40LvRjNGC0YDRiyDQt9Cw0L/RgNC+0YHQsCDQuCDQuNGFINC30L3QsNGH0LXQvdC40Y8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAIC0tPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCJhY3RpdmUua2V5IHx8IGlzTmV3XCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInFxX19zcGxpdHRlclwiXG4gICAgICAgICAgdGl0bGU9XCLQn9C+0YLRj9C90LjRgtC1LCDRh9GC0L7QsdGLINC40LfQvNC10L3QuNGC0Ywg0YjQuNGA0LjQvdGDINCx0LvQvtC60LAg0YTQuNC70YzRgtGA0L7QslwiXG4gICAgICAgICAgQG1vdXNlZG93bj1cInN0YXJ0RmlsdGVyc1Jlc2l6ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxhc2lkZVxuICAgICAgICAgIHYtc2hvdz1cImZpbHRlcnNPcGVuXCJcbiAgICAgICAgICBjbGFzcz1cInFxX19maWx0ZXJzIHRoZW1lLWRlcGVuZGVudFwiXG4gICAgICAgICAgOnN0eWxlPVwieyB3aWR0aDogYCR7ZmlsdGVyc1dpZHRofXB4YCB9XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XCJxcV9fZmlsdGVycy1oZWFkXCI+XG4gICAgICAgICAgICA8c3Bhbj7QpNC40LvRjNGC0YDRiyDQt9Cw0L/RgNC+0YHQsDwvc3Bhbj5cbiAgICAgICAgICAgIDxkeC1idXR0b25cbiAgICAgICAgICAgICAgdi1pZj1cInNlbGVjdGVkRGVmcy5sZW5ndGhcIlxuICAgICAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgICAgIHN0eWxpbmctbW9kZT1cInRleHRcIlxuICAgICAgICAgICAgICBoaW50PVwi0J/QvtC00YHRgtCw0LLQuNGC0Ywg0LTQuNC90LDQvNC40YfQtdGB0LrQuNC1INGD0LzQvtC70YfQsNC90LjRjyAo0L/RgNC+0YjQu9GL0Lkg0LzQtdGB0Y/RhuKApilcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJhcHBseURlZmF1bHRzKClcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgIDwhLS0g0KHQstC+0Lkg0YHQutGA0L7Qu9C7OiDQstGL0LHQvtGAINGE0LjQu9GM0YLRgNC+0LIgKyDQt9C90LDRh9C10L3QuNGPLCDRhNC40LvRjNGC0YDRiyDQsdGL0LLQsNGO0YIg0LLRi9GB0L7QutC40LzQuCAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicXFfX2ZpbHRlcnMtYm9keVwiPlxuICAgICAgICAgICAgPGR4LXRhZy1ib3hcbiAgICAgICAgICAgICAgY2xhc3M9XCJxcV9fZmlsdGVycy10YWdcIlxuICAgICAgICAgICAgICA6dmFsdWU9XCJhY3RpdmUuZmlsdGVyc1wiXG4gICAgICAgICAgICAgIDppdGVtcz1cImZpbHRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICB2YWx1ZS1leHByPVwiZmllbGRcIlxuICAgICAgICAgICAgICBkaXNwbGF5LWV4cHI9XCJjYXB0aW9uXCJcbiAgICAgICAgICAgICAgOnNlYXJjaC1lbmFibGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIDpzaG93LXNlbGVjdGlvbi1jb250cm9scz1cInRydWVcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCS0YvQsdC10YDQuNGC0LUg0YTQuNC70YzRgtGA0Ysg4oCUINC40Lcg0L3QuNGFINGB0YLRgNC+0LjRgtGB0Y8g0YTQvtGA0LzQsCDQuCDQv9C70LXQudGB0YXQvtC70LTQtdGA0YtcIlxuICAgICAgICAgICAgICBAdmFsdWUtY2hhbmdlZD1cInNldCgnZmlsdGVycycsICRldmVudC52YWx1ZSB8fCBbXSlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicXFfX2hpbnRcIj7Qp9C10LrQsdC+0LrRgdGLINC/0L7QtNC60LvRjtGH0LDRjtGCINGE0LjQu9GM0YLRgDsg0L3QuNC20LUg0L/QvtGP0LLRj9GC0YHRjyDQtdCz0L4g0LfQvdCw0YfQtdC90LjRjy48L3NwYW4+XG5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwic2VsZWN0ZWREZWZzLmxlbmd0aFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXFfX3NlY3Rpb24tdGl0bGVcIj7Ql9C90LDRh9C10L3QuNGPINGE0LjQu9GM0YLRgNC+0LI8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHYtZm9yPVwiZGVmIGluIHNlbGVjdGVkRGVmc1wiXG4gICAgICAgICAgICAgICAgOmtleT1cImRlZi5maWVsZFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJxcV9fdmFsdWVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInFxX192YWx1ZS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAge3sgZGVmLmxhYmVsIHx8IGRlZi5maWVsZCB9fVxuICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3M9XCJxcV9fdmFsdWUta2V5XCI+e3sgZGVmLmZpZWxkIH19PC9jb2RlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxmaWx0ZXItcHJldmlld1xuICAgICAgICAgICAgICAgICAgOmtleT1cImBxdjoke2FjdGl2ZS5rZXl9OiR7ZGVmLmZpZWxkfWBcIlxuICAgICAgICAgICAgICAgICAgOmRlZj1cImRlZi5jb25maWdcIlxuICAgICAgICAgICAgICAgICAgOmluaXRpYWwtdmFsdWU9XCJ2YWx1ZXNbZGVmLmZpZWxkXVwiXG4gICAgICAgICAgICAgICAgICBAdXBkYXRlOnZhbHVlPVwic2V0VmFsdWUoZGVmLmZpZWxkLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgICAgICBjbGFzcz1cInFxX19oaW50XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg0KTQuNC70YzRgtGA0Ysg0L3QtSDQv9C+0LTQutC70Y7Rh9C10L3RiyDigJQg0LLRi9Cx0LXRgNC40YLQtSDRhdC+0YLRjyDQsdGLINC+0LTQuNC9LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYXNpZGU+XG4gICAgICA8L3RlbXBsYXRlPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8aGlzdG9yeS1kcmF3ZXJcbiAgICAgIDp2aXNpYmxlPVwiaGlzdG9yeU9wZW5cIlxuICAgICAgOnRpdGxlPVwiaGlzdG9yeVRpdGxlXCJcbiAgICAgIDppdGVtcz1cImhpc3RvcnlJdGVtc1wiXG4gICAgICBAY2xvc2U9XCJoaXN0b3J5T3BlbiA9IGZhbHNlXCJcbiAgICAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgbmV4dFRpY2ssIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCByZWFjdGl2ZSwgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBEeEJ1dHRvbiB9IGZyb20gJ2RldmV4dHJlbWUtdnVlL2J1dHRvbic7XG5pbXBvcnQgeyBEeENvbHVtbiwgRHhEYXRhR3JpZCwgRHhQYWdpbmcgfSBmcm9tICdkZXZleHRyZW1lLXZ1ZS9kYXRhLWdyaWQnO1xuaW1wb3J0IHsgRHhTZWxlY3RCb3ggfSBmcm9tICdkZXZleHRyZW1lLXZ1ZS9zZWxlY3QtYm94JztcbmltcG9ydCB7IER4VGFnQm94IH0gZnJvbSAnZGV2ZXh0cmVtZS12dWUvdGFnLWJveCc7XG5pbXBvcnQgeyBEeFRleHRCb3ggfSBmcm9tICdkZXZleHRyZW1lLXZ1ZS90ZXh0LWJveCc7XG5pbXBvcnQgeyBEeFRyZWVWaWV3IH0gZnJvbSAnZGV2ZXh0cmVtZS12dWUvdHJlZS12aWV3JztcbmltcG9ydCBGaWx0ZXJQcmV2aWV3IGZyb20gJ0AvY29tcG9uZW50cy9saWJyYXJ5L2ZpbHRlci1wcmV2aWV3LnZ1ZSc7XG5pbXBvcnQgSGlzdG9yeURyYXdlciwgeyB0eXBlIEhpc3RvcnlJdGVtIH0gZnJvbSAnQC9jb21wb25lbnRzL2NvbW1vbi9oaXN0b3J5LWRyYXdlci52dWUnO1xuaW1wb3J0IFNxbEVkaXRvciBmcm9tICdAL2NvbXBvbmVudHMvcmVwb3J0LWVkaXRvci9zcWwtZWRpdG9yLnZ1ZSc7XG5pbXBvcnQgeyBmaWx0ZXJzQXBpLCB0eXBlIEZpbHRlckRlZiB9IGZyb20gJ0Avc2VydmljZXMvZmlsdGVycy1hcGknO1xuaW1wb3J0IHtcbiAgcXVlcmllc0FwaSxcbiAgdHlwZSBRdWVyeUNvbHVtbixcbiAgdHlwZSBRdWVyeURlZixcbiAgdHlwZSBRdWVyeVBheWxvYWQsXG59IGZyb20gJ0Avc2VydmljZXMvcXVlcmllcy1hcGknO1xuaW1wb3J0IHsgcmVwb3J0c0FwaSB9IGZyb20gJ0Avc2VydmljZXMvcmVwb3J0cy1hcGknO1xuaW1wb3J0IHsgZmlsdGVyUHJvdG90eXBlIH0gZnJvbSAnQC91dGlscy9maWx0ZXItcHJvdG90eXBlcyc7XG5pbXBvcnQgeyBkeW5hbWljRmlsdGVyVmFsdWUsIHBsYWNlaG9sZGVyVG9rZW5zIH0gZnJvbSAnQC91dGlscy9maWx0ZXItdmFsdWVzJztcbmltcG9ydCB7IGludGVycG9sYXRlUXVlcnkgfSBmcm9tICdAL3V0aWxzL3F1ZXJ5LWludGVycG9sYXRlJztcblxuLy8g0JfQsNC/0YDQvtGB0YssINGC0YDQuCDQutC+0LvQvtC90LrQuDogRGF0YUdyaWQg0LfQsNC/0YDQvtGB0L7QsiAoZWRpdC1pbi1yb3cpIHwgU1FMICsg0YDQtdC30YPQu9GM0YLQsNGCIHxcbi8vINGE0LjQu9GM0YLRgNGLINC30LDQv9GA0L7RgdCwINC4INC40YUg0LfQvdCw0YfQtdC90LjRjy4g0KHQv9C40YHQvtC6INC4INGE0LjQu9GM0YLRgNGLINGB0LrRgNGL0LLQsNGO0YLRgdGPINC60L3QvtC/0LrQsNC80LgsXG4vLyDRiNC40YDQuNC90Ysg0YLRj9C90YPRgtGB0Y8g0YHQv9C70LjRgtGC0LXRgNCw0LzQuC4g0JLRgdGRIOKAlCDQstC40LTQttC10YLRiyBNU0kuXG5cbmludGVyZmFjZSBEYXRhYmFzZU9wdGlvbiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9XG5cbmNvbnN0IGl0ZW1zID0gcmVmPFF1ZXJ5RGVmW10+KFtdKTtcbmNvbnN0IGFsbEl0ZW1zID0gcmVmPFF1ZXJ5RGVmW10+KFtdKTtcbmNvbnN0IGZpbHRlckRlZnMgPSByZWY8RmlsdGVyRGVmW10+KFtdKTtcbmNvbnN0IGRiT3B0aW9ucyA9IHJlZjxEYXRhYmFzZU9wdGlvbltdPihbXSk7XG5cbmNvbnN0IHN0YXR1cyA9IHJlZignJyk7XG5jb25zdCBzdGF0dXNFcnJvciA9IHJlZihmYWxzZSk7XG5cbi8qKiDQo9C90LjQutCw0LvRjNC90YvQtSDRgtC10LzRiyDQtNC70Y8gaGVhZGVyLdGE0LjQu9GM0YLRgNCwINC60L7Qu9C+0L3QutC4IMKr0KLQtdC80YvCuy4gKi9cbmNvbnN0IHRhZ3NIZWFkZXJGaWx0ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMudmFsdWUpIHtcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiBpdGVtLnRhZ3MgfHwgW10pIHNldC5hZGQodGFnKTtcbiAgfVxuICByZXR1cm4gWy4uLnNldF0uc29ydCgpLm1hcCgodGFnKSA9PiAoeyB2YWx1ZTogdGFnLCB0ZXh0OiB0YWcgfSkpO1xufSk7XG5jb25zdCBydW5uaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGlzTmV3ID0gcmVmKGZhbHNlKTtcblxuY29uc3QgbGlzdE9wZW4gPSByZWYodHJ1ZSk7XG5jb25zdCBmaWx0ZXJzT3BlbiA9IHJlZih0cnVlKTtcbi8vINCh0YLQsNGA0YLQvtCy0YvQtSDQv9GA0L7Qv9C+0YDRhtC40Lg6IDIwJSAvIDQwJSAvIDQwJSDRiNC40YDQuNC90Ysg0L7QutC90LAuXG5jb25zdCBsaXN0V2lkdGggPSByZWYoTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuMikpO1xuY29uc3QgZmlsdGVyc1dpZHRoID0gcmVmKE1hdGgucm91bmQod2luZG93LmlubmVyV2lkdGggKiAwLjQpKTtcblxuY29uc3QgZWRpdG9ySGVpZ2h0ID0gcmVmKDM0MCk7XG5jb25zdCByZXN1bHRIZWlnaHQgPSByZWYoMzIwKTtcblxuY29uc3QgYWN0aXZlID0gcmVhY3RpdmUoe1xuICBrZXk6ICcnLFxuICB0aXRsZTogJycsXG4gIHRhZ3M6IFtdIGFzIHN0cmluZ1tdLFxuICBkYl9rZXk6ICcnLFxuICBmaWx0ZXJzOiBbXSBhcyBzdHJpbmdbXSxcbn0pO1xuY29uc3QgZHJhZnQgPSByZWFjdGl2ZTx7IHNxbDogc3RyaW5nOyBkaXJ0eTogYm9vbGVhbiB9Pih7IHNxbDogJycsIGRpcnR5OiBmYWxzZSB9KTtcbmNvbnN0IHZhbHVlcyA9IHJlYWN0aXZlPFJlY29yZDxzdHJpbmcsIHVua25vd24+Pih7fSk7XG5cbmNvbnN0IGhpc3RvcnlPcGVuID0gcmVmKGZhbHNlKTtcbmNvbnN0IGhpc3RvcnlUaXRsZSA9IHJlZignJyk7XG5jb25zdCBoaXN0b3J5SXRlbXMgPSByZWY8SGlzdG9yeUl0ZW1bXT4oW10pO1xuXG5jb25zdCByZXN1bHRSb3dzID0gcmVmPFJlY29yZDxzdHJpbmcsIHVua25vd24+W10+KFtdKTtcbmNvbnN0IHJlc3VsdENvbHVtbnMgPSByZWY8QXJyYXk8eyBkYXRhRmllbGQ6IHN0cmluZzsgY2FwdGlvbjogc3RyaW5nIH0+PihbXSk7XG5cbmNvbnN0IGVkaXRvclJlZiA9IHJlZjx7IGluc2VydFBsYWNlaG9sZGVyOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKTtcbmNvbnN0IHJlc3VsdEdyaWRSZWYgPSByZWY8YW55PihudWxsKTtcbmNvbnN0IGxpc3RHcmlkUmVmID0gcmVmPGFueT4obnVsbCk7XG5cbi8qKiDQodCx0L7RgNC60LAgTVNJINC40LPQvdC+0YDQuNGA0YPQtdGCIHNlYXJjaFBhbmVsL2ZpbHRlclJvdyDQsiDQutC+0L3RgdGC0YDRg9C60YLQvtGA0LUgRGF0YUdyaWQg4oCUXG4gKiAg0LLQutC70Y7Rh9Cw0LXQvCDQv9C+0YHRgi3RgdC+0LfQtNCw0L3QuNC10Lwg0L/QvtGB0LvQtSDQv9C10YDQstC+0LPQviDQt9Cw0L/Rg9GB0LrQsC4gKi9cbmZ1bmN0aW9uIGVuYWJsZVJlc3VsdEdyaWRTZWFyY2goKTogdm9pZCB7XG4gIGNvbnN0IGluc3QgPSByZXN1bHRHcmlkUmVmLnZhbHVlPy5pbnN0YW5jZTtcbiAgaWYgKCFpbnN0KSByZXR1cm47XG4gIHRyeSB7XG4gICAgaW5zdC5vcHRpb24oJ2ZpbHRlclJvdycsIHtcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBhcHBseUZpbHRlcjogJ2F1dG8nLFxuICAgIH0pO1xuICAgIGluc3Qub3B0aW9uKCdzZWFyY2hQYW5lbCcsIHsgdmlzaWJsZTogZmFsc2UgfSk7XG4gICAgaW5zdC5vcHRpb24oJ2hlYWRlckZpbHRlcicsIHsgdmlzaWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCB7IC8qINC90LUg0LrRgNC40YLQuNGH0L3QviAqLyB9XG59XG5cbndhdGNoKFtyZXN1bHRSb3dzLCByZXN1bHRDb2x1bW5zXSwgKCkgPT4ge1xuICB2b2lkIG5leHRUaWNrKCgpID0+IGVuYWJsZVJlc3VsdEdyaWRTZWFyY2goKSk7XG59KTtcblxuLy8g4pSA4pSA4pSAINCh0J/QmNCh0J7QmiDQl9CQ0J/QoNCe0KHQntCSOiBEYXRhR3JpZCDRgSDQv9GA0LDQstC60L7QuSDQsiDRgdGC0YDQvtC60LUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IGdyaWRSb3dzID0gY29tcHV0ZWQoKCkgPT4gaXRlbXMudmFsdWUubWFwKChpdGVtKSA9PiAoe1xuICBrZXk6IGl0ZW0ua2V5LFxuICB0aXRsZTogaXRlbS50aXRsZSB8fCBpdGVtLmtleSxcbiAgdGFnc1RleHQ6IChpdGVtLnRhZ3MgfHwgW10pLmpvaW4oJywgJyksXG59KSkpO1xuXG5jb25zdCBsaXN0Q29sdW1ucyA9IFtcbiAgeyBkYXRhRmllbGQ6ICd0aXRsZScsIGNhcHRpb246ICfQndCw0LfQstCw0L3QuNC1JywgZWRpdGluZzogeyBhbGxvd1VwZGF0aW5nOiB0cnVlIH0gfSxcbiAgeyBkYXRhRmllbGQ6ICd0YWdzVGV4dCcsIGNhcHRpb246ICfQotC10LzRiycsIGVkaXRpbmc6IHsgYWxsb3dVcGRhdGluZzogdHJ1ZSB9IH0sXG5dO1xuXG5mdW5jdGlvbiBvbkdyaWRSb3dDbGljayhlOiB7IHJvd1R5cGU/OiBzdHJpbmc7IGRhdGE/OiB7IGtleT86IHN0cmluZyB9IH0pOiB2b2lkIHtcbiAgaWYgKGUucm93VHlwZSAhPT0gJ2RhdGEnIHx8ICFlLmRhdGE/LmtleSkgcmV0dXJuO1xuICBpZiAoZS5kYXRhLmtleSAhPT0gYWN0aXZlLmtleSkgb3BlbihlLmRhdGEua2V5KTtcbn1cblxuLyoqINCf0L7QuNGB0Log0LIg0LvQtdCy0L7QvCDQs9GA0LjQtNC1OiBzZWFyY2hQYW5lbCDQuCBmaWx0ZXJSb3cg0YHQsdC+0YDQutC4IE1TSSDQv9GA0LjQvNC10L3Rj9C10LxcbiAqICDQv9C+0YHRgi3RgdC+0LfQtNCw0L3QuNC10LwgKNCyINC60L7QvdGB0YLRgNGD0LrRgtC+0YDQtSDQuNCz0L3QvtGA0LjRgNGD0Y7RgtGB0Y8pLiAqL1xuZnVuY3Rpb24gYXBwbHlMaXN0U2VhcmNoKCk6IHZvaWQge1xuICBjb25zdCBpbnN0ID0gbGlzdEdyaWRSZWYudmFsdWU/Lmluc3RhbmNlO1xuICBpZiAoIWluc3QpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBpbnN0Lm9wdGlvbignc2VhcmNoUGFuZWwnLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIHBsYWNlaG9sZGVyOiAn0J/QvtC40YHQuuKApicgfSk7XG4gICAgaW5zdC5vcHRpb24oJ2ZpbHRlclJvdycsIHsgdmlzaWJsZTogdHJ1ZSwgYXBwbHlGaWx0ZXI6ICdhdXRvJyB9KTtcbiAgICBpbnN0Lm9wdGlvbignaGVhZGVyRmlsdGVyJywgeyB2aXNpYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIHsgLyog0L3QtSDQutGA0LjRgtC40YfQvdC+ICovIH1cbn1cblxuLyoqINCf0YDQsNCy0LrQsCDQvdCw0LfQstCw0L3QuNGPL9GC0LXQvCDQsiDRgdGC0YDQvtC60LU6INGH0LjRgtCw0LXQvCDQvtGC0YfRkdGCLCDQvNC10L3Rj9C10Lwg0YLQvtC70YzQutC+INGN0YLQuCDQv9C+0LvRjy4gKi9cbmFzeW5jIGZ1bmN0aW9uIG9uR3JpZFJvd1VwZGF0ZWQoZTogeyBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47IGtleT86IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGtleSA9IFN0cmluZyhlPy5rZXkgPz8gZT8uZGF0YT8ua2V5ID8/ICcnKTtcbiAgaWYgKCFrZXkpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXBvcnQgPSBhd2FpdCBxdWVyaWVzQXBpLmdldChrZXkpO1xuICAgIGNvbnN0IHRpdGxlID0gU3RyaW5nKGU/LmRhdGE/LnRpdGxlID8/IHJlcG9ydC50aXRsZSA/PyAnJyk7XG4gICAgY29uc3QgdGFncyA9IFN0cmluZyhlPy5kYXRhPy50YWdzVGV4dCA/PyAocmVwb3J0LnRhZ3MgfHwgW10pLmpvaW4oJywgJykpXG4gICAgICAuc3BsaXQoJywnKS5tYXAoKHQpID0+IHQudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgYXdhaXQgcXVlcmllc0FwaS51cGRhdGUoa2V5LCB7XG4gICAgICBrZXksXG4gICAgICB0aXRsZSxcbiAgICAgIHRhZ3MsXG4gICAgICBkYl9rZXk6IHJlcG9ydC5kYl9rZXkgfHwgJycsXG4gICAgICBmaWx0ZXJzOiByZXBvcnQuZmlsdGVycyB8fCBbXSxcbiAgICAgIHNxbDogcmVwb3J0LnNxbCB8fCAnJyxcbiAgICAgIGNvbHVtbnM6IHJlcG9ydC5jb2x1bW5zIHx8IFtdLFxuICAgIH0pO1xuICAgIGl0ZW1zLnZhbHVlID0gaXRlbXMudmFsdWUubWFwKChpdGVtKSA9PiAoaXRlbS5rZXkgPT09IGtleVxuICAgICAgPyB7IC4uLml0ZW0sIHRpdGxlLCB0YWdzIH1cbiAgICAgIDogaXRlbSkpO1xuICAgIGlmIChhY3RpdmUua2V5ID09PSBrZXkpIHtcbiAgICAgIGFjdGl2ZS50aXRsZSA9IHRpdGxlO1xuICAgICAgYWN0aXZlLnRhZ3MgPSB0YWdzO1xuICAgIH1cbiAgICBzdGF0dXMudmFsdWUgPSAn0KHRgtGA0L7QutCwINGB0L7RhdGA0LDQvdC10L3QsCc7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCd0LUg0YPQtNCw0LvQvtGB0Ywg0YHQvtGF0YDQsNC90LjRgtGMINGB0YLRgNC+0LrRgzogJHsoZXJyIGFzIEVycm9yKS5tZXNzYWdlfWA7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSB0cnVlO1xuICB9XG59XG5cbi8vIOKUgOKUgOKUgCDQktCr0KfQmNCh0JvQr9CV0JzQq9CVIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBjYW5SdW4gPSBjb21wdXRlZCgoKSA9PiBCb29sZWFuKGRyYWZ0LnNxbC50cmltKCkpICYmICFydW5uaW5nLnZhbHVlICYmICFpc05ldy52YWx1ZSk7XG5jb25zdCBjYW5TYXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgQm9vbGVhbihhY3RpdmUua2V5LnRyaW0oKSAmJiBhY3RpdmUudGl0bGUudHJpbSgpICYmIGRyYWZ0LnNxbC50cmltKCkpICYmIGRyYWZ0LmRpcnR5KTtcblxuY29uc3QgZGJMYWJlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgZm91bmQgPSBkYk9wdGlvbnMudmFsdWUuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gYWN0aXZlLmRiX2tleSk7XG4gIHJldHVybiBmb3VuZCA/IGZvdW5kLm5hbWUgOiBhY3RpdmUuZGJfa2V5O1xufSk7XG5cbmNvbnN0IGZpbHRlck9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiBmaWx0ZXJEZWZzLnZhbHVlLm1hcCgoZGVmKSA9PiAoe1xuICBmaWVsZDogZGVmLmZpZWxkLFxuICBjYXB0aW9uOiBgJHtkZWYuZmllbGR9IOKAlCAke2RlZi5sYWJlbCB8fCBkZWYudHlwZX1gLFxufSkpKTtcblxuY29uc3QgdGhlbWVPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBhbGwgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zLnZhbHVlKSB7XG4gICAgZm9yIChjb25zdCB0YWcgb2YgaXRlbS50YWdzIHx8IFtdKSBhbGwuYWRkKHRhZyk7XG4gIH1cbiAgcmV0dXJuIFsuLi5hbGxdLnNvcnQoKTtcbn0pO1xuXG5jb25zdCBzZWxlY3RlZERlZnMgPSBjb21wdXRlZCgoKSA9PiBmaWx0ZXJEZWZzLnZhbHVlLmZpbHRlcigoZGVmKSA9PiBhY3RpdmUuZmlsdGVycy5pbmNsdWRlcyhkZWYuZmllbGQpKSk7XG5cbi8vINCf0L7QtNC60LvRjtGH0LXQvdC40LUg0YTQuNC70YzRgtGA0LAg4oCUINGB0YDQsNC30YMg0YHRgtCw0YDRgtC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0LIgcGxhY2Vob2xkZXIgdmFyOlxuLy8g0LTQuNCw0L/QsNC30L7QvdGLINC/0L7Qu9GD0YfQsNGO0YIgZC9tL25fc3RhcnQrZW5kLCDRh9GC0L7QsdGLINGH0LjQvyDQsiBTUUwg0YHRgNCw0LfRgyDQsdGL0LsgwqvQt9Cw0L/QvtC70L3QtdC9wrsuXG53YXRjaChzZWxlY3RlZERlZnMsIChkZWZzKSA9PiB7XG4gIGZvciAoY29uc3QgZGVmIG9mIGRlZnMpIHtcbiAgICBpZiAodmFsdWVzW2RlZi5maWVsZF0gIT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgY29uc3QgcHJvdG8gPSBmaWx0ZXJQcm90b3R5cGUoZGVmLnR5cGUpO1xuICAgIGlmICghcHJvdG8pIGNvbnRpbnVlO1xuICAgIGNvbnN0IHZhbHVlID0gZHluYW1pY0ZpbHRlclZhbHVlKHByb3RvKTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgdmFsdWVzW2RlZi5maWVsZF0gPSB2YWx1ZTtcbiAgfVxufSk7XG5cbmNvbnN0IGluc2VydFRva2VucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgdG9rZW5zOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGRlZiBvZiBzZWxlY3RlZERlZnMudmFsdWUpIHtcbiAgICBjb25zdCBwcm90byA9IGZpbHRlclByb3RvdHlwZShkZWYudHlwZSk7XG4gICAgaWYgKCFwcm90bykgY29udGludWU7XG4gICAgdG9rZW5zLnB1c2goLi4ucGxhY2Vob2xkZXJUb2tlbnMocHJvdG8sIGRlZi5maWVsZCwgZGVmLmNvbmZpZy52YXIgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpKTtcbiAgfVxuICByZXR1cm4gWy4uLm5ldyBTZXQodG9rZW5zKV07XG59KTtcblxuLy8g4pSA4pSA4pSAINCX0JDQk9Cg0KPQl9Ca0JAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgW2xpc3QsIGZpbHRlcnMsIGRhdGFiYXNlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBxdWVyaWVzQXBpLmxpc3QoKSxcbiAgICAgIGZpbHRlcnNBcGkubGlzdCgpLmNhdGNoKCgpID0+ICh7IGZpbHRlcnM6IFtdIGFzIEZpbHRlckRlZltdLCB0b3RhbDogMCB9KSksXG4gICAgICByZXBvcnRzQXBpLmdldERhdGFiYXNlcygpLmNhdGNoKCgpID0+ICh7IGRhdGFiYXNlczogW10gfSkpLFxuICAgIF0pO1xuICAgIGFsbEl0ZW1zLnZhbHVlID0gbGlzdC5xdWVyaWVzIHx8IFtdO1xuICAgIGl0ZW1zLnZhbHVlID0gYWxsSXRlbXMudmFsdWU7XG4gICAgZmlsdGVyRGVmcy52YWx1ZSA9IGZpbHRlcnMuZmlsdGVycyB8fCBbXTtcbiAgICBkYk9wdGlvbnMudmFsdWUgPSAoZGF0YWJhc2VzLmRhdGFiYXNlcyB8fCBbXSkubWFwKChkYikgPT4gKHsgaWQ6IGRiLmlkLCBuYW1lOiBkYi5uYW1lIH0pKTtcbiAgICBpZiAoYWxsSXRlbXMudmFsdWUubGVuZ3RoICYmICFhbGxJdGVtcy52YWx1ZS5zb21lKChpKSA9PiBpLmtleSA9PT0gYWN0aXZlLmtleSkpIHtcbiAgICAgIG9wZW4oYWxsSXRlbXMudmFsdWVbMF0ua2V5KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGF0dXMudmFsdWUgPSBg0J3QtSDRg9C00LDQu9C+0YHRjCDQv9GA0L7Rh9C40YLQsNGC0Ywg0LfQsNC/0YDQvtGB0Ys6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgdm9pZCBuZXh0VGljaygoKSA9PiBhcHBseUxpc3RTZWFyY2goKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlRdWVyeShpdGVtOiBRdWVyeURlZikge1xuICBhY3RpdmUua2V5ID0gaXRlbS5rZXk7XG4gIGFjdGl2ZS50aXRsZSA9IGl0ZW0udGl0bGUgfHwgJyc7XG4gIGFjdGl2ZS50YWdzID0gWy4uLihpdGVtLnRhZ3MgfHwgW10pXTtcbiAgYWN0aXZlLmRiX2tleSA9IGl0ZW0uZGJfa2V5IHx8ICcnO1xuICBhY3RpdmUuZmlsdGVycyA9IFsuLi4oaXRlbS5maWx0ZXJzIHx8IFtdKV07XG4gIGRyYWZ0LnNxbCA9IGl0ZW0uc3FsIHx8ICcnO1xuICBkcmFmdC5kaXJ0eSA9IGZhbHNlO1xuICBpc05ldy52YWx1ZSA9IGZhbHNlO1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZXMpKSBkZWxldGUgdmFsdWVzW2tleV07XG4gIHJlc3VsdFJvd3MudmFsdWUgPSBbXTtcbiAgcmVzdWx0Q29sdW1ucy52YWx1ZSA9IFtdO1xufVxuXG5mdW5jdGlvbiBvcGVuKGtleTogc3RyaW5nKSB7XG4gIGNvbnN0IGl0ZW0gPSBpdGVtcy52YWx1ZS5maW5kKChyb3cpID0+IHJvdy5rZXkgPT09IGtleSkgPz8gYWxsSXRlbXMudmFsdWUuZmluZCgocm93KSA9PiByb3cua2V5ID09PSBrZXkpO1xuICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgYXBwbHlRdWVyeShpdGVtKTtcbiAgc3RhdHVzLnZhbHVlID0gJyc7XG4gIHN0YXR1c0Vycm9yLnZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldDxLIGV4dGVuZHMgJ2tleScgfCAndGl0bGUnIHwgJ3RhZ3MnIHwgJ2RiX2tleScgfCAnZmlsdGVycyc+KFxuICBmaWVsZDogSyxcbiAgdmFsdWU6ICh0eXBlb2YgYWN0aXZlKVtLXSxcbik6IHZvaWQge1xuICBhY3RpdmVbZmllbGRdID0gdmFsdWU7XG4gIGRyYWZ0LmRpcnR5ID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb25TcWxJbnB1dCgpOiB2b2lkIHtcbiAgZHJhZnQuZGlydHkgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXcoKSB7XG4gIGFjdGl2ZS5rZXkgPSAnJztcbiAgYWN0aXZlLnRpdGxlID0gJyc7XG4gIGFjdGl2ZS50YWdzID0gW107XG4gIGFjdGl2ZS5kYl9rZXkgPSAnJztcbiAgYWN0aXZlLmZpbHRlcnMgPSBbXTtcbiAgZHJhZnQuc3FsID0gJyc7XG4gIGRyYWZ0LmRpcnR5ID0gdHJ1ZTtcbiAgaXNOZXcudmFsdWUgPSB0cnVlO1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZXMpKSBkZWxldGUgdmFsdWVzW2tleV07XG4gIHJlc3VsdFJvd3MudmFsdWUgPSBbXTtcbiAgcmVzdWx0Q29sdW1ucy52YWx1ZSA9IFtdO1xuICBzdGF0dXMudmFsdWUgPSAn0J3QvtCy0YvQuSDQt9Cw0L/RgNC+0YE6INC30LDQv9C+0LvQvdC40YLQtSDRgdCy0L7QudGB0YLQstCwINC4IFNRTCc7XG4gIHN0YXR1c0Vycm9yLnZhbHVlID0gZmFsc2U7XG4gIHZvaWQgbmV4dFRpY2soKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xcV9fc2Nyb2xsJyk/LnNjcm9sbFRvKHsgdG9wOiAwIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZHVwbGljYXRlKCkge1xuICBpZiAoIWFjdGl2ZS5rZXkpIHJldHVybjtcbiAgYWN0aXZlLmtleSA9ICcnO1xuICBhY3RpdmUudGl0bGUgPSBgJHthY3RpdmUudGl0bGV9ICjQutC+0L/QuNGPKWA7XG4gIGlzTmV3LnZhbHVlID0gdHJ1ZTtcbiAgZHJhZnQuZGlydHkgPSB0cnVlO1xuICBzdGF0dXMudmFsdWUgPSAn0JrQvtC/0LjRjyDRgdC+0LfQtNCw0L3QsCDigJQg0LfQsNC00LDQudGC0LUg0LrQu9GO0YcnO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xufVxuXG4vLyDilIDilIDilIAg0KHQntCl0KDQkNCd0JXQndCY0JUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIHZhbGlkYXRlKCk6IHN0cmluZ1tdIHtcbiAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBrZXkgPSBhY3RpdmUua2V5LnRyaW0oKTtcbiAgaWYgKCFrZXkpIGVycm9ycy5wdXNoKCfQo9C60LDQttC40YLQtSDQutC70Y7RhyDQt9Cw0L/RgNC+0YHQsCcpO1xuICBlbHNlIGlmICghL15bQS1aYS160JAt0K/QsC3Rj9CB0ZFfXVtBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOV9dKiQvLnRlc3Qoa2V5KSkge1xuICAgIGVycm9ycy5wdXNoKCfQmtC70Y7Rhzog0LHRg9C60LLRiywg0YbQuNGE0YDRiyDQuCDQv9C+0LTRh9GR0YDQutC40LLQsNC90LjQtSwg0LHQtdC3INC/0YDQvtCx0LXQu9C+0LInKTtcbiAgfSBlbHNlIGlmIChpc05ldy52YWx1ZSAmJiBhbGxJdGVtcy52YWx1ZS5zb21lKChpdGVtKSA9PiBpdGVtLmtleSA9PT0ga2V5KSkge1xuICAgIGVycm9ycy5wdXNoKGDQmtC70Y7RhyDCqyR7a2V5fcK7INGD0LbQtSDQt9Cw0L3Rj9GCYCk7XG4gIH1cbiAgaWYgKCFhY3RpdmUudGl0bGUudHJpbSgpKSBlcnJvcnMucHVzaCgn0KPQutCw0LbQuNGC0LUg0L3QsNC30LLQsNC90LjQtScpO1xuICBpZiAoIWRyYWZ0LnNxbC50cmltKCkpIGVycm9ycy5wdXNoKCdTUUwg0L3QtSDQt9Cw0L/QvtC70L3QtdC9Jyk7XG4gIHJldHVybiBlcnJvcnM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmUoKSB7XG4gIGNvbnN0IGVycm9ycyA9IHZhbGlkYXRlKCk7XG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gZXJyb3JzWzBdO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXlsb2FkOiBRdWVyeVBheWxvYWQgPSB7XG4gICAga2V5OiBhY3RpdmUua2V5LnRyaW0oKSxcbiAgICB0aXRsZTogYWN0aXZlLnRpdGxlLnRyaW0oKSxcbiAgICB0YWdzOiBhY3RpdmUudGFncyxcbiAgICBkYl9rZXk6IGFjdGl2ZS5kYl9rZXksXG4gICAgZmlsdGVyczogYWN0aXZlLmZpbHRlcnMsXG4gICAgc3FsOiBkcmFmdC5zcWwsXG4gICAgY29sdW1uczogcmVzdWx0Q29sdW1ucy52YWx1ZS5tYXAoKGMpID0+ICh7IGRhdGFGaWVsZDogYy5kYXRhRmllbGQsIGNhcHRpb246IGMuY2FwdGlvbiB9KSksXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoaXNOZXcudmFsdWUpIHtcbiAgICAgIGF3YWl0IHF1ZXJpZXNBcGkuY3JlYXRlKHBheWxvYWQpO1xuICAgICAgaXNOZXcudmFsdWUgPSBmYWxzZTtcbiAgICAgIGFjdGl2ZS5rZXkgPSBwYXlsb2FkLmtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcXVlcmllc0FwaS51cGRhdGUoYWN0aXZlLmtleSwgcGF5bG9hZCk7XG4gICAgfVxuICAgIGRyYWZ0LmRpcnR5ID0gZmFsc2U7XG4gICAgYXdhaXQgbG9hZCgpO1xuICAgIHN0YXR1cy52YWx1ZSA9IGDQodC+0YXRgNCw0L3QtdC90L46ICR7cGF5bG9hZC5rZXl9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCd0LUg0YPQtNCw0LvQvtGB0Ywg0YHQvtGF0YDQsNC90LjRgtGMOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWA7XG4gICAgc3RhdHVzRXJyb3IudmFsdWUgPSB0cnVlO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUN1cnJlbnQoKSB7XG4gIGlmICghYWN0aXZlLmtleSB8fCBpc05ldy52YWx1ZSkgcmV0dXJuO1xuICBpZiAoIXdpbmRvdy5jb25maXJtKGDQo9C00LDQu9C40YLRjCDQt9Cw0L/RgNC+0YEgwqske2FjdGl2ZS5rZXl9wrs/YCkpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBhd2FpdCBxdWVyaWVzQXBpLnJlbW92ZShhY3RpdmUua2V5KTtcbiAgICBhY3RpdmUua2V5ID0gJyc7XG4gICAgYXdhaXQgbG9hZCgpO1xuICAgIHN0YXR1cy52YWx1ZSA9ICfQl9Cw0L/RgNC+0YEg0YPQtNCw0LvRkdC9JztcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RhdHVzLnZhbHVlID0gYNCd0LUg0YPQtNCw0LvQvtGB0Ywg0YPQtNCw0LvQuNGC0Yw6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gIH1cbn1cblxuLy8g4pSA4pSA4pSAINCS0KvQn9Ce0JvQndCV0J3QmNCVINCYINCk0JjQm9Cs0KLQoNCrIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5hc3luYyBmdW5jdGlvbiBvcGVuSGlzdG9yeSgpIHtcbiAgaWYgKCFhY3RpdmUua2V5KSByZXR1cm47XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHF1ZXJpZXNBcGkuaGlzdG9yeShhY3RpdmUua2V5KTtcbiAgICBoaXN0b3J5VGl0bGUudmFsdWUgPSBhY3RpdmUua2V5O1xuICAgIGhpc3RvcnlJdGVtcy52YWx1ZSA9IChkYXRhLnJldmlzaW9ucyB8fCBbXSkubWFwKChyZXZpc2lvbikgPT4gKHtcbiAgICAgIGlkOiByZXZpc2lvbi5pZCxcbiAgICAgIGFjdGlvbjogcmV2aXNpb24uYWN0aW9uLFxuICAgICAgYXQ6IHJldmlzaW9uLmNoYW5nZWRfYXQsXG4gICAgICBieTogcmV2aXNpb24uY2hhbmdlZF9ieSxcbiAgICAgIGRldGFpbDogcmV2aXNpb24uc3FsID8gcmV2aXNpb24uc3FsLnNsaWNlKDAsIDQwMCkgOiB1bmRlZmluZWQsXG4gICAgfSkpO1xuICAgIGhpc3RvcnlPcGVuLnZhbHVlID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0YXR1cy52YWx1ZSA9IGDQmNGB0YLQvtGA0LjRjyDQvdC10LTQvtGB0YLRg9C/0L3QsDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgIHN0YXR1c0Vycm9yLnZhbHVlID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseURlZmF1bHRzKCkge1xuICBsZXQgZmlsbGVkID0gMDtcbiAgZm9yIChjb25zdCBkZWYgb2Ygc2VsZWN0ZWREZWZzLnZhbHVlKSB7XG4gICAgY29uc3QgcHJvdG8gPSBmaWx0ZXJQcm90b3R5cGUoZGVmLnR5cGUpO1xuICAgIGlmICghcHJvdG8pIGNvbnRpbnVlO1xuICAgIGNvbnN0IHZhbHVlID0gZHluYW1pY0ZpbHRlclZhbHVlKHByb3RvKTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgdmFsdWVzW2RlZi5maWVsZF0gPSB2YWx1ZTtcbiAgICBmaWxsZWQgKz0gMTtcbiAgfVxuICBzdGF0dXMudmFsdWUgPSBmaWxsZWRcbiAgICA/IGDQn9C+0LTRgdGC0LDQstC70LXQvdGLINC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y46ICR7ZmlsbGVkfWBcbiAgICA6ICfQoyDQstGL0LHRgNCw0L3QvdGL0YUg0YTQuNC70YzRgtGA0L7QsiDQvdC10YIg0LTQuNC90LDQvNC40YfQtdGB0LrQuNGFINC30L3QsNGH0LXQvdC40LknO1xuICBzdGF0dXNFcnJvci52YWx1ZSA9IGZpbGxlZCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gc2V0VmFsdWUoZmllbGQ6IHN0cmluZywgdmFsdWU6IHVua25vd24pIHtcbiAgdmFsdWVzW2ZpZWxkXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpbnNlcnQodG9rZW46IHN0cmluZykge1xuICBlZGl0b3JSZWYudmFsdWU/Lmluc2VydFBsYWNlaG9sZGVyKHRva2VuKTtcbn1cblxuZnVuY3Rpb24gY29sdW1uc0Zyb21SZXN1bHQocmF3OiB1bmtub3duW10pOiBRdWVyeUNvbHVtbltdIHtcbiAgcmV0dXJuIHJhdy5tYXAoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICBpZiAodHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycpIHJldHVybiB7IGRhdGFGaWVsZDogY29sdW1uLCBjYXB0aW9uOiBjb2x1bW4gfTtcbiAgICBjb25zdCByZWMgPSBjb2x1bW4gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFGaWVsZDogU3RyaW5nKHJlYy5kYXRhRmllbGQgPz8gcmVjLm5hbWUgPz8gYGNvbCR7aW5kZXggKyAxfWApLFxuICAgICAgY2FwdGlvbjogU3RyaW5nKHJlYy5jYXB0aW9uID8/IHJlYy5kYXRhRmllbGQgPz8gcmVjLm5hbWUgPz8gYGNvbCR7aW5kZXggKyAxfWApLFxuICAgIH07XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XG4gIGlmIChpc05ldy52YWx1ZSkge1xuICAgIHN0YXR1cy52YWx1ZSA9ICfQodC90LDRh9Cw0LvQsCDRgdC+0YXRgNCw0L3QuNGC0LUg0LfQsNC/0YDQvtGBJztcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gaW50ZXJwb2xhdGVRdWVyeShkcmFmdC5zcWwsIHZhclZhbHVlcygpKTtcbiAgaWYgKHJlc3VsdC51bnJlc29sdmVkLmxlbmd0aCkge1xuICAgIHN0YXR1cy52YWx1ZSA9IGDQndC1INC30LDQv9C+0LvQvdC10L3RiyDQt9C90LDRh9C10L3QuNGPOiAke3Jlc3VsdC51bnJlc29sdmVkLmpvaW4oJywgJyl9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcnVubmluZy52YWx1ZSA9IHRydWU7XG4gIHN0YXR1cy52YWx1ZSA9ICfQktGL0L/QvtC70L3Rj9C10YLRgdGP4oCmJztcbiAgc3RhdHVzRXJyb3IudmFsdWUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHF1ZXJpZXNBcGkuZXhlY3V0ZShhY3RpdmUuZGJfa2V5IHx8ICcnLCByZXN1bHQuc3FsKTtcbiAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5lcnJvcik7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gY29sdW1uc0Zyb21SZXN1bHQocmVzcG9uc2UuY29sdW1ucyB8fCBbXSk7XG4gICAgY29uc3Qgcm93cyA9IChyZXNwb25zZS5yb3dzIHx8IFtdKS5tYXAoKHJvdykgPT4ge1xuICAgICAgY29uc3QgcmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIHJlY29yZFtjb2x1bW4uZGF0YUZpZWxkXSA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvd1tpbmRleF0gOiBudWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH0pO1xuXG4gICAgcmVzdWx0Q29sdW1ucy52YWx1ZSA9IGNvbHVtbnMubWFwKChjKSA9PiAoeyBkYXRhRmllbGQ6IGMuZGF0YUZpZWxkLCBjYXB0aW9uOiBjLmNhcHRpb24gfHwgYy5kYXRhRmllbGQgfSkpO1xuICAgIHJlc3VsdFJvd3MudmFsdWUgPSByb3dzO1xuICAgIGF3YWl0IHF1ZXJpZXNBcGkuc2F2ZUNvbHVtbnMoYWN0aXZlLmtleSwgY29sdW1ucykuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICBzdGF0dXMudmFsdWUgPSBg0JLRi9C/0L7Qu9C90LXQvdC+OiAke3Jvd3MubGVuZ3RofSDRgdGC0YDQvtC6YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVzdWx0Um93cy52YWx1ZSA9IFtdO1xuICAgIHN0YXR1cy52YWx1ZSA9IGDQntGI0LjQsdC60LAg0LLRi9C/0L7Qu9C90LXQvdC40Y86ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICBzdGF0dXNFcnJvci52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgcnVubmluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICog0JrQsNGA0YLQsCDQt9C90LDRh9C10L3QuNC5INC/0L4gdmFyLdC60L7QvdGC0YDQsNC60YLRgyBTUUw6IHtmb25kfSDihpAgdmFsdWVzWyfQpNCe0J3QlCddLFxuICoge21fc3RhcnR9L3ttX2VuZH0g4oaQINC00LjQsNC/0LDQt9C+0L0uINCU0LjQsNC/0LDQt9C+0L0g0YEg0LTQstGD0LzRjyB2YXIg0YDQsNC30LLQvtGA0LDRh9C40LLQsNC10YLRgdGPXG4gKiDQsiDQtNCy0LAg0YHQutCw0LvRj9GA0LAg4oCUINC60LDQuiBidWlsZFBheWxvYWQg0L7RgtGH0ZHRgtCwLlxuICovXG5mdW5jdGlvbiB2YXJWYWx1ZXMoKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4ge1xuICBjb25zdCBvdXQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gIGZvciAoY29uc3QgZGVmIG9mIHNlbGVjdGVkRGVmcy52YWx1ZSkge1xuICAgIGNvbnN0IHByb3RvID0gZmlsdGVyUHJvdG90eXBlKGRlZi50eXBlKTtcbiAgICBpZiAoIXByb3RvKSBjb250aW51ZTtcbiAgICBjb25zdCBuYW1lcyA9IHBsYWNlaG9sZGVyVG9rZW5zKFxuICAgICAgcHJvdG8sXG4gICAgICBkZWYuZmllbGQsXG4gICAgICAoZGVmLmNvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikudmFyIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxuICAgICkubWFwKCh0b2tlbikgPT4gdG9rZW4ucmVwbGFjZSgvXlxce3xcXH0kL2csICcnKSk7XG4gICAgY29uc3QgcmF3ID0gdmFsdWVzW2RlZi5maWVsZF07XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA+PSAyICYmIHJhdyAmJiB0eXBlb2YgcmF3ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShyYXcpKSB7XG4gICAgICBjb25zdCByZWMgPSByYXcgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICBvdXRbbmFtZXNbMF1dID0gcmVjLnN0YXJ0ID8/ICcnO1xuICAgICAgb3V0W25hbWVzWzFdXSA9IHJlYy5lbmQgPz8gJyc7XG4gICAgfSBlbHNlIGlmIChuYW1lcy5sZW5ndGggPj0gMSkge1xuICAgICAgb3V0W25hbWVzWzBdXSA9IHJhdztcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0W2RlZi5maWVsZF0gPSByYXc7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIOKUgOKUgOKUgCDQoNCV0KHQkNCZ0JfQqyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxubGV0IHJlc2l6aW5nTGlzdCA9IGZhbHNlO1xubGV0IGxpc3RTdGFydFggPSAwO1xubGV0IGxpc3RTdGFydFcgPSAwO1xuXG5mdW5jdGlvbiBvbkxpc3RNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gIGlmICghcmVzaXppbmdMaXN0KSByZXR1cm47XG4gIGNvbnN0IGRlbHRhID0gZXZlbnQuY2xpZW50WCAtIGxpc3RTdGFydFg7XG4gIGxpc3RXaWR0aC52YWx1ZSA9IE1hdGgubWluKDU2MCwgTWF0aC5tYXgoMjIwLCBsaXN0U3RhcnRXICsgZGVsdGEpKTtcbn1cblxuZnVuY3Rpb24gb25MaXN0VXAoKSB7XG4gIHJlc2l6aW5nTGlzdCA9IGZhbHNlO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkxpc3RNb3ZlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTGlzdFVwKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRMaXN0UmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gIHJlc2l6aW5nTGlzdCA9IHRydWU7XG4gIGxpc3RTdGFydFggPSBldmVudC5jbGllbnRYO1xuICBsaXN0U3RhcnRXID0gbGlzdFdpZHRoLnZhbHVlO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkxpc3RNb3ZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTGlzdFVwKTtcbn1cblxubGV0IHJlc2l6aW5nRmlsdGVycyA9IGZhbHNlO1xubGV0IGZpbHRlcnNTdGFydFggPSAwO1xubGV0IGZpbHRlcnNTdGFydFcgPSAwO1xuXG5mdW5jdGlvbiBvbkZpbHRlcnNNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gIGlmICghcmVzaXppbmdGaWx0ZXJzKSByZXR1cm47XG4gIGNvbnN0IGRlbHRhID0gZmlsdGVyc1N0YXJ0WCAtIGV2ZW50LmNsaWVudFg7XG4gIGZpbHRlcnNXaWR0aC52YWx1ZSA9IE1hdGgubWluKDcwMCwgTWF0aC5tYXgoMjgwLCBmaWx0ZXJzU3RhcnRXICsgZGVsdGEpKTtcbn1cblxuZnVuY3Rpb24gb25GaWx0ZXJzVXAoKSB7XG4gIHJlc2l6aW5nRmlsdGVycyA9IGZhbHNlO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkZpbHRlcnNNb3ZlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uRmlsdGVyc1VwKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRGaWx0ZXJzUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gIHJlc2l6aW5nRmlsdGVycyA9IHRydWU7XG4gIGZpbHRlcnNTdGFydFggPSBldmVudC5jbGllbnRYO1xuICBmaWx0ZXJzU3RhcnRXID0gZmlsdGVyc1dpZHRoLnZhbHVlO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkZpbHRlcnNNb3ZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uRmlsdGVyc1VwKTtcbn1cblxubGV0IHJlc2l6aW5nU3FsID0gZmFsc2U7XG5sZXQgc3FsU3RhcnRZID0gMDtcbmxldCBzcWxTdGFydEVkaXRvciA9IDA7XG5sZXQgc3FsU3RhcnRSZXN1bHQgPSAwO1xuXG5mdW5jdGlvbiBvblNxbE1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgaWYgKCFyZXNpemluZ1NxbCkgcmV0dXJuO1xuICBjb25zdCBkZWx0YSA9IGV2ZW50LmNsaWVudFkgLSBzcWxTdGFydFk7XG4gIGNvbnN0IHRvdGFsID0gc3FsU3RhcnRFZGl0b3IgKyBzcWxTdGFydFJlc3VsdDtcbiAgZWRpdG9ySGVpZ2h0LnZhbHVlID0gTWF0aC5taW4odG90YWwgLSAxNjAsIE1hdGgubWF4KDE0MCwgc3FsU3RhcnRFZGl0b3IgKyBkZWx0YSkpO1xuICByZXN1bHRIZWlnaHQudmFsdWUgPSBNYXRoLm1heCgxMjAsIHRvdGFsIC0gZWRpdG9ySGVpZ2h0LnZhbHVlKTtcbn1cblxuZnVuY3Rpb24gb25TcWxVcCgpIHtcbiAgcmVzaXppbmdTcWwgPSBmYWxzZTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25TcWxNb3ZlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uU3FsVXApO1xufVxuXG5mdW5jdGlvbiBzdGFydFNxbFJlc2l6ZShldmVudDogTW91c2VFdmVudCkge1xuICByZXNpemluZ1NxbCA9IHRydWU7XG4gIHNxbFN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gIHNxbFN0YXJ0RWRpdG9yID0gZWRpdG9ySGVpZ2h0LnZhbHVlO1xuICBzcWxTdGFydFJlc3VsdCA9IHJlc3VsdEhlaWdodC52YWx1ZTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25TcWxNb3ZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uU3FsVXApO1xufVxuXG4vLyDQodCy0L7QsdC+0LTQvdC+0LUg0LzQtdGB0YLQviDQtNC70Y8g0YDQtdC00LDQutGC0L7RgNCwINC80LXQttC00YMg0YHQv9C40YHQutC+0Lwg0Lgg0YTQuNC70YzRgtGA0LDQvNC4LlxuZnVuY3Rpb24gcmVsYXlvdXQoKTogdm9pZCB7XG4gIHZvaWQgbmV4dFRpY2soKCkgPT4ge1xuICAgIHRyeSB7IGVkaXRvclJlZi52YWx1ZT8uWydyZWxheW91dEVkaXRvciddPy4oKTsgfSBjYXRjaCB7IC8qINC90LXRgiDQvNC10YLQvtC00LAgKi8gfVxuICB9KTtcbn1cblxud2F0Y2goW2xpc3RXaWR0aCwgZmlsdGVyc1dpZHRoLCBsaXN0T3BlbiwgZmlsdGVyc09wZW5dLCByZWxheW91dCk7XG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIHZvaWQgbmV4dFRpY2soKCkgPT4gYXBwbHlMaXN0U2VhcmNoKCkpO1xuICB2b2lkIGxvYWQoKTtcbn0pO1xuXG5vbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkxpc3RNb3ZlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTGlzdFVwKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25GaWx0ZXJzTW92ZSk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkZpbHRlcnNVcCk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uU3FsTW92ZSk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblNxbFVwKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucXEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMjBweCk7XG4gIG1pbi1oZWlnaHQ6IDQ4MHB4O1xufVxuXG4ucXFfX3Rvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogNnB4IDAgOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5xcV9fc3BhY2VyIHsgZmxleDogMSAxIGF1dG87IH1cblxuLnFxX19zdGF0dXMgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiB2YXIoLS1keC1jb2xvci10ZXh0LCAjMzc0MTUxKTsgfVxuLnFxX19zdGF0dXMtLWVycm9yIHsgY29sb3I6IHZhcigtLWR4LWNvbG9yLWRhbmdlciwgI2I5MWMxYyk7IH1cblxuLnFxX19ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMSAxIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIGdhcDogMDtcbn1cblxuLyog4pSA4pSA4pSAINCh0L/QuNGB0L7QujogRGF0YUdyaWQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG5cbi5xcV9fbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY29sb3I6IHZhcigtLWR4LWNvbG9yLXRleHQsICMxZjI5MzcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1keC1jb21wb25lbnQtY29sb3ItYmcsICNmZmYpO1xufVxuXG4ucXFfX3NlYXJjaCB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGZsZXg6IDAgMCBhdXRvO1xufVxuXG4ucXFfX2dyaWQtd3JhcCB7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBtaW4taGVpZ2h0OiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5xcV9fbGlzdC1mb290IHtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC43O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjZTVlN2ViKTtcbiAgZmxleDogMCAwIGF1dG87XG59XG5cbi5xcV9fc3BsaXR0ZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA2cHg7XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBjdXJzb3I6IGNvbC1yZXNpemU7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTtcbn1cblxuLnFxX19zcGxpdHRlcjo6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiAxcHg7XG4gIHdpZHRoOiA0cHg7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBjb250ZW50OiBcIlwiO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ib3JkZXItY29sb3IsIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4zNSkpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbi5xcV9fc3BsaXR0ZXI6aG92ZXIsXG4ucXFfX3NwbGl0dGVyOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1ib3JkZXItY29sb3IpLCB2YXIoLS1iYXNlLXRleHQtY29sb3IpIDI1JSk7XG59XG5cbi8qIOKUgOKUgOKUgCDQptC10L3RgtGAOiBTUUwgKyDRgNC10LfRg9C70YzRgtCw0YIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG5cbi5xcV9fcGFuZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxIDEgYXV0bztcbiAgbWluLXdpZHRoOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci10ZXh0LCAjMWYyOTM3KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tZHgtY29tcG9uZW50LWNvbG9yLWJnLCAjZmZmKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjZTVlN2ViKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucXFfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogNnB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2U1ZTdlYik7XG4gIGZsZXg6IDAgMCBhdXRvO1xufVxuXG4ucXFfX2hlYWQtdGl0bGUge1xuICBmb250LXdlaWdodDogNjAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnFxX19oZWFkLXN1YiB7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG9wYWNpdHk6IDAuNjU7XG59XG5cbi5xcV9fc2Nyb2xsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiAxMnB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBmbGV4OiAxIDEgYXV0bztcbiAgbWluLWhlaWdodDogMDtcbn1cblxuLnFxX19zY3JvbGw6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgd2lkdGg6IDhweDsgfVxuLnFxX19zY3JvbGw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cbi5xcV9fc2Nyb2xsOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC40NSk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbn1cbi5xcV9fc2Nyb2xsOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC43NSk7IH1cblxuLnFxX19wcm9wcy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICBnYXA6IDEwcHggMTJweDtcbn1cblxuLnFxX19maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5xcV9fZmllbGQtbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1keC1jb2xvci10ZXh0LCAjNGI1NTYzKTtcbn1cblxuLnFxX19jaGlwcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiA2cHg7XG59XG5cbi5xcV9fY2hpcCB7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xuICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBDb25zb2xhcywgbW9ub3NwYWNlO1xuICBmb250LXNpemU6IDExcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2NiZDVlMSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucXFfX2NoaXA6aG92ZXIge1xuICBib3JkZXItY29sb3I6IHZhcigtLWR4LWNvbG9yLXByaW1hcnksICMzMzdhYjcpO1xuICBjb2xvcjogdmFyKC0tZHgtY29sb3ItcHJpbWFyeSwgIzMzN2FiNyk7XG59XG5cbi5xcV9fbW9uYWNvIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZHgtY29sb3ItYm9yZGVyLCAjZTVlN2ViKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucXFfX2hyZXNpemVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDZweDtcbiAgZmxleDogMCAwIGF1dG87XG4gIGN1cnNvcjogcm93LXJlc2l6ZTtcbn1cblxuLnFxX19ocmVzaXplcjo6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnB4O1xuICBsZWZ0OiA1MCU7XG4gIHdpZHRoOiA0OHB4O1xuICBoZWlnaHQ6IDJweDtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuICBjb250ZW50OiBcIlwiO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ib3JkZXItY29sb3IsIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC40NSkpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG59XG5cbi5xcV9faHJlc2l6ZXI6aG92ZXI6OmFmdGVyLFxuLnFxX19ocmVzaXplcjphY3RpdmU6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZHgtY29sb3ItcHJpbWFyeSwgIzMzN2FiNyk7XG59XG5cbi8qINCg0LXQt9GD0LvRjNGC0LDRgjog0LzQvdC+0LbQtdGB0YLQstC+INC/0L7Qu9C10Lkg4oCUINCz0L7RgNC40LfQvtC90YLQsNC70YzQvdCw0Y8g0L/RgNC+0LrRgNGD0YLQutCwLCDRgdGC0YDQvtC60LAg0YTQuNC70YzRgtGA0LBcbiAgINC4INC/0L7QuNGB0Log0LIg0LrQsNC20LTQvtC5INC60L7Qu9C+0L3QutC1INCy0LrQu9GO0YfQsNGO0YLRgdGPINC+0L/RhtC40Y/QvNC4IERhdGFHcmlkLiAqL1xuLnFxX19yZXN1bHQge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xuICBwYWRkaW5nOiA0cHg7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBtaW4taGVpZ2h0OiAwO1xufVxuXG4ucXFfX3Jlc3VsdC1oaW50IHtcbiAgcGFkZGluZzogMnB4IDhweDtcbiAgZmxleDogMCAwIGF1dG87XG59XG5cbi8qIOKUgOKUgOKUgCDQn9GA0LDQstCw0Y8g0LrQvtC70L7QvdC60LAg0YTQuNC70YzRgtGA0L7QsiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cblxuLnFxX19maWx0ZXJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMCAwIGF1dG87XG4gIGhlaWdodDogMTAwJTtcbiAgbWluLWhlaWdodDogMDtcbiAgY29sb3I6IHZhcigtLWR4LWNvbG9yLXRleHQsICMxZjI5MzcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1keC1jb21wb25lbnQtY29sb3ItYmcsICNmZmYpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5xcV9fZmlsdGVycy1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNlNWU3ZWIpO1xuICBmbGV4OiAwIDAgYXV0bztcbn1cblxuLyog0JfQvdCw0YfQtdC90LjRjyDRhNC40LvRjNGC0YDQvtCyINGB0LrRgNC+0LvQu9GP0YLRgdGPINCy0L3Rg9GC0YDQuCDRgdCy0L7QtdC5INC60L7Qu9C+0L3QutC4IOKAlCDQtNC+INC/0L7RgdC70LXQtNC90LXQs9C+INGE0LjQu9GM0YLRgNCwLiAqL1xuLnFxX19maWx0ZXJzLWJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBtaW4taGVpZ2h0OiAwO1xufVxuXG4ucXFfX2ZpbHRlcnMtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIgeyB3aWR0aDogOHB4OyB9XG4ucXFfX2ZpbHRlcnMtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxuLnFxX19maWx0ZXJzLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjQ1KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xufVxuLnFxX19maWx0ZXJzLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjc1KTsgfVxuXG4ucXFfX2ZpbHRlcnMtdGFnIHsgd2lkdGg6IDEwMCU7IH1cblxuLnFxX192YWx1ZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNnB4O1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCB2YXIoLS1keC1jb2xvci1ib3JkZXIsICNjYmQ1ZTEpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5xcV9fdmFsdWUtbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgZ2FwOiA4cHg7XG59XG5cbi5xcV9fdmFsdWUta2V5IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBDb25zb2xhcywgbW9ub3NwYWNlO1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi5xcV9faGludCB7IGZvbnQtc2l6ZTogMTFweDsgb3BhY2l0eTogMC43OyB9XG5cbi5xcV9fcGxhY2Vob2xkZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG9wYWNpdHk6IDAuNjtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLWR4LWNvbG9yLWJvcmRlciwgI2NiZDVlMSk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6IHZhcigtLWR4LWNvbG9yLXRleHQsICMxZjI5MzcpO1xufVxuPC9zdHlsZT5cbiJdfQ==