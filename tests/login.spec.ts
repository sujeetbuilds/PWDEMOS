import {test, expect} from '@playwright/test';
import fs from 'fs';
import path from 'path';
test('Extract products and save PDF', async({page})=>{
    //*******************************************************
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('visual_user');
    // await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    // await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL(/inventory/);
    // ********************************************************
    // await page.locator('#shopping_cart_container > a').click();
    // const backpack=page.locator('.inventory_item')
    //     .filter({hasText:'Sauce Labs Backpack'});
    // backpack.getByRole('button',{name:'Add to cart'}).click();
    const products=page.locator('.inventory_item');
    const count=await products.count();
    // console.log(count);

    // ********************************************************
    const mainFolder = path.join(process.cwd(), 'product');
    fs.mkdirSync(mainFolder, { recursive: true });

    // ********************************************************
    const csvRows: string[] = [];
    csvRows.push('Title,Description,Price,ProductURL');

    // ********************************************************
    for(let i=0; i<count; i++){
        const product=products.nth(i);
        // console.log(product);
        const title=await product.locator('.inventory_item_name ').innerText();
        const description= await product.locator('.inventory_item_desc').innerText();
        const price=await product.locator('.inventory_item_price').innerText();
        // console.log(`Index: ${i}, Title: ${title}, Description: ${description}, Price: ${price}`);
        await product.locator('.inventory_item_name ').click();
        const productURL=page.url();

    // ********************************************************
        const csvTitle = title.replace(/"/g, '""');
        const csvDescription = description.replace(/"/g, '""');
        csvRows.push(
            `"${csvTitle}","${csvDescription}","${price}","${productURL}"`
        );

    // ********************************************************
        const safeTitle = title
            .replace(/[<>:"/\\|?*]/g, '_')
            .trim();

        const productFolder = path.join(mainFolder,safeTitle);
        fs.mkdirSync(productFolder, { recursive: true });

    // ********************************************************
        const pdfPath = path.join(
            productFolder,
            `${safeTitle}.pdf`
        );

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true
        });

    // ********************************************************
        await page.goBack();
    }

    // ********************************************************
    const csvPath = path.join(
        mainFolder,
        'products.csv'
    );

    fs.writeFileSync(
        csvPath,
        csvRows.join('\n'),
        'utf8'
    );
});