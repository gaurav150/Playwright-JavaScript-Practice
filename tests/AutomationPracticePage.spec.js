const { test, expect } = require('@playwright/test');
const testData = require('../utils/green-kart-testData.json');

test("Verify Web Table Fixed Header Amount", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const rows = page.locator(".tableFixHead tbody tr");
    await expect(rows.first()).toBeVisible();

    const rowCount = await rows.count();
    let total = 0;

    for (let i = 0; i < rowCount; i++) {
        const amount = await rows.nth(i).locator("td").last().textContent();
        const value = Number(amount.trim());
        total += value;
    }

    const totalAmount = page.locator(".totalAmount");
    await expect(totalAmount).toContainText('296');

});

test("Verify Selenium Practice Page Price ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/");
    const order = testData.Order;
    let grandTotal = 0;

    const products = page.locator(".products .product");
    await products.first().waitFor();
    const productCount = await products.count();

    for (let i = 0; i < productCount; i++) {
        const productLocator = products.nth(i);
        const text = (await productLocator.locator("h4").textContent()).trim();
        const price = Number(
            (await productLocator.locator("p").textContent()).replace(/[^\d.]/g, "")
        );


        const orderItem = order.find(item => text.startsWith(item.orderProduct));
        if (orderItem) {
            const increment = productLocator.locator(".stepper-input .increment");
            // Default quantity is 1, so click count - 1 times.
            for (let b = 1; b < orderItem.count; b++) {
                await increment.click();
            }
            await productLocator.getByRole("button", { name: "ADD TO CART" }).click();
            grandTotal += price * orderItem.count;
        }
    }

    const numberOfItems = Number(await page.locator(".cart-info strong").first().textContent());
    const TotalPrice = Number(await page.locator(".cart-info strong").last().textContent());

    expect(grandTotal).toEqual(TotalPrice);
    expect(order.length).toEqual(numberOfItems);

});

test("Verify Selenium Practice Page Price Top Deals", async ({ page, context }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/");
    const products = page.locator(".products .product");
    await products.first().waitFor();
    const productName = [];

    // Wait for the new tab while clicking the link
    const newPagePromise = context.waitForEvent("page");

    await page.locator(".cart-header-navlink[href*='offers']").click();

    const newPage = await newPagePromise;
    // Wait for the new tab to load
    await newPage.waitForLoadState();
    await newPage.locator(".date-field-container label").waitFor();
    await newPage.getByLabel("Page size:").selectOption("20");
    // const rows = newPage.locator(".table-bordered tr");
    // const rowCount = await rows.count();
    // for (let i = 1; i < rowCount; i++) {
    //     const vegetable = await rows.nth(i).locator("td").first().textContent();
    //     productName.push(vegetable);
    // }

    await newPage.locator("button[class*='calendar-button']").click();
    const titleOfCalendar = newPage.locator("button[class*='label']")
    await titleOfCalendar.waitFor();
    await titleOfCalendar.click();
    const year = Number(await titleOfCalendar.locator("span").textContent());
    const requiredYear = 2030;
    const requiredMonth = "August"
    const requiredDate = "30";
    const diff = requiredYear - year;
    if (diff > 0) {
        for (let i = 0; i < diff; i++) {
            await newPage.locator("button[class*='next-button']").click();
        }
    } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
            await newPage.locator("button[class*='prev-button']").click();
        }
    }
    
    await newPage.locator("div[class*='months'] button")
        .filter({ hasText: requiredMonth })
        .click();
    
    // const date = await newPage.locator("div[class*='days'] button").allTextContents();

    await newPage
        .locator(
            ".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)"
        )
        .filter({ hasText: new RegExp(`^${requiredDate}$`) })
        .click();

    const deliveryYear = await newPage.locator("input[name='year']").inputValue();
    expect(deliveryYear).toEqual(String(requiredYear));
})

test("Verify Selenium Practice Page To Flight Booking Page", async ({ page, context }) => {
    

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/");
    const products = page.locator(".products .product");
    await products.first().waitFor();

    // Wait for the new tab while clicking the link
    const newPagePromise = context.waitForEvent("page");

    await page.locator(".cart-header-navlink[href*='dropdownsPractise']").click();

    const newPage = await newPagePromise;
    // Wait for the new tab to load
    await newPage.waitForLoadState();
    await newPage.locator(".book_flight").waitFor();



})