class LoginPage {

    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        
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
}

module.exports = LoginPage;