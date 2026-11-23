/* Optional local server: node serve.cjs. Production requires only the static files. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 4173);
const files = new Map([
  ['/', ['index.html','text/html; charset=utf-8']],
  ['/index.html', ['index.html','text/html; charset=utf-8']],
  ['/styles.css', ['styles.css','text/css; charset=utf-8']],
  ['/core.js', ['core.js','text/javascript; charset=utf-8']],
  ['/app.js', ['app.js','text/javascript; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg','image/svg+xml']]
]);
const server = http.createServer((req,res) => {
  const route = files.get(new URL(req.url,'http://localhost').pathname);
  if (!route || !['GET','HEAD'].includes(req.method)) {res.writeHead(404);res.end('Not found');return;}
  fs.readFile(path.join(__dirname,route[0]),(err,data)=>{
    if(err){res.writeHead(500);res.end('Could not read app file');return;}
    res.writeHead(200,{'Content-Type':route[1],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:data);
  });
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is already in use. Set PORT to another port and retry.`:error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`CraftNDetail is ready at http://127.0.0.1:${port} (Ctrl+C to stop)`));
