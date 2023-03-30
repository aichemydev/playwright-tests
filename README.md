# playwright-tests

This contains a Playwright test for use with the Wring live event platform. The Playwright configuration file includes an option to slow down test execution when Playwright runs a scenario, so the Wring live event platform can keep up. Once the live events have been captured, they can be used to generate hosted test runs on Wring, which can take advantage of locator suggestions, healing of broken locators, and expansion of test scenarios.

Install:

```
npm install -D
```

Then:

```
npx playwright test
```
