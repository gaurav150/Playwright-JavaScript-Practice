const {test,expect} = require('@playwright/test');

test('Browser Context Playwright Test', async({browser}) => {

    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    await expect(page).toHaveTitle("ProtoCommerce");
    await expect(cardTitles.first()).toHaveText("iphone X");
    await expect(cardTitles).toHaveText(["iphone X","Samsung Note 8","Nokia Edge","Blackberry"]);

    // await page.waitForTimeout(3000);
    // console.log(await page.title());


});

test('Page Playwright Test', async({page}) => {

    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});
