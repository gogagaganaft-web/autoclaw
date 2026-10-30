<template>
  <div class="yandex-map-wrapper">
    <div
      ref="host"
      class="yandex-map"
    />
    <div
      v-if="error"
      class="yandex-map-error"
    >
      {{ error }}
    </div>
    <div
      v-else-if="!loaded"
      class="yandex-map-loading"
    >
      Загрузка карты…
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

export interface MapPoint {
  lat: number;
  lon: number;
  title?: string;
  /** Адрес — используется, если координаты не заданы (геокодинг Яндекса). */
  address?: string;
}

const props = withDefaults(defineProps<{
  points: MapPoint[];
  zoom?: number;
  center?: [number, number];
  /** Подгонять карту под точки. Выключается, когда восстанавливаем сохранённый вид. */
  autoFit?: boolean;
  /** API-ключ Яндекс.Карт; если не задан — берётся из VITE_YANDEX_MAPS_API_KEY. */
  apiKey?: string;
}>(), {
  zoom: 5,
  autoFit: true,
});

const emit = defineEmits<{
  'update:zoom': [number];
  'update:center': [[number, number]];
}>();

const SCROLL_ZOOM_DELAY = 400;

const host = ref<HTMLElement | null>(null);
const error = ref('');
const loaded = ref(false);

let map: any = null;
let ymaps: any = null;

// Ключ Яндекса по умолчанию — из оригинального приложения MSI
// (frontend/index.html). Переопределяется через VITE_YANDEX_MAPS_API_KEY
// или проп apiKey.
const DEFAULT_API_KEY = 'b0301318-06c8-4fc5-a2f8-79a917802405';

function resolveApiKey(): string {
  if (props.apiKey) return props.apiKey;
  const fromEnv = import.meta.env.VITE_YANDEX_MAPS_API_KEY as string | undefined;
  return fromEnv || DEFAULT_API_KEY;
}

function loadScript(apiKey: string): Promise<any> {
  const existingWindow = window as any;
  if (existingWindow.ymaps) {
    return Promise.resolve(existingWindow.ymaps);
  }
  return new Promise((resolve, reject) => {
    const scriptId = 'yandex-maps-api';
    const build = () => {
      const key = apiKey ? `&apikey=${encodeURIComponent(apiKey)}` : '';
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${key}`;
      script.onload = () => (existingWindow.ymaps
        ? resolve(existingWindow.ymaps)
        : reject(new Error('API Яндекс.Карт загрузился, но объект ymaps недоступен')));
      script.onerror = () => reject(new Error('Не удалось загрузить API Яндекс.Карт (проверьте сеть и ключ)'));
      document.head.appendChild(script);
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(existingWindow.ymaps));
      existing.addEventListener('error', () => reject(new Error('Не удалось загрузить API Яндекс.Карт')));
    } else {
      build();
    }
  });
}

function addPlacemark(coords: number[], point: MapPoint) {
  const placemark = new ymaps.Placemark(
    coords,
    point.title ? { balloonContent: point.title } : {},
    { preset: 'islands#blueIcon' },
  );
  map.geoObjects.add(placemark);
}

function fitBounds() {
  try {
    const bounds = map.geoObjects.getBounds();
    if (bounds) map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 40 });
  } catch {
    /* setBounds может не сработать для одной точки — не критично */
  }
}

function drawPoints() {
  if (!map || !ymaps) return;
  map.geoObjects.removeAll();

  const points = props.points || [];
  let placed = 0;
  let geocoded = 0;

  for (const point of points) {
    if (Number.isFinite(point.lat) && Number.isFinite(point.lon)) {
      addPlacemark([point.lat, point.lon], point);
      placed += 1;
    } else if (point.address) {
      geocoded += 1;
      ymaps.geocode(point.address, { results: 1 }).then((res: any) => {
        const geoObject = res.geoObjects?.get(0);
        if (geoObject) addPlacemark(geoObject.geometry.getCoordinates(), point);
      }).catch(() => { /* адрес не найден — пропускаем */ });
    }
  }

  if (placed > 0) {
    if (props.autoFit) fitBounds();
  } else if (geocoded > 0 && props.autoFit) {
    // Подгоняем границы после асинхронного геокодинга.
    setTimeout(fitBounds, 800);
  }
}

async function init() {
  try {
    ymaps = await loadScript(resolveApiKey());
    await new Promise<void>((resolve) => ymaps.ready(() => resolve()));
    if (!host.value) return;

    map = new ymaps.Map(host.value, {
      center: props.center || [55.751244, 37.618423],
      zoom: props.zoom,
      controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl'],
    });
    map.behaviors.disable('scrollZoom');
    map.events.add('wheel', () => {
      // Включаем зум колесом только при наведении, чтобы не «перехватывать» прокрутку страницы.
      map.behaviors.enable('scrollZoom');
      setTimeout(() => map.behaviors.disable('scrollZoom'), SCROLL_ZOOM_DELAY);
    });
    // Пользователь подвигал/масштабировал карту — отдаём положение наружу,
    // чтобы страница могла сохранить его в представлении.
    map.events.add('actionend', () => {
      if (!map) return;
      const zoom = map.getZoom();
      const center = map.getCenter();
      if (Number.isFinite(zoom)) emit('update:zoom', zoom);
      if (Array.isArray(center) && center.length >= 2) {
        emit('update:center', [Number(center[0]), Number(center[1])]);
      }
    });

    loaded.value = true;
    drawPoints();
  } catch (err) {
    error.value = (err as Error).message;
  }
}

watch(() => props.points, drawPoints, { deep: true });
watch(() => props.zoom, (zoom) => map?.setZoom(zoom));
watch(() => props.center, (center) => center && map?.setCenter(center));

onMounted(init);

onBeforeUnmount(() => {
  try {
    map?.destroy();
  } catch {
    /* ignore */
  }
  map = null;
});
</script>

<style scoped lang="scss">
.yandex-map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
}

.yandex-map {
  width: 100%;
  height: 100%;
  min-height: 420px;
}

.yandex-map-error,
.yandex-map-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  color: var(--base-text-color-alpha, #666);
  background: var(--base-bg, #fff);
  opacity: 0.85;
}
</style>
