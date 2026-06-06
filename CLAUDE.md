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
```

## Architecture

Three-class inheritance hierarchy in `src/`:

- **`src/fetcher.ts`** — Base class. Wraps Node's `https.get` in a Promise via `sendRequest(requestOptions: https.RequestOptions): Promise<string>`. The only place that does network I/O.
- **`src/metarFetcher.ts`** — Extends `Fetcher`. Exposes `getData(station)` (raw text) and `getDecodedData(station)` (decoded text). Builds request options for the METAR endpoint.
- **`src/tafFetcher.ts`** — Extends `Fetcher`. Exposes `getData(station)` for the TAF endpoint.

`src/index.ts` re-exports all three classes. The compiled output in `dist/` is what gets published to npm (`main: dist/index.js`, `types: dist/index.d.ts`).

## Testing Patterns

Tests use **Vitest** with its built-in mocking (`vi.spyOn`).

Unit tests spy on `sendRequest` to avoid real HTTP calls:
```ts
vi.spyOn(fetcher, 'sendRequest').mockResolvedValue('Test response');
```

`tests/fetcher.test.ts` is the exception — it makes real HTTPS calls to NOAA and has a 10 s timeout.

## ESLint

Config is in `eslint.config.js` (ESLint 9 flat config, CommonJS). Uses `@typescript-eslint` recommended rules.
