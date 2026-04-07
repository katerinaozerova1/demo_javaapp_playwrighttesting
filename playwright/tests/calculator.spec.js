/**
 * Uses SeaLights Playwright plugin `test` fixture so CI can reproduce
 * slnodejs / TIA behavior against a non-JavaScript SUT (Java Spring Boot).
 * `expect` stays from @playwright/test.
 */
const { test } = require('sealights-playwright-plugin');
const { expect } = require('@playwright/test');

test.describe('Calculator UI', () => {
  test('adds two numbers', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('input-a').fill('7');
    await page.getByTestId('select-op').selectOption('+');
    await page.getByTestId('input-b').fill('5');
    await page.getByTestId('btn-calculate').click();
    await expect(page.getByTestId('result')).toHaveText('12');
  });

  test('divides with warning case NaN on divide by zero', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('input-a').fill('1');
    await page.getByTestId('select-op').selectOption('/');
    await page.getByTestId('input-b').fill('0');
    await page.getByTestId('btn-calculate').click();
    await expect(page.getByTestId('result')).toHaveText('NaN');
  });
});
