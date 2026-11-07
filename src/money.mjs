function nonNegativeCents(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${label} must be a non-negative safe integer (cents)`);
  }
  return value;
}
export function estimateMargin({priceCents, materialsCents, laborCents}) {
  const price = nonNegativeCents(priceCents,'priceCents');
  const materials = nonNegativeCents(materialsCents,'materialsCents');
  const labor = nonNegativeCents(laborCents,'laborCents');
  const totalCostCents = materials + labor;
  if (!Number.isSafeInteger(totalCostCents)) throw new RangeError('total exceeds safe integer');
  const profitCents = price - totalCostCents;
  const marginPercent = price === 0 ? null : Math.round((profitCents / price)*10000)/100;
  return {totalCostCents,profitCents,marginPercent};
}
