const { test, expect } = require('@playwright/test');
const POManager = require("../pageobjectsForAutomationExercise/POManager");

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
    await loginPage.validCreateNewUser(signUpName);
    const accountCreationPage = poManager.getAccountCreationPage();
    await accountCreationPage.createUser('Mr.', password, "17", "December", "1998", signUpName, "karan",
        "Infosys Softtware Solutions", "Mahadev Ganj", "Mahavir Tola", "Israel", "Uttar Pradesh", "Noida",
        "676301", "7003091351")

    // confirming account Created
    await accountCreationPage.confirmAccountCreation();

    // continuing to homepage
    await accountCreationPage.continueToHomePage(signUpName);

    console.log("Email Id is -> " + loginPage.emailId);

    // deleting created Account
    await accountCreationPage.deletingCreatedAccount();
})

test.only("Login User with correct email and password", async ({ page }) => {
    const poManager = new POManager(page, expect);
    // Creating newUser
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl('http://automationexercise.com');
    loginPage.createValidEmailId(signUpName);
    await loginPage.validCreateNewUser(signUpName);
    const accountCreationPage = poManager.getAccountCreationPage();
    await accountCreationPage.createUser('Mr.', password, "17", "December", "1998", signUpName, "karan",
        "Infosys Softtware Solutions", "Mahadev Ganj", "Mahavir Tola", "Israel", "Uttar Pradesh", "Noida",
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
