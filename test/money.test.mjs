import {test} from 'node:test';
import assert from 'node:assert/strict';
import {estimateMargin} from '../src/money.mjs';
test('works with integer cents, not float currency',()=>assert.deepEqual(estimateMargin({priceCents:10000,materialsCents:2000,laborCents:3500}),{totalCostCents:5500,profitCents:4500,marginPercent:45}));
test('loss is negative profit',()=>assert.equal(estimateMargin({priceCents:100,materialsCents:200,laborCents:0}).profitCents,-100));
test('zero sale does not divide by zero',()=>assert.equal(estimateMargin({priceCents:0,materialsCents:0,laborCents:0}).marginPercent,null));
test('rejects decimal cents',()=>assert.throws(()=>estimateMargin({priceCents:10.5,materialsCents:0,laborCents:0}),/integer/));
