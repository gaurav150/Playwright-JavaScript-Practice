const { test, expect } = require('@playwright/test');

const POManager = require("../pageobjects/POManager");


test('Verify end-to-end product purchase and order confirmation using Page Object Model', async ({ page }) => {


    const poManager = new POManager(page, expect);
    const productName = "ZARA COAT 3";

    // Logging in to the page
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl("https://rahulshettyacademy.com/client/")
    await loginPage.validLogin("sky@ymail.com", "Learning@830$3mK2");
    
    // DashBoard Page
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.verifyProductAddedToCartAlert();
    await dashBoardPage.navigateToCart();
    
    // CartPage
    const cartPage = poManager.getCartPage();
    await cartPage.searchProductInCartPage(productName)
    await cartPage.clickingToCheckout();
    
    // Checkout page
    const checkOut = poManager.getCheckOutPage();
    await checkOut.placeOrder("123", "Shivank Kumar", "rahulshettyacademy", "ind", 'India');
   
    // next confirmation page
    const confirmationPage = poManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmationMessage();
    const actualOrderId =  await confirmationPage.getOrderIdFromConfirmationPage();
    const expectdOrderId = await confirmationPage.getOrderIdFromOrderDetailsPage();
    confirmationPage.verifyOrderIdsMatch(actualOrderId, expectdOrderId);

});
