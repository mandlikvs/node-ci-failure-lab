import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from '../src/server.mjs';
async function withServer(create,cb){const server=create();server.listen(0,'127.0.0.1');await once(server,'listening');try{return await cb(`http://127.0.0.1:${server.address().port}`)}finally{await new Promise((resolve,reject)=>server.close(err=>err?reject(err):resolve()))}}
test('health route returns JSON',()=>withServer(()=>createApp(),async base=>{const r=await fetch(base+'/health');assert.equal(r.status,200);assert.deepEqual(await r.json(),{status:'alive'})}));
test('not-ready returns 503',()=>withServer(()=>createApp({isReady:()=>false}),async base=>{const r=await fetch(base+'/ready');assert.equal(r.status,503)}));
test('estimate uses safe integer cents',()=>withServer(()=>createApp(),async base=>{const r=await fetch(base+'/estimate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({priceCents:2500,materialsCents:700,laborCents:800})});assert.equal(r.status,200);assert.equal((await r.json()).profitCents,1000)}));
test('missing media type rejected',()=>withServer(()=>createApp(),async base=>{const r=await fetch(base+'/estimate',{method:'POST',body:'{}'});assert.equal(r.status,415)}));
test('bad JSON rejected with 400',()=>withServer(()=>createApp(),async base=>{const r=await fetch(base+'/estimate',{method:'POST',headers:{'content-type':'application/json'},body:'not-json'});assert.equal(r.status,400)}));
