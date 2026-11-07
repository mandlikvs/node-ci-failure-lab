import {test} from 'node:test';
import assert from 'node:assert/strict';
import {utcDay} from '../src/time.mjs';
test('UTC normalization handles timezone offset',()=>assert.equal(utcDay('2026-11-07T01:30:00+05:30'),'2026-11-06'));
test('explicit Z works',()=>assert.equal(utcDay('2026-11-07T01:30:00Z'),'2026-11-07'));
test('ambiguous local timestamp rejected',()=>assert.throws(()=>utcDay('2026-11-07T01:30:00'),/offset/));
