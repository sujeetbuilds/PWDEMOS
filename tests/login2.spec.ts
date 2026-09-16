import { test, expect } from '@playwright/test'; 
test('test', async ({ page }) => { 
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('visual_user');
  await page.locator('[data-test="password"]').fill('secret_sauce'); 
  await page.getByRole('button',{name:'Login'}).click();
//   await expect(page.getByRole('heading',{name:'Products'})).toBeVisible(); 
  await expect(page.locator('[data-test="title"]')).toBeVisible(); 
});