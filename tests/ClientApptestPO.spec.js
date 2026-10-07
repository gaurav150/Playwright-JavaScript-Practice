const { test, expect } = require('@playwright/test');
const { customTest } = require('../utils/test-base');
const POManager = require("../pageobjects/POManager");
// JSON -> String -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
const parmeterizedataset = JSON.parse(JSON.stringify(require("../utils/parameterizePlaceOrderTestData.json")));


test('Verify end-to-end product purchase and order confirmation using Page Object Model', async ({ page }) => {


    const poManager = new POManager(page, expect);
    // Logging in to the page
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl("https://rahulshettyacademy.com/client/")
    await loginPage.validLogin(dataset.username, dataset.password);

    // DashBoard Page
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(dataset.productName);
    await dashBoardPage.verifyProductAddedToCartAlert();
    await dashBoardPage.navigateToCart();

    // CartPage
    const cartPage = poManager.getCartPage();
    await cartPage.searchProductInCartPage(dataset.productName)
    await cartPage.clickingToCheckout();

    // Checkout page
    const checkOut = poManager.getCheckOutPage();
    await checkOut.placeOrder(dataset.cvvData, dataset.fullName, dataset.couponCode, dataset.partialCountryName, dataset.fullCountryName);

    // next confirmation page
    const confirmationPage = poManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmationMessage();
    const actualOrderId = await confirmationPage.getOrderIdFromConfirmationPage();
    const expectdOrderId = await confirmationPage.getOrderIdFromOrderDetailsPage();
    confirmationPage.verifyOrderIdsMatch(actualOrderId, expectdOrderId);

});

for (const data of parmeterizedataset) {
    test(`Verify end-to-end product purchase for ${data.productName} using POM`, async ({ page }) => {


        const poManager = new POManager(page, expect);
        // Logging in to the page
        const loginPage = poManager.getLoginPage();
        await loginPage.goToUrl("https://rahulshettyacademy.com/client/")
        await loginPage.validLogin(dataset.username, dataset.password);

        // DashBoard Page
        const dashBoardPage = poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.verifyProductAddedToCartAlert();
        await dashBoardPage.navigateToCart();

        // CartPage
        const cartPage = poManager.getCartPage();
        await cartPage.searchProductInCartPage(data.productName)
        await cartPage.clickingToCheckout();

        // Checkout page
        const checkOut = poManager.getCheckOutPage();
        await checkOut.placeOrder(data.cvvData, data.fullName, data.couponCode, data.partialCountryName, data.fullCountryName);

        // next confirmation page
        const confirmationPage = poManager.getConfirmationPage();
        await confirmationPage.verifyOrderConfirmationMessage();
        const actualOrderId = await confirmationPage.getOrderIdFromConfirmationPage();
        const expectdOrderId = await confirmationPage.getOrderIdFromOrderDetailsPage();
        confirmationPage.verifyOrderIdsMatch(actualOrderId, expectdOrderId);

    });
}

customTest('Verify product purchase with parameterized test data and fixtures', async ({ page, testDataForOrder }) => {


    const poManager = new POManager(page, expect);
    // Logging in to the page
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl("https://rahulshettyacademy.com/client/")
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    // DashBoard Page
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.verifyProductAddedToCartAlert();
    await dashBoardPage.navigateToCart();

    // CartPage
    const cartPage = poManager.getCartPage();
    await cartPage.searchProductInCartPage(testDataForOrder.productName)
    await cartPage.clickingToCheckout();

    // Checkout page
    const checkOut = poManager.getCheckOutPage();
    await checkOut.placeOrder(testDataForOrder.cvvData, testDataForOrder.fullName, testDataForOrder.couponCode, testDataForOrder.partialCountryName, testDataForOrder.fullCountryName);

    // next confirmation page
    const confirmationPage = poManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmationMessage();
    const actualOrderId = await confirmationPage.getOrderIdFromConfirmationPage();
    const expectdOrderId = await confirmationPage.getOrderIdFromOrderDetailsPage();
    confirmationPage.verifyOrderIdsMatch(actualOrderId, expectdOrderId);

});