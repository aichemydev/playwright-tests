const { test, expect } = require('@playwright/test');

test('calendar', async ({ page }) => {

  await page.goto('https://calendar.testgold.dev');
  await page.getByText("Preliminary Meeting").click();

  await page.getByAltText("Plus").click();
  await page.getByAltText("Plus").click();
  await page.getByLabel("March 31, 2023").click();
  await page.getByRole("combobox").click();
  await page.getByText("Pacific Daylight Time").last().click();
  await page.getByText("8:00pm").click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.getByPlaceholder("Enter name").type("Ima Tester");
  await page.getByPlaceholder("Enter email").type("hello@wring.dev");
  await page.getByPlaceholder("Your notes").type("This is yet another test.");
  await page.getByText("Schedule").click();

});
