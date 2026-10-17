const { Given, When, Then, setDefaultTimeout, } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

// Step 1: Login to the Ecommerce application
Given(/^User LoggedIn to Ecommerce application with "([^"]+)" and "([^"]+)"$/,{timeout:20*1000} ,async function (userName, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToUrl("https://rahulshettyacademy.com/client/");
    await loginPage.validLogin(userName, password);
});

// Step 2: Add the product to the cart
When(/^User adds "([^"]+)" to Cart$/, async function (productName) {
    const dashBoardPage = this.poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.verifyProductAddedToCartAlert();
    await dashBoardPage.navigateToCart();
}
);

// Step 3: Verify the product in the cart and proceed to checkout
Then(/^User Verifies "([^"]+)" is displayed in the Cart$/, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.searchProductInCartPage(productName);
    await cartPage.clickingToCheckout();
}
);

// Step 4: Enter checkout details and place the order
When("User Enter Valid details and Place the Order", async function () {
    const checkOut = this.poManager.getCheckOutPage();

    await checkOut.placeOrder(
        "123",
        "Shivank Kumar",
        "rahulshettyacademy",
        "ind",
        "India"
    );
}
);

// Step 5: Verify the order in Order History
Then("Verify order is present in the OrderHistory", async function () {
    const confirmationPage = this.poManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmationMessage();
    const actualOrderId = await confirmationPage.getOrderIdFromConfirmationPage();
    const expectedOrderId = await confirmationPage.getOrderIdFromOrderDetailsPage();
    await confirmationPage.verifyOrderIdsMatch(actualOrderId, expectedOrderId);
}
);

Given(/^User LoggedIn to Ecommerce2 application with "([^"]+)" and "([^"]+)"$/, { timeout: 20 * 1000 }, async function (userName, password) {
    const userNameLocator = this.page.locator("#username");
    const passwordLocator = this.page.locator("#password");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userNameLocator.fill(userName);
    await passwordLocator.fill(password);
    await signInBtn.click();
});

Then(/^User Verifies that Error message contains "([^"]+)"$/, async function (errorMessage) {
    await expect(this.page.locator("[style*='block']")).toContainText(errorMessage);
});
