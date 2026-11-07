export function utcDay(value) {
  if (typeof value !== 'string' || !/(?:Z|[+-]\d\d:\d\d)$/.test(value)) {
    throw new TypeError('Expected an ISO-8601 timestamp with explicit UTC offset');
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new TypeError('Invalid timestamp');
  return date.toISOString().slice(0,10);
}
