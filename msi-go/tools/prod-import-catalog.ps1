<#
.SYNOPSIS
    Развёртывание БД report и импорт боевого каталога (env.js + rpt.js) одним запуском.

.EXAMPLE
    .\tools\prod-import-catalog.ps1 -Server 10.51.7.127

.EXAMPLE
    # с очисткой seed-строк (ОРН_5, ОРН_9, SEC_ОРН)
    .\tools\prod-import-catalog.ps1 -Server 10.51.7.127 -CleanupSeed

.EXAMPLE
    # пересобрать SQL из боевых env.js / rpt.js (нужен node) и залить
    .\tools\prod-import-catalog.ps1 -Server 10.51.7.127 `
        -EnvJs C:\xampp\htdocs\report\data\env.js `
        -RptJs C:\xampp\htdocs\report\data\rpt.js

.EXAMPLE
    # только проверить, что уже развёрнуто
    .\tools\prod-import-catalog.ps1 -Server 10.51.7.127 -VerifyOnly
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$Server,
    [int]$Port = 1433,
    [string]$User = 'sa',
    [string]$Password,
    [string]$Database = 'report',

    [string]$Sqlcmd = 'sqlcmd',
    [string]$SchemaFile,
    [string]$CatalogFile,
    [string]$EnvJs,
    [string]$RptJs,

    [switch]$CleanupSeed,
    [switch]$SkipSchema,
    [switch]$VerifyOnly,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
if (-not $SchemaFile) { $SchemaFile = Join-Path $root 'db\prod\01_create_report_db.sql' }
if (-not $CatalogFile) { $CatalogFile = Join-Path $root 'db\prod\04_import_catalog.sql' }

function Write-Step([string]$text) { Write-Host "==> $text" -ForegroundColor Cyan }
function Write-Ok([string]$text) { Write-Host "    $text" -ForegroundColor Green }
function Write-Warn([string]$text) { Write-Host "    $text" -ForegroundColor Yellow }

