$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$classesDir = Join-Path $PSScriptRoot 'target\classes'
$m2Repo = Join-Path $env:USERPROFILE '.m2\repository'
$argFile = Join-Path $PSScriptRoot 'java-args.txt'
$stdoutLog = Join-Path $PSScriptRoot 'backend.out.log'
$stderrLog = Join-Path $PSScriptRoot 'backend.err.log'

$classpathEntries = @($classesDir) + (
    Get-ChildItem $m2Repo -Recurse -Filter *.jar |
    Where-Object {
        $_.Name -notlike 'slf4j-simple-*.jar' -and
        $_.Name -notlike 'slf4j-api-1.*.jar'
    } |
    ForEach-Object { $_.FullName }
)
$classpath = $classpathEntries -join ';'

@(
    '-cp'
    $classpath
    'com.resumebuilder.ResumeBuilderApplication'
) | Set-Content -Path $argFile -Encoding ASCII

Start-Process -FilePath 'java' `
    -ArgumentList "@$argFile" `
    -WorkingDirectory $PSScriptRoot `
    -RedirectStandardOutput $stdoutLog `
    -RedirectStandardError $stderrLog `
    -PassThru
