const base = require('@playwright/test');
const APIUtils  = require('./APIUtils');
const { request } = require('@playwright/test');

const loginPayload = { userEmail: "sky@ymail.com", userPassword: "Learning@830$3mK2" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };


exports.customTest = base.test.extend({
    // Define your custom fixtures here
    authenticatedPage: async ({ page}, use) => {
        
        const userEmail = page.locator("#userEmail");
        const userPassword = page.locator("#userPassword");
        const loginButton = page.locator("#login");
        const productTitle = page.locator(".card-body b");

        await page.goto("https://rahulshettyacademy.com/client/");
        await userEmail.fill("sky@ymail.com");
        await userPassword.fill("Learning@830$3mK2");
        await loginButton.click();
        await page.waitForLoadState('networkidle');
        await productTitle.first().waitFor();
        await use(page); // Use the authenticated page in the test

        // teardown logic if needed (e.g., logging out) can be added here
        await page.close(); // Close the page after the test is done
    },
    createOrder: async ({}, use) => { 
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, null, loginPayload);
        const loginToken = await apiUtils.getToken();
        const orderId = await apiUtils.createOrder(orderPayload, loginToken);
        await use({ orderId, loginToken }); // Use the created order details in the test
    }
});
