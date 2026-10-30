# Сборка всех пяти служб GOREPORT под Windows и Debian в dist\
[CmdletBinding()]
param([string]$OutDir = 'dist')
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$go = 'go'

$services = @(
    @{ Cmd = 'execute'; Port = '7501' },
    @{ Cmd = 'report';  Port = '7502' },
    @{ Cmd = 'preload'; Port = '7503' },
    @{ Cmd = 'multi';   Port = '7504' },
    @{ Cmd = 'store';   Port = '7505' }
)

$win = Join-Path $root (Join-Path $OutDir 'windows')
$lin = Join-Path $root (Join-Path $OutDir 'linux')
New-Item -ItemType Directory -Force -Path $win, $lin | Out-Null

Push-Location $root
try {
    foreach ($s in $services) {
        $exe = Join-Path $win "server-$($s.Port).exe"
        & $go build -trimpath -ldflags '-s -w' -o $exe "./cmd/$($s.Cmd)"
        if ($LASTEXITCODE -ne 0) { throw "windows: $($s.Cmd) не собрался" }

        $env:GOOS = 'linux'; $env:GOARCH = 'amd64'; $env:CGO_ENABLED = '0'
        $bin = Join-Path $lin "server-$($s.Port)"
        & $go build -trimpath -ldflags '-s -w' -o $bin "./cmd/$($s.Cmd)"
        if ($LASTEXITCODE -ne 0) { throw "linux: $($s.Cmd) не собрался" }
        Remove-Item Env:GOOS, Env:GOARCH, Env:CGO_ENABLED

        '{0,-9} :{1}  windows {2,6:N1} МБ   linux {3,6:N1} МБ' -f `
            $s.Cmd, $s.Port, ((Get-Item $exe).Length / 1MB), ((Get-Item $bin).Length / 1MB)
    }
    "готово: $win ; $lin"
}
finally { Pop-Location }