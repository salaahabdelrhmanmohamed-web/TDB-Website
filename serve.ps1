$root = "c:\Users\hp\OneDrive\Desktop\TDB"
$port = 8090
$listener = New-Object System.Net.HttpListener
# Bind only to localhost — works without admin
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port"
Write-Host "NOTE: This only works on THIS PC. For iPhone access, share the folder through IIS or use a tunnel."

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  $urlPath = $req.Url.LocalPath
  if ($urlPath -eq '/') { $urlPath = '/index.html' }
  $filePath = Join-Path $root $urlPath.TrimStart('/')
  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { 'application/octet-stream' }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $res.ContentType = $mime
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - $urlPath")
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.OutputStream.Close()
}
