# Node CI Failure Lab — companion source

**Author:** Vishal Mandlik  
**Book:** *Node CI Failure Lab: 7 Hands-On Fixes*  
**Project:** Self-contained Node.js debugging and CI exercises

This is the optional runnable companion project for the Kindle workbook. The full book manuscript is **not** stored in this repository.

## Requirements

- Node.js 22 or newer
- npm (included with Node)
- A terminal; GitHub Actions runs automatically on pushes to `main`

## Run the lab

```bash
git clone https://github.com/mandlikvs/node-ci-failure-lab.git
cd node-ci-failure-lab
npm ci --ignore-scripts
npm run preflight
npm run check
npm test
```

Run the local demo server with `npm start`, then open [http://127.0.0.1:3000/health](http://127.0.0.1:3000/health). Stop the server using Ctrl+C.

The examples use `node:test`, native HTTP, deterministic retry tests, integer-cent arithmetic, explicit timezone parsing and safe configuration checks. No paid cloud resources or external runtime dependencies are needed.

## CI status

The hosted workflow on GitHub Actions completed successfully on commit `1e752727522eb146e9da7bbeed140b9f4423f97b` on 7 November 2026. Further commits trigger new runs; always inspect the newest run before relying on a green status.

[See GitHub Actions runs](https://github.com/mandlikvs/node-ci-failure-lab/actions)

## Important limitations

- The `POST /estimate` endpoint is for demonstrating JSON validation and deterministic tests, **not** for handling real financial transactions or billing.
- `isWithinDirectory` checks lexical path containment, not symlinks or filesystem race conditions.
- `GET /ready` is an injected teaching example, not a full production readiness implementation.
- Do not expose the educational local server publicly without adding a production security model.

## License

The sample companion code is distributed under the [MIT License](LICENSE). This license applies to source code in this repository; it does not grant redistribution rights to the separately sold eBook.
