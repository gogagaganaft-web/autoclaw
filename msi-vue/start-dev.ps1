<#
.SYNOPSIS
    Запуск GOREPORT в dev-режиме: Vite на http://localhost:5050/gr/.

.DESCRIPTION
    Поднимает dev-сервер фронтенда, предварительно проверяя контейнеры mssql и
    gr-backend. Не создаёт вторую копию Vite: если порт уже занят, просто
    сообщает адрес. Умеет останавливать и перезапускать сервер.

.PARAMETER AppDir
    Каталог приложения msi-vue. По умолчанию C:\AUTOCLAW\msi-vue.

.PARAMETER Port
    Порт dev-сервера. По умолчанию 5050 (strictPort в vite.config.js).

.EXAMPLE
    .\start-dev.ps1
    Обычный запуск: поднять контейнеры, запустить Vite, открыть браузер.

.EXAMPLE
    .\start-dev.ps1 -Restart
    Перезапуск: остановить текущий сервер и поднять заново.

.EXAMPLE
    .\start-dev.ps1 -Stop
    Остановить dev-сервер и освободить порт.

.EXAMPLE
    .\start-dev.ps1 -NoBrowser
    Запуск без открытия браузера (для скриптов и CI).
#>
[CmdletBinding()]
param(
    [string]$AppDir = 'C:\AUTOCLAW\msi-vue',
    [int]$Port = 5050,
    [switch]$Restart,
    [switch]$Stop,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

# pnpm и vite пишут в UTF-8. Без этого перенаправленный вывод превращается
# в кракозябры при чтении лога из консоли Windows.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$logPath = Join-Path $AppDir 'dev-5050.log'
$errPath = Join-Path $AppDir 'dev-5050.err.log'
$url = "http://localhost:$Port/gr/"

# ─── ВСПОМОГАТЕЛЬНЫЕ ─────────────────────────────────────────────────────────

function Get-Listener {
    param([int]$ListenPort)
    Get-NetTCPConnection -LocalPort $ListenPort -State Listen -ErrorAction SilentlyContinue |
        Select-Object -First 1
}

function Stop-DevServer {
    param([int]$ListenPort)

    $listener = Get-Listener -ListenPort $ListenPort
    if (-not $listener) {
        Write-Host "порт $ListenPort уже свободен"
        return
    }

    $procId = $listener.OwningProcess
    Write-Host "останавливаю процесс $procId на порту $ListenPort"
    # /T — вместе с дочерними node.exe, иначе порт остаётся занятым.
    & taskkill.exe /T /F /PID $procId 2>&1 | Out-Null

    for ($i = 0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 250
        if (-not (Get-Listener -ListenPort $ListenPort)) {
            Write-Host 'сервер остановлен'
            return
        }
    }
    throw "не удалось освободить порт $ListenPort"
}

function Ensure-Container {
    param([string]$Name)

    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Warning 'docker не найден — контейнеры не проверяю'
        return
    }

    $running = (& docker inspect -f '{{.State.Running}}' $Name 2>$null)
    if ($running -eq 'true') {
        Write-Host "контейнер ${Name}: работает"
        return
    }

    Write-Host "контейнер ${Name}: не запущен — стартую"
    & docker start $Name 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "не удалось запустить контейнер $Name"
    }
}

function Start-DevServer {
    param([string]$Dir, [string]$OutLog, [string]$ErrLog)

    $pnpm = (Get-Command pnpm.cmd -ErrorAction SilentlyContinue).Source
    if (-not $pnpm) {
        $pnpm = (Get-Command pnpm -ErrorAction SilentlyContinue).Source
    }
    if (-not $pnpm) {
        throw 'pnpm не найден в PATH'
    }

    # Vite уходит в отдельный процесс: скрипт не должен ждать его завершения.
    Start-Process -FilePath $pnpm `
        -ArgumentList @('dev') `
        -WorkingDirectory $Dir `
        -WindowStyle Hidden `
        -RedirectStandardOutput $OutLog `
        -RedirectStandardError $ErrLog | Out-Null
}

# ─── ОСНОВНОЙ СЦЕНАРИЙ ──────────────────────────────────────────────────────

if ($Stop) {
    Stop-DevServer -ListenPort $Port
    exit 0
}

if (-not (Test-Path (Join-Path $AppDir 'package.json'))) {
    throw "не найден package.json в $AppDir"
}

if ($Restart) {
    Stop-DevServer -ListenPort $Port
}

$listener = Get-Listener -ListenPort $Port

if ($listener) {
    Write-Host "dev-сервер уже запущен: $url"
} else {
    Write-Host 'проверяю базу и бэкенд'
    Ensure-Container 'mssql'
    Ensure-Container 'gr-backend'

    if (-not (Test-Path (Join-Path $AppDir 'node_modules'))) {
        Write-Host 'node_modules отсутствует — устанавливаю зависимости'
        Push-Location $AppDir
        try { & pnpm install } finally { Pop-Location }
    }

    Write-Host "запускаю vite на порту $Port"
    Start-DevServer -Dir $AppDir -OutLog $logPath -ErrLog $errPath

    $deadline = (Get-Date).AddSeconds(90)
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Milliseconds 500
        if (Get-Listener -ListenPort $Port) { break }
    }

    if (-not (Get-Listener -ListenPort $Port)) {
        if (Test-Path $logPath) {
            Write-Host '--- последние строки лога ---'
            Get-Content $logPath -Tail 25
        }
        if (Test-Path $errPath) {
            Write-Host '--- ошибки ---'
            Get-Content $errPath -Tail 25
        }
        throw "dev-сервер не поднялся за 90 секунд"
    }

    Write-Host 'сервер поднялся'
}

# ─── ПРОВЕРКА ОТВЕТА ────────────────────────────────────────────────────────

$status = 'нет ответа'
try {
    $response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 15
    $status = "$($response.StatusCode) OK"
} catch {
    $status = $_.Exception.Message
}

Write-Host ''
Write-Host '─────────────────────────────────────────'
Write-Host "  адрес:  $url"
Write-Host "  ответ:  $status"
Write-Host "  лог:    $logPath"
Write-Host '  стоп:   .\start-dev.ps1 -Stop'
Write-Host '  рестарт:.\start-dev.ps1 -Restart'
Write-Host '─────────────────────────────────────────'

if (-not $NoBrowser -and $status -like '*200*') {
    Start-Process $url
}
