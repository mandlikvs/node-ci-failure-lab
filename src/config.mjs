export function parseConfig(env = process.env) {
  const raw = env.PORT ?? '3000';
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  const logLevel = env.LOG_LEVEL ?? 'info';
  if (!['debug','info','warn','error'].includes(logLevel)) {
    throw new Error('LOG_LEVEL must be debug, info, warn or error');
  }
  return Object.freeze({ port, logLevel });
}
