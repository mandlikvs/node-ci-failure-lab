import fs from 'node:fs';
const major = Number(process.versions.node.split('.')[0]);
const errors=[];
if (major < 22) errors.push('Use Node.js 22 or newer.');
if (!fs.existsSync('package-lock.json')) errors.push('Missing package-lock.json. Commit it for reproducible npm ci.');
if (fs.existsSync('.env')) errors.push('Local .env exists: keep it out of git; confirm .gitignore is active.');
if (errors.length) { console.error('Preflight findings:\n- ' + errors.join('\n- ')); process.exitCode=1; }
else console.log(`Preflight OK (Node ${process.version}, lockfile present, no local .env)`);
