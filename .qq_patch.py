# -*- coding: utf-8 -*-
import io

p = r'C:/AUTOCLAW/msi-vue/src/pages/queries-admin.vue'
s = io.open(p, encoding='utf-8').read()

# ── 1. Вынести блок фильтров из общего скролла в правую колонку ──
old = '''          <!-- Подключение фильтров и значения -->
          <div class="qq__section-title">Фильтры запроса</div>
          <div class="qq__filters-row">
            <dx-tag-box
              class="qq__filters-tag"
              :value="active.filters"
              :items="filterOptions"
              value-expr="field"
              display-expr="caption"
              :search-enabled="true"
              :show-selection-controls="true"
              placeholder="Выберите фильтры — из них строится форма и плейсхолдеры"
              @value-changed="set('filters', $event.value || [])"
            />
            <dx-button
              v-if="selectedDefs.length"
              text="Значения по умолчанию"
              icon="refresh"
              styling-mode="outlined"
              hint="Подставить динамические умолчания (прошлый месяц…)"
              @click="applyDefaults()"
            />
          </div>

          <template v-if="selectedDefs.length">
            <div class="qq__section-title">Значения фильтров</div>
            <div
              v-for="def in selectedDefs"
              :key="def.field"
              class="qq__value"
            >
              <div class="qq__value-label">
                {{ def.label || def.field }}
                <code class="qq__value-key">{{ def.field }}</code>
              </div>
              <filter-preview
                :key="`qv:${active.key}:${def.field}`"
                :def="def.config"
                :initial-value="values[def.field]"
                @update:value="setValue(def.field, $event)"
              />
            </div>
            <div class="qq__hint qq__hint--end">
              Конец панели: фильтры бывают высокими — панель прокручивается целиком.
            </div>
          </template>
        </div>
      </section>'''
new = '''        </div>
      </section>

      <!-- Справа: выбор фильтров и их заполнение -->
      <template v-if="active.key || isNew">
        <div
          class="qq__splitter"
          title="Потяните, чтобы изменить ширину блока фильтров"
          @mousedown="startFiltersResize"
        />
        <aside
          class="qq__filters theme-dependent"
          :style="{ width: `${filtersWidth}px` }"
        >
          <header class="qq__filters-head">
            <span>Фильтры запроса</span>
            <dx-button
              v-if="selectedDefs.length"
              icon="refresh"
              styling-mode="text"
              hint="Подставить динамические умолчанию (прошлый месяц…)"
              @click="applyDefaults()"
            />
          </header>

          <!-- Свой скролл: выбор фильтров + значения, фильтры бывают высокими -->
          <div class="qq__filters-body">
            <dx-tag-box
              class="qq__filters-tag"
              :value="active.filters"
              :items="filterOptions"
              value-expr="field"
              display-expr="caption"
              :search-enabled="true"
              :show-selection-controls="true"
              placeholder="Выберите фильтры — из них строится форма и плейсхолдеры"
              @value-changed="set('filters', $event.value || [])"
            />
            <span class="qq__hint">Чекбоксы подключают фильтр; ниже появятся его значения.</span>

            <template v-if="selectedDefs.length">
              <div class="qq__section-title">Значения фильтров</div>
              <div
                v-for="def in selectedDefs"
                :key="def.field"
                class="qq__value"
              >
                <div class="qq__value-label">
                  {{ def.label || def.field }}
                  <code class="qq__value-key">{{ def.field }}</code>
                </div>
                <filter-preview
                  :key="`qv:${active.key}:${def.field}`"
                  :def="def.config"
                  :initial-value="values[def.field]"
                  @update:value="setValue(def.field, $event)"
                />
              </div>
            </template>
            <div
              v-else
              class="qq__hint"
            >
              Фильтры не подключены — выберите хотя бы один.
            </div>
          </div>
        </aside>
      </template>'''
assert s.count(old) == 1, 'block'
s = s.replace(old, new)

# ── 2. Скрипт: ширина блока фильтров ──
old = '''const listWidth = ref(300);
const panelWidth = ref(520);'''
new = '''const listWidth = ref(300);
const filtersWidth = ref(400);
const panelWidth = ref(520);'''
assert s.count(old) == 1, 'width'
s = s.replace(old, new)

# ── 3. Ресайз блока фильтров + relayout ──
old = '''// Панель подстраивается под место рядом со списком.
watch(listWidth, () => {
  panelWidth.value = Math.max(420, Math.min(900, window.innerWidth - listWidth.value - 120));
});

onMounted(() => {
  panelWidth.value = Math.max(420, Math.min(900, window.innerWidth - listWidth.value - 120));
  void load();
});'''
new = '''let resizingFilters = false;
let filtersStartX = 0;
let filtersStartW = 0;

function onFiltersMove(event: MouseEvent) {
  if (!resizingFilters) return;
  const delta = filtersStartX - event.clientX;
  filtersWidth.value = Math.min(700, Math.max(280, filtersStartW + delta));
}

function onFiltersUp() {
  resizingFilters = false;
  document.removeEventListener('mousemove', onFiltersMove);
  document.removeEventListener('mouseup', onFiltersUp);
}

function startFiltersResize(event: MouseEvent) {
  resizingFilters = true;
  filtersStartX = event.clientX;
  filtersStartW = filtersWidth.value;
  document.addEventListener('mousemove', onFiltersMove);
  document.addEventListener('mouseup', onFiltersUp);
}

// Панель редактора занимает место между деревом и блоком фильтров.
function relayout() {
  const free = window.innerWidth - listWidth.value - filtersWidth.value - 120;
  panelWidth.value = Math.max(420, Math.min(900, free));
}

watch([listWidth, filtersWidth], relayout);

onMounted(() => {
  relayout();
  void load();
});'''
assert s.count(old) == 1, 'relayout'
s = s.replace(old, new)

# ── 4. Чистка слушателей ──
old = '''  document.removeEventListener('mousemove', onSqlMove);
  document.removeEventListener('mouseup', onSqlUp);
});'''
new = '''  document.removeEventListener('mousemove', onSqlMove);
  document.removeEventListener('mouseup', onSqlUp);
  document.removeEventListener('mousemove', onFiltersMove);
  document.removeEventListener('mouseup', onFiltersUp);
});'''
assert s.count(old) == 1, 'cleanup'
s = s.replace(old, new)

# ── 5. Стили ──
old = '''.qq__filters-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

.qq__filters-tag {
  flex: 1 1 320px;
  min-width: 0;
}'''
new = '''.qq__filters {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 100%;
  min-height: 0;
  color: var(--dx-color-text, #1f2937);
  background: var(--dx-component-color-bg, #fff);
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
}

.qq__filters-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

/* Значения фильтров скроллятся внутри своей колонки — до последнего фильтра. */
.qq__filters-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  overflow-y: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.qq__filters-body::-webkit-scrollbar { width: 8px; }
.qq__filters-body::-webkit-scrollbar-track { background: transparent; }
.qq__filters-body::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.45);
  border-radius: 4px;
  background-clip: padding-box;
}
.qq__filters-body::-webkit-scrollbar-thumb:hover { background-color: rgba(128, 128, 128, 0.75); }

.qq__filters-tag {
  width: 100%;
}'''
assert s.count(old) == 1, 'styles'
s = s.replace(old, new)

io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('блок фильтров — правая колонка готова')
