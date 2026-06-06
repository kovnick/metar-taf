# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js npm package for fetching METAR and TAF aviation weather reports from NOAA's weather service (`tgftp.nws.noaa.gov`). It uses the native `https` module with no runtime dependencies — all `devDependencies` are for testing/linting/building only.

## Commands

```bash
# Compile TypeScript to dist/
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run cover

# Lint
npm run lint

# Run a single test file
npx vitest run tests/metarFetcher.test.ts

# Run integration tests (requires network)
npm run test:integration
```

## Architecture

Three modules in `src/`:

- **`src/fetcher.ts`** — Internal. Exports a single `sendRequest(requestOptions)` function that wraps Node's `https.get` in a Promise. The only place that does network I/O. Rejects on non-2xx HTTP status and on socket timeout (10 s, set by callers).
- **`src/metarFetcher.ts`** — Exports `getMetar(station)` and `getDecodedMetar(station)`. Builds the NOAA METAR request options and delegates to `sendRequest`.
- **`src/tafFetcher.ts`** — Exports `getTaf(station)`. Builds the NOAA TAF request options and delegates to `sendRequest`.

`src/index.ts` re-exports the three public functions (`getMetar`, `getDecodedMetar`, `getTaf`). `sendRequest` is intentionally not re-exported — it is an implementation detail. The compiled output in `dist/` is what gets published to npm (`main: dist/index.js`, `types: dist/index.d.ts`).

## Testing Patterns

Tests use **Vitest** with its built-in mocking.

`tests/fetcher.test.ts` — unit tests for `sendRequest`; mock `https.get` directly via `vi.spyOn` to test success, status-code rejection, and network errors.

`tests/metarFetcher.test.ts` / `tests/tafFetcher.test.ts` — mock the entire `fetcher` module via `vi.mock` to isolate URL-building logic:
```ts
vi.mock('../src/fetcher', () => ({ sendRequest: vi.fn() }));
```

`tests/fetcher.integration.test.ts` — makes real HTTPS calls to NOAA via the public functions (10 s timeout). Run via `npm run test:integration`; excluded from the default `npm test` run.

## ESLint

Config is in `eslint.config.js` (ESLint 9 flat config, CommonJS). Uses `@typescript-eslint` recommended rules.
