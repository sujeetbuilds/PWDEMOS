# PWDEMOS

A small collection of browser automation examples built with [Playwright](https://playwright.dev/) and TypeScript. The tests cover Playwright's documentation site, Google, and Sauce Demo. The Sauce Demo examples exercise login, and one test exports the inventory to a CSV file and saves a PDF for each product.

## Requirements

- Node.js (use an active LTS release)
- npm
- A Playwright browser. The project is configured to run Chromium.

## Setup

Install the project dependencies and the Chromium browser:

```sh
npm ci
npx playwright install chromium
```

## Run the tests

Run the full suite:

```sh
npx playwright test
```

Run one test file, for example:

```sh
npx playwright test tests/login.spec.ts
```

Open the HTML report after a run:

```sh
npx playwright show-report
```

The configured reporter writes the report to `playwright-report/`. Test results are written to `test-results/`; both directories are ignored by Git.

## Product export example

`tests/login.spec.ts` signs in to Sauce Demo, visits each inventory product, and writes a CSV plus one PDF per product. Its output location is currently hard-coded to:

```text
D:\PlayWright\Output\product
```

This path is specific to the current Windows setup. Change `mainFolder` in `tests/login.spec.ts` if you want the export saved elsewhere. The PDFs and CSV are generated at runtime and are not stored in this repository by default.

## Project layout

```text
tests/          Playwright test examples
product/        Sample product CSV and PDF files
playwright.config.ts
                Playwright test configuration
```

The committed files under `product/` are sample artifacts; the export test writes its output to the separate location above.

## Continuous integration

The GitHub Actions workflow in `.github/workflows/playwright.yml` installs Node.js dependencies and Playwright browsers, runs the test suite on pushes and pull requests targeting `main` or `master`, and uploads the HTML report as an artifact.