function Get-PlainPassword {
    if ($Password) { return $Password }
    $secure = Read-Host -AsSecureString "Пароль для $User@$Server"
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

$serverName = if ($Server -match ',\d+$') { $Server } else { "$Server,$Port" }

# ─── план без подключения ───────────────────────────────────────────────────
if ($WhatIf) {
    Write-Step "Сервер $serverName, база $Database, пользователь $User"
    Write-Warn 'WhatIf: подключение не выполняется, изменения не применяются.'
    Write-Warn "схема:     $SchemaFile   (применится, если базы нет)"
    Write-Warn "каталог:   $CatalogFile"
    Write-Warn "очистка seed: $(if ($CleanupSeed) { 'да' } else { 'нет' })"
    Write-Warn "env.js:    $(if ($EnvJs) { $EnvJs } else { 'не найден (используется готовый SQL)' })"
    Write-Warn "rpt.js:    $(if ($RptJs) { $RptJs } else { 'не найден (используется готовый SQL)' })"
    return
}

$exeCmd = Get-Command $Sqlcmd -ErrorAction SilentlyContinue
if (-not $exeCmd) {
    throw "sqlcmd не найден ($Sqlcmd). Установите mssql-tools или укажите -Sqlcmd <путь>. Либо выполните $CatalogFile в SSMS."
}
$exe = $exeCmd.Source

$plain = Get-PlainPassword

function Invoke-Sql {
    param([string]$Query, [string]$InputFile)
    $args = @('-S', $serverName, '-U', $User, '-P', $plain, '-C', '-b', '-f', '65001')
    if ($InputFile) { $args += @('-i', $InputFile) } else { $args += @('-Q', $Query, '-h', '-1', '-W') }
    $out = & $exe @args 2>&1
    if ($LASTEXITCODE -ne 0) {
        $out | ForEach-Object { Write-Host "    $_" }
        throw "sqlcmd завершился с кодом $LASTEXITCODE"
    }
    return $out
}

# ─── связь ──────────────────────────────────────────────────────────────────
Write-Step "Подключение к $serverName"
Invoke-Sql -Query 'SELECT @@VERSION' | Out-Null
Write-Ok 'связь есть'

# ─── схема ──────────────────────────────────────────────────────────────────
if (-not $VerifyOnly -and -not $SkipSchema) {
    $dbId = (Invoke-Sql -Query "SELECT DB_ID('$Database')" | Where-Object { $_ -match '^\d+$' } | Select-Object -First 1)
    if (-not $dbId -or [int]$dbId -eq 0) {
        Write-Step "Базы $Database нет — создаю схему"
        if (-not (Test-Path $SchemaFile)) { throw "не найден файл схемы: $SchemaFile" }
        Invoke-Sql -InputFile $SchemaFile | Out-Null
        Write-Ok 'схема применена'
    } else {
        Write-Ok "база $Database уже есть"
    }
}

# ─── пересборка SQL из боевых JS (необязательно) ────────────────────────────
# Где искать боевые env.js / rpt.js, если пути не переданы явно:
#   1) <репозиторий>\db\src\env.js      (копия рядом с SQL)
#   2) C:\xampp\htdocs\report\data\env.js (боевой путь фронта)
$jsCandidates = @(
    (Join-Path $root 'db\src'),
    'C:\xampp\htdocs\report\data'
)
if (-not $EnvJs) {
    foreach ($dir in $jsCandidates) {
        $candidate = Join-Path $dir 'env.js'
        if (Test-Path $candidate) { $EnvJs = $candidate; break }
    }
}
if (-not $RptJs) {
    foreach ($dir in $jsCandidates) {
        $candidate = Join-Path $dir 'rpt.js'
        if (Test-Path $candidate) { $RptJs = $candidate; break }
    }
}

if (-not $VerifyOnly -and $EnvJs -and $RptJs) {
    $node = Get-Command node -ErrorAction SilentlyContinue
    if (-not $node) { throw 'для -EnvJs/-RptJs нужен node в PATH' }
    $converter = Join-Path $root 'tools\convert_prod_catalog.js'
    if (-not (Test-Path $converter)) { throw "не найден конвертер: $converter" }
    Write-Step 'Пересборка SQL из env.js и rpt.js'
    & $node.Source $converter $EnvJs $RptJs $CatalogFile
    if ($LASTEXITCODE -ne 0) { throw 'конвертер завершился с ошибкой' }
    Write-Ok 'SQL пересобран'
}

# ─── импорт каталога ────────────────────────────────────────────────────────
if (-not $VerifyOnly) {
    if (-not (Test-Path $CatalogFile)) { throw "не найден файл каталога: $CatalogFile" }

    $toRun = $CatalogFile
    if ($CleanupSeed) {
        $text = Get-Content $CatalogFile -Raw -Encoding UTF8
        if ($text -notmatch 'DECLARE @cleanup_seed BIT = 0;') {
            Write-Warn 'переключатель @cleanup_seed не найден — очистка пропущена'
        } else {
            $toRun = Join-Path $env:TEMP ("goreport_catalog_{0}.sql" -f (Get-Random))
            $text.Replace('DECLARE @cleanup_seed BIT = 0;', 'DECLARE @cleanup_seed BIT = 1;') |
                Set-Content -Path $toRun -Encoding UTF8
            Write-Ok 'очистка seed-строк включена'
        }
    }

    Write-Step 'Импорт каталога'
    Invoke-Sql -InputFile $toRun | Out-Null
    Write-Ok 'каталог применён'
    if ($toRun -ne $CatalogFile) { Remove-Item $toRun -ErrorAction SilentlyContinue }
}

# ─── проверка ───────────────────────────────────────────────────────────────
Write-Step 'Состояние базы'
$summary = Invoke-Sql -Query @"
USE [$Database]; SET NOCOUNT ON;
SELECT CONVERT(varchar, COUNT(*)) + '|' +
       CONVERT(varchar, SUM(CASE WHEN is_section = 1 THEN 1 ELSE 0 END)) + '|' +
       CONVERT(varchar, SUM(CASE WHEN is_section = 0 THEN 1 ELSE 0 END)) + '|' +
       CONVERT(varchar, SUM(CASE WHEN is_section = 0 AND LEN(query_text) = 0 THEN 1 ELSE 0 END))
FROM dbo.reports WHERE is_deleted = 0;
"@
$line = $summary | Where-Object { $_ -match '^\d+\|\d+\|\d+\|\d+$' } | Select-Object -First 1
if ($line) {
    $p = $line.Split('|')
    Write-Host ("    узлов: {0}  разделов: {1}  отчётов: {2}  без SQL: {3}" -f $p[0], $p[1], $p[2], $p[3])
}

$toolbar = Invoke-Sql -Query "USE [$Database]; SET NOCOUNT ON; SELECT LEN(config) FROM dbo.ui_config WHERE setting_key = N'toolbar';"
$tb = $toolbar | Where-Object { $_ -match '^\d+$' } | Select-Object -First 1
if ($tb) { Write-Host "    панель фильтров: $tb символов" } else { Write-Warn 'панель фильтров НЕ найдена' }

Write-Host ''
Write-Host 'Готово.' -ForegroundColor Green
