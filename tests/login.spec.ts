import {test, expect} from '@playwright/test';
test('Login SauceDemo Portal', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('visual_user');
    // await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    // await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL(/inventory/);
});