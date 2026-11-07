import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseConfig} from '../src/config.mjs';
test('default port is 3000',()=>assert.equal(parseConfig({}).port,3000));
test('valid configured port',()=>assert.equal(parseConfig({PORT:'8001',LOG_LEVEL:'warn'}).logLevel,'warn'));
for(const invalid of ['0','65536','abc','3.3','-1']) test(`rejects PORT=${invalid}`,()=>assert.throws(()=>parseConfig({PORT:invalid}),/PORT/));
test('rejects unknown log level',()=>assert.throws(()=>parseConfig({LOG_LEVEL:'verbose'}),/LOG_LEVEL/));
