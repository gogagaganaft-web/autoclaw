# Снятие служб GOREPORT на Windows.
[CmdletBinding()]
param([string]$TargetDir = 'C:\PROJECT\GOREPORT')

$ErrorActionPreference = 'Continue'
$serviceMap = [ordered]@{ '7501' = 'GOREPORT_7501'; '7502' = 'GOREPORT_7502'; '7503' = 'GOREPORT_7503'; '7504' = 'GOREPORT_7504'; '7505' = 'GOREPORT_7505' }

Push-Location $TargetDir
try {
    foreach ($port in $serviceMap.Keys) {
        $name = $serviceMap[$port]
        Stop-Service $name -Force -ErrorAction SilentlyContinue
        & ".\server-$port.exe" -remove
    }
}
finally { Pop-Location }