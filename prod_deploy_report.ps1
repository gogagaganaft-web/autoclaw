# =============================================================================
#  Развёртывание БД report на проде: схема + первичное наполнение.
#  Идемпотентно: повторный запуск обновляет записи, не ломая ссылки.
#
#  Пример:
#    .\tools\prod_deploy_report.ps1 -Server "10.0.0.15,1433" -User sa -Database report
#    .\tools\prod_deploy_report.ps1 -Server ... -VerifyOnly
#    .\tools\prod_deploy_report.ps1 -Server ... -SeedOnly -WhatIf
# =============================================================================
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$Server,
    [string]$Port = '1433',
    [string]$User = 'sa',
    [string]$Password,
    [string]$Database = 'report',
    [string]$Sqlcmd = 'sqlcmd',
    [switch]$SeedOnly,
    [switch]$VerifyOnly,
    [switch]$WhatIf,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$schemaFile = Join-Path $repo 'db\prod\01_create_report_db.sql'
$seedFile = Join-Path $repo 'db\prod\02_seed_reports.sql'

function Write-Step([string]$text) { Write-Host "==> $text" -ForegroundColor Cyan }
function Write-Ok([string]$text) { Write-Host "    $text" -ForegroundColor Green }
function Write-Warn([string]$text) { Write-Host "    $text" -ForegroundColor Yellow }

function Resolve-Sqlcmd {
    $cmd = Get-Command $Sqlcmd -ErrorAction SilentlyContinue
    if (-not $cmd) {
        throw "sqlcmd не найден ($Sqlcmd). Установите mssql-tools или укажите -Sqlcmd <путь>."
    }
    return $cmd.Source
}

function Get-PlainPassword {
    if ($Password) { return $Password }
    $secure = Read-Host -AsSecureString "Пароль для $User@$Server"
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

function Invoke-Sql {
    param(
        [string]$Exe,
        [string]$ServerName,
        [string]$UserName,
        [string]$PlainPassword,
        [string]$Query,
        [string]$InputFile,
        [switch]$Quiet
    )

    $cmdArgs = @('-S', $ServerName, '-U', $UserName, '-P', $PlainPassword, '-C', '-b', '-f', '65001')
    if ($InputFile) { $cmdArgs += @('-i', $InputFile) } else { $cmdArgs += @('-Q', $Query, '-h', '-1', '-W') }

    $output = & $Exe @cmdArgs 2>&1
    $code = $LASTEXITCODE
    if (-not $Quiet -and $output) { $output | ForEach-Object { Write-Host "    $_" } }
    if ($code -ne 0) {
        throw "sqlcmd завершился с кодом $code. Вывод выше."
    }
    return $output
}

# ─── Подготовка ─────────────────────────────────────────────────────────────
$exe = Resolve-Sqlcmd
$serverName = if ($Server -match ',\d+$') { $Server } else { "$Server,$Port" }

Write-Step "Сервер $serverName, база $Database, пользователь $User"

foreach ($f in @($schemaFile, $seedFile)) {
    if (-not (Test-Path $f)) { throw "не найден файл: $f" }
}

if ($DryRun) {
    Write-Warn 'DryRun: файлы проверены, подключение к БД не выполняется.'
    Write-Warn "схема:   $schemaFile ($([math]::Round((Get-Item $schemaFile).Length/1KB,1)) КБ)"
    Write-Warn "наполнение: $seedFile ($([math]::Round((Get-Item $seedFile).Length/1KB,1)) КБ)"
    return
}

if ($WhatIf) {
    Write-Warn 'WhatIf: изменения не применяются.'
    if (-not $SeedOnly) { Write-Warn "будет применено: $schemaFile" }
    if (-not $VerifyOnly) { Write-Warn "будет применено: $seedFile" }
    return
}

$plain = Get-PlainPassword

# ─── Проверка связи ─────────────────────────────────────────────────────────
Write-Step 'Проверка подключения'
Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain `
    -Query "SELECT @@VERSION" -Quiet | Out-Null
Write-Ok 'подключение есть'

if ($VerifyOnly) {
    Write-Step 'Состояние базы'
} else {
    if (-not $SeedOnly) {
        Write-Step 'Создание БД и схемы'
        Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain `
            -InputFile $schemaFile | Out-Null
        Write-Ok 'схема применена'
    }

    Write-Step 'Первичное наполнение'
    Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain `
        -InputFile $seedFile | Out-Null
    Write-Ok 'данные применены'
}

# ─── Сводка ─────────────────────────────────────────────────────────────────
Write-Step "Сводка по $Database"

$tables = Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain `
    -Query "USE [$Database]; SET NOCOUNT ON; SELECT COUNT(*) FROM sys.tables;" -Quiet
Write-Host ("    таблиц: {0}" -f ($tables | Where-Object { $_ -match '^\d+$' } | Select-Object -First 1))

$reportsQuery = "USE [$Database]; SET NOCOUNT ON; " +
    "SELECT CONVERT(varchar,id) + ' | ' + report_key + ' | ' + title + ' | section=' + " +
    "CONVERT(varchar,is_section) + ' | query=' + CONVERT(varchar,DATALENGTH(query_text)/2) FROM dbo.reports ORDER BY id;"
$rows = Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain -Query $reportsQuery -Quiet
$rows | Where-Object { $_ -match '\|' } | ForEach-Object { Write-Host "    $_" }

$cfg = Invoke-Sql -Exe $exe -ServerName $serverName -UserName $User -PlainPassword $plain `
    -Query "USE [$Database]; SET NOCOUNT ON; SELECT COUNT(*) FROM dbo.ui_config WHERE setting_key = N'toolbar';" -Quiet
Write-Host ("    панель фильтров: {0}" -f $(if (($cfg -join '') -match '1') { 'есть' } else { 'НЕТ' }))

Write-Host ''
Write-Host 'Готово.' -ForegroundColor Green
