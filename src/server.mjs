import {pathToFileURL} from 'node:url';
import http from 'node:http';
import {parseConfig} from './config.mjs';
import {estimateMargin} from './money.mjs';

function respond(res, status, data) {
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
  res.end(JSON.stringify(data));
}
export function createApp({isReady = () => true} = {}) {
  return http.createServer(async (req,res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (req.method === 'GET' && pathname === '/health') return respond(res,200,{status:'alive'});
    if (req.method === 'GET' && pathname === '/ready') { const ready = isReady(); return respond(res,ready?200:503,{status:ready?'ready':'not-ready'}); }
    if (req.method === 'POST' && pathname === '/estimate') {
      if (!String(req.headers['content-type'] ?? '').includes('application/json')) return respond(res,415,{error:'Content-Type must be application/json'});
      const chunks=[];
      let size=0;
      try {
        for await (const chunk of req) {
          size+=chunk.length;
          if(size>8192) return respond(res,413,{error:'Body too large'});
          chunks.push(chunk);
        }
        const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
        return respond(res,200,estimateMargin(data));
      } catch(error) {
        return respond(res,400,{error:'Invalid JSON or calculation input'});
      }
    }
    return respond(res,404,{error:'Not found'});
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const {port} = parseConfig();
  const server = createApp();
  server.listen(port,'127.0.0.1',()=> console.log(`Lab server listening on 127.0.0.1:${port}`));
  for (const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>process.exit(0)));
}
