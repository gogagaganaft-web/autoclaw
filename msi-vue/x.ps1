# fix-sortable-kanban.ps1
$ErrorActionPreference = "Stop"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

# 1. Перезаписываем sortable/index.js как заглушку
$path = "C:\projects\msi-vue\src\msi-vue\sortable\index.js"
$content = @"
import { defineComponent, h } from 'vue';

// DxSortable заменен на обычный div, так как MSI Sortable конфликтует с Vue DOM
export const DxSortable = defineComponent({
  name: 'DxSortable',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => h('div', { class: 'dx-sortable-stub' }, slots.default ? slots.default() : undefined);
  }
});

export const DxSortableTypes = {};

export default DxSortable;
"@
$content = $content.TrimStart([char]0xFEFF)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
Write-Host "OK: $path" -ForegroundColor Green

Remove-Item -Recurse -Force "C:\projects\msi-vue\node_modules\.vite" -ErrorAction SilentlyContinue
Write-Host "OK: vite cache cleared" -ForegroundColor Green