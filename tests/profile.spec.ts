import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    // Очистка localStorage перед каждым тестом
    await page.waitForTimeout(2000); // Ожидание 2 секунды для запуска сервера
    await page.goto('http://localhost:3000/profile');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should format expiry date with auto-slash', async ({ page }) => {
    await page.fill('input[name="cardNumber"]', '1234 5678 9012 3456');
    await page.fill('input[name="expiryDate"]', '1234');
    await page.fill('input[name="cvv"]', '123');
    await page.fill('input[name="deliveryAddress"]', 'г. Москва, ул. Примерная, д. 1');

    const expiryInput = page.locator('input[name="expiryDate"]');
    await expect(expiryInput).toHaveValue('12/34');
  });

  test('should save profile data to localStorage', async ({ page }) => {
    await page.fill('input[name="cardNumber"]', '1234 5678 9012 3456');
    await page.fill('input[name="expiryDate"]', '12/34');
    await page.fill('input[name="cvv"]', '123');
    await page.fill('input[name="deliveryAddress"]', 'г. Москва, ул. Примерная, д. 1');
    await page.click('button.save-button');

    const localStorageData = await page.evaluate(() => ({
      cardDetails: localStorage.getItem('cardDetails'),
      deliveryAddress: localStorage.getItem('deliveryAddress'),
    }));

    // Проверяем, что данные существуют
    expect(localStorageData.cardDetails).not.toBeNull();
    expect(localStorageData.deliveryAddress).not.toBeNull();

    // Безопасный парсинг с утверждением типа
    if (localStorageData.cardDetails && localStorageData.deliveryAddress) {
      expect(JSON.parse(localStorageData.cardDetails)).toEqual({
        cardNumber: '1234 5678 9012 3456',
        expiryDate: '12/34',
        cvv: '123',
      });
      expect(JSON.parse(localStorageData.deliveryAddress)).toBe('г. Москва, ул. Примерная, д. 1');
    } else {
      throw new Error('localStorage data is missing');
    }
  });

  test('should display error message when data is missing', async ({ page }) => {
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Пожалуйста, внесите данные карты и адрес доставки');

    // Заполняем данные и сохраняем
    await page.fill('input[name="cardNumber"]', '1234 5678 9012 3456');
    await page.fill('input[name="expiryDate"]', '12/34');
    await page.fill('input[name="cvv"]', '123');
    await page.fill('input[name="deliveryAddress"]', 'г. Москва, ул. Примерная, д. 1');
    await page.click('button.save-button');

    await expect(errorMessage).not.toBeVisible();
  });

  test('should display purchase history and repeat order', async ({ page }) => {
    // Имитация покупки в localStorage
    await page.evaluate(() => {
      localStorage.setItem('purchaseHistory', JSON.stringify([{
        items: [{ product: { id: 1, title: 'Молоко', price: 100, calories: 50 }, quantity: 2 }],
        totalPrice: 200,
        date: '2025-05-18 08:30:00',
      }]));
    });
    await page.reload();

    const purchaseItem = page.locator('.purchase-item');
    await expect(purchaseItem).toBeVisible();
    await expect(purchaseItem.locator('p').first()).toHaveText('Дата: 2025-05-18 08:30:00');
    await expect(purchaseItem.locator('p').nth(1)).toHaveText('Сумма: 200 ₽');

    const productCard = purchaseItem.locator('.product-card');
    await expect(productCard).toBeVisible();
    await expect(productCard.locator('h3')).toHaveText('Молоко');

    // Проверка кнопки "Повторить заказ"
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Товары добавлены в корзину!');
      await dialog.accept();
    });
    await page.click('button.repeat-order-button');

    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '{}'));
    expect(cart).toEqual({ '1': 2 });
  });
});