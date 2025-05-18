import { test, expect } from '@playwright/test';

test.describe('Basket Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(2000); 
    await page.goto('http://localhost:3000/basket');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should redirect to category when cart is empty', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Корзина пуста!');
      await dialog.accept();
    });
    await page.click('button.purchase-button');
    await expect(page).toHaveURL('http://localhost:3000/categories');
  });

  test('should redirect to profile when profile data is missing', async ({ page }) => {
   
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify({ '1': 2 }));
    });
    await page.reload();

    await page.click('button.purchase-button');
    await expect(page).toHaveURL('http://localhost:3000/profile');
    await expect(page.locator('text=Пожалуйста, внесите данные карты и адрес доставки')).toBeVisible();
  });

  test('should complete purchase with profile data', async ({ page }) => {
    
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify({ '1': 2 }));
      localStorage.setItem('cardDetails', JSON.stringify({
        cardNumber: '1234 5678 9012 3456',
        expiryDate: '12/34',
        cvv: '123',
      }));
      localStorage.setItem('deliveryAddress', '"г. Москва, ул. Примерная, д. 1"');
    });
    await page.reload();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Покупка завершена! История сохранена в профиле.');
      await dialog.accept();
    });
    await page.click('button.purchase-button');

    const localStorageData = await page.evaluate(() => ({
      cart: localStorage.getItem('cart'),
      purchaseHistory: localStorage.getItem('purchaseHistory'),
    }));


    expect(localStorageData.cart).not.toBeNull();
    expect(localStorageData.purchaseHistory).not.toBeNull();

    if (localStorageData.cart && localStorageData.purchaseHistory) {
      expect(JSON.parse(localStorageData.cart)).toEqual({});
      expect(JSON.parse(localStorageData.purchaseHistory)).toHaveLength(1);
    } else {
      throw new Error('localStorage data is missing');
    }
  });
});