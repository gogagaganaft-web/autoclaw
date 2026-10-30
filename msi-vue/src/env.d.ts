/// <reference types="vite/client" />

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'file-saver-es' {
  export function saveAs(blob: Blob, fileName: string): void;
}

interface Window {
  /** Globalize is loaded by the classic scripts in index.html (js/globalize.min.js). */
  Globalize?: {
    locale: (locale?: string) => string;
  };
}