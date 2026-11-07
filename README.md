# Node CI Failure Lab — companion source

A dependency-free Node.js demonstration repository for seven test and CI troubleshooting labs. The examples use the built-in `node:test` runner and a small local HTTP server. No paid cloud account is required.

**Status:** code is reviewed locally; a first hosted GitHub Actions run is still required. This repository contains source code and exercises, not the book manuscript.

## Requirements

- Node.js 22 or newer
- npm
- Optional GitHub account to run the included Actions workflow

## Verify

```bash
npm ci --ignore-scripts
npm run preflight
npm run check
npm test
```

The currently maintained tests check configuration, integer-cent arithmetic, retry behavior, lexical paths, explicit timezone handling, HTTP liveness/readiness and a small JSON route.

## Run locally

```bash
npm start
```

Then open `http://127.0.0.1:3000/health`. The `/estimate` example is an unauthenticated teaching endpoint and is **not** a production-ready billing service. Do not deploy it publicly without independent threat modeling.

## Files

- `.github/workflows/ci.yml`: minimal-permission Node 24 test job
- `src/`: sample implementations
- `test/`: Node native automated tests
- `scripts/preflight.mjs`: environment and lockfile preflight

The `isWithinDirectory` example provides only lexical path containment; it does not defend against symlinks or filesystem races.

## License and rights

The final source-code license must be selected and signed off by the publisher before the repository is made public. No license is granted by this draft staging package. The KDP eBook is not included in this repository.
