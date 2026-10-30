# Установка служб GOREPORT на Windows. Требует прав администратора.
[CmdletBinding()]
param([string]$TargetDir = 'C:\PROJECT\GOREPORT', [switch]$NoStart)

$ErrorActionPreference = 'Stop'
$serviceMap = [ordered]@{ '7501' = 'GOREPORT_7501'; '7502' = 'GOREPORT_7502'; '7503' = 'GOREPORT_7503'; '7504' = 'GOREPORT_7504'; '7505' = 'GOREPORT_7505' }
$src = Join-Path $PSScriptRoot 'dist\windows'

New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
foreach ($port in $serviceMap.Keys) {
    $from = Join-Path $src "server-$port.exe"
    if (-not (Test-Path $from)) { throw "нет файла $from — сначала запустите build-all.ps1" }
    Copy-Item $from (Join-Path $TargetDir "server-$port.exe") -Force
}

# Конфиг нужен рядом с exe: служба стартует из System32 и ищет .env по пути exe.
# Кладём только если его там ещё нет: существующий .env не перезаписываем.
$envSrc = Join-Path $PSScriptRoot '.env'
$envDst = Join-Path $TargetDir '.env'
if ((Test-Path $envSrc) -and -not (Test-Path $envDst)) {
    Copy-Item $envSrc $envDst -Force
    Write-Host "скопирован .env в $TargetDir"
}

Push-Location $TargetDir
try {
    foreach ($port in $serviceMap.Keys) {
        $name = $serviceMap[$port]
        & ".\server-$port.exe" -install
        if ($LASTEXITCODE -ne 0) { throw "служба $name не установлена" }
        if (-not $NoStart) { Start-Service $name; "служба $name запущена" }
    }
    'готово. Проверка: Get-Service GOREPORT_*'
}
finally { Pop-Location }