# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js npm package for fetching METAR and TAF aviation weather reports from NOAA's weather service (`tgftp.nws.noaa.gov`). It uses the native `https` module with no runtime dependencies — all `devDependencies` are for testing/linting only.

## Commands

```bash
# Run tests
npm test

# Run tests with code coverage (Istanbul)
npm run cover

# Lint (eslint is in devDependencies; no lint script defined — run directly)
./node_modules/.bin/eslint lib/ index.js

# Run a single test file
./node_modules/.bin/mocha ./tests/metarFetcher.tests.js
```

## Architecture

Three-class inheritance hierarchy:

- **`lib/fetcher.js`** — Base class. Wraps Node's `https.get` in a Promise via `sendRequest(requestOptions)`. This is the only place that does network I/O.
- **`lib/metarFetcher.js`** — Extends `Fetcher`. Exposes `getData(station)` (raw text) and `getDecodedData(station)` (structured object). Builds request options for the METAR endpoint.
- **`lib/tafFetcher.js`** — Extends `Fetcher`. Exposes `getData(station)` for the TAF endpoint.

`index.js` re-exports `MetarFetcher` and `TafFetcher` as named exports.

## Testing Patterns

Tests use **Mocha** + **Chai** (assert style) + **Sinon** for stubbing.

Unit tests stub `sendRequest` on the fetcher instance to avoid real HTTP calls:
```js
sinon.stub(fetcher, 'sendRequest').resolves(mockData);
```

`fetcher.tests.js` is the exception — it makes real HTTPS calls to NOAA and is effectively an integration test.

## ESLint

Rules are defined in `.eslintrc`. Key settings: `"env": { "es6": true, "node": true, "mocha": true }`. ES6 features (arrow functions, `const`/`let`, template literals, classes, Promises) are all expected style.
