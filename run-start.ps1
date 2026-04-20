$nodePath = "C:\Users\41070\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$port = 3002

$listeners = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

foreach ($listener in $listeners) {
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" -ErrorAction SilentlyContinue

  if (
    $process -and
    $process.Name -eq "node.exe" -and
    $process.CommandLine -like "*next*start*" -and
    $process.CommandLine -like "*2026-04-20-you-are-helping-me-build-a*"
  ) {
    Write-Host "Stopping stale local preview server on port $port (PID $($listener.OwningProcess))..."
    Stop-Process -Id $listener.OwningProcess -Force
    Start-Sleep -Seconds 1
  }
}

Write-Host "Starting local preview on http://127.0.0.1:$port ..."
& $nodePath "node_modules\next\dist\bin\next" start --hostname 127.0.0.1 --port $port
