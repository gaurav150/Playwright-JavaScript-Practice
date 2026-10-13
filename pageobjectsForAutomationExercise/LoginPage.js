class LoginPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.automationExerciseLogo = this.page.locator(".logo");
        this.signUpLoginButton = this.page.locator("a[href*='login']");
        this.newUserSignUptext = this.page.locator(".signup-form h2");
        this.signUpUserName = this.page.locator("input[data-qa*='signup-name']");
        this.userSignUpEmail = this.page.locator("input[data-qa*='signup-email']");
        this.signUpButton = this.page.locator(".signup-form .btn");
        this.userEmail = this.page.locator("[data-qa='login-email']");
        this.userPassword = this.page.locator("[data-qa='login-password']");
        this.loginButton = this.page.locator("[data-qa='login-button']");
        this.logOutButton = this.page.locator("[href*='logout']");
        this.contactUsButton = this.page.locator("[href*='contact_us']");
        this.categoryLocator = this.page.locator(".left-sidebar h2");
        this.emailId;
    }

    async goToUrl(url) {
        await this.page.goto(url);
    }

    async validLogin(userEmail, userPassword) {

        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPassword);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    createValidEmailId(userName) {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        this.emailId = `${userName}${randomNumber}@ymail.com`;
    }

    async naigateToLoginPage() {
        
        await this.expect(this.automationExerciseLogo).toBeVisible();
        await this.signUpLoginButton.click();
        await this.expect(this.newUserSignUptext).toHaveText("New User Signup!");
    }

    async validCreateNewUser(userName, emailId) {
        await this.signUpUserName.fill(userName);
        await this.userSignUpEmail.fill(emailId);
        await this.signUpButton.click();
    }

    async loggingOut() {
        this.logOutButton.click();
    }
    
    async navigatingToContactUsForm() {
        this.contactUsButton.click();
    }

    async userVerifiesForHomePage() {
        await this.expect(this.categoryLocator.first()).toHaveText("Category");
    }
}

module.exports = LoginPage;