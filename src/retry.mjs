export async function retry(task, {attempts = 3, delayMs = 100, sleep = ms => new Promise(resolve => setTimeout(resolve,ms))} = {}) {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 20) {
    throw new RangeError('attempts must be an integer from 1 to 20');
  }
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try { return await task(attempt); }
    catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(delayMs * 2 ** (attempt - 1));
    }
  }
  throw lastError;
}
