import { test, expect } from '@playwright/test';

test.describe('Categories Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(2000); // Ожидание 2 секунды для запуска сервера
    await page.goto('http://localhost:3000/categories');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display categories on page load', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/categories');

    // Ожидаем загрузку категорий
    await page.waitForSelector('.category-item', { timeout: 10000 });

    const categoryCard = page.locator('.category-item');
    await expect(categoryCard).toHaveCount(8); // Ожидаем 8 категорий

    const categoryTitle = categoryCard.locator('p');
    await expect(categoryTitle.first()).toHaveText('Молочные продукты'); // Проверка первой категории
  });
});