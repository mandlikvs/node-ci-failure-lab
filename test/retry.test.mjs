import {test} from 'node:test';
import assert from 'node:assert/strict';
import {retry} from '../src/retry.mjs';
test('succeeds after transient failure without wall-clock waits',async()=>{
 const delays=[];
 const result=await retry(async n=>{if(n<3)throw Error('transient');return 'ok'}, {attempts:3,delayMs:10,sleep:async ms=>delays.push(ms)});
 assert.equal(result,'ok');assert.deepEqual(delays,[10,20]);
});
test('throws final error after limit',async()=>assert.rejects(retry(async()=>{throw Error('down')},{attempts:2,sleep:async()=>{}}),/down/));
test('invalid attempt limit rejected',async()=>assert.rejects(retry(async()=>42,{attempts:0}),/attempts/));
