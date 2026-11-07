import {test} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {isWithinDirectory} from '../src/paths.mjs';
test('base and descendants pass',()=>{ const base=path.resolve('public'); assert.equal(isWithinDirectory(base,base),true); assert.equal(isWithinDirectory(base,path.join(base,'images','x.png')),true);});
test('a sibling with the same prefix fails',()=>{const base=path.resolve('public'); assert.equal(isWithinDirectory(base,`${base}-backup`),false);});
test('parent traversal fails',()=>{const base=path.resolve('public'); assert.equal(isWithinDirectory(base,path.resolve(base,'..','private','token')),false);});
