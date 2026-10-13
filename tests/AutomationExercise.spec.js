const { test, expect } = require('@playwright/test');
const POManager = require("../pageobjectsForAutomationExercise/POManager");
const path = require("node:path");

test.beforeEach(async ({ page }) => {
    await page.route('**/pagead/**', route => route.abort());
    await page.route('**/simgad/**', route => route.abort());
});

let signUpName = "sam";
let password = "Learning@830$3mK2";


test("Registering User Using POM", async ({ page }) => {

    const poManager = new POManager(page, expect);
    // Creating newUser
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    loginPage.createValidEmailId(signUpName);
    await loginPage.naigateToLoginPage();
    let newEmailId = loginPage.emailId;
    await loginPage.validCreateNewUser(signUpName, newEmailId);
    const accountCreationPage = poManager.getAccountCreationPage();
    await accountCreationPage.createUser('Mr.', password, "17", "December", "1998", signUpName, "karan",
        "Infosys Softtware Solutions", "Mahadev Ganj", "Mahavir Tola", "India", "Uttar Pradesh", "Noida",
        "676301", "7003091351")

    // confirming account Created
    await accountCreationPage.confirmAccountCreation();

    // continuing to homepage
    await accountCreationPage.continueToHomePage(signUpName);

    console.log("Email Id is -> " + loginPage.emailId);

    // deleting created Account
    await accountCreationPage.deletingCreatedAccount();
})

test("Login User with correct email and password", async ({ page }) => {
    const poManager = new POManager(page, expect);
    // Creating newUser
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    loginPage.createValidEmailId(signUpName);
    let newEmailId = loginPage.emailId;
    await loginPage.naigateToLoginPage();
    await loginPage.validCreateNewUser(signUpName, newEmailId);
    const accountCreationPage = poManager.getAccountCreationPage();
    await accountCreationPage.createUser('Mr.', password, "17", "December", "1998", signUpName, "karan",
        "Infosys Softtware Solutions", "Mahadev Ganj", "Mahavir Tola", "India", "Uttar Pradesh", "Noida",
        "676301", "7003091351")

    // continuing to homepage
    await accountCreationPage.continueToHomePage(signUpName);

    // logout 
    await loginPage.loggingOut();

    // logging  in using valid credential
    await loginPage.validLogin(loginPage.emailId, password);
   
    // deleting created Account
    await accountCreationPage.deletingCreatedAccount();
})

test("Login User with incorrect email and password", async ({ page }) => {
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    await loginPage.naigateToLoginPage();
    await loginPage.validLogin("sam@ymail.com", "12345");
    await expect(page.locator(".login-form p")).toHaveText("Your email or password is incorrect!");
});

test("Register User with existing email", async ({ page }) => {
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    loginPage.createValidEmailId(signUpName);
    let newEmailId = loginPage.emailId;
    console.log("email id is -->>>" + newEmailId);
    await loginPage.naigateToLoginPage();
    await loginPage.validCreateNewUser(signUpName, newEmailId);
    const accountCreationPage = poManager.getAccountCreationPage();
    await accountCreationPage.createUser('Mr.', password, "17", "December", "1998", signUpName, "karan",
        "Infosys Softtware Solutions", "Mahadev Ganj", "Mahavir Tola", "India", "Uttar Pradesh", "Noida",
        "676301", "7003091351")

    // continuing to homepage
    await accountCreationPage.continueToHomePage(signUpName);

    // logout 
    await loginPage.loggingOut();
    await loginPage.validCreateNewUser(signUpName, newEmailId);
    await expect(page.locator(".signup-form p")).toHaveText("Email Address already exist!")
})

test.only("Verifying Contact us Form Successfully submitted", async ({ page }) => {
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    await loginPage.navigatingToContactUsForm();
    const contactUsPage = poManager.getContactUsPage();
    let messageContent = "I got a product with defective in nature physically so i want replacement for that.";
    const filePath = path.resolve(__dirname,"../dummy_defective_product_purchase_bill.pdf");
    await contactUsPage.fillingContactUsForm("sam", "sam9216@ymail.com",
        "InquiryAboutProductIssue", messageContent, filePath);
    await contactUsPage.userVerifiesSuccessMessage();
    await contactUsPage.userNavigatingToHomePage();
    await loginPage.userVerifiesForHomePage();
});