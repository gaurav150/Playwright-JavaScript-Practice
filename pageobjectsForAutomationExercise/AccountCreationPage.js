class AccountCreationPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.accountInformation = this.page.locator(".login-form h2").first();
        this.titleCheckBox = this.page.locator(".clearfix .radio-inline");
        this.password =  this.page.locator("#password");
        this.days =  this.page.locator("#days");
        this.months =  this.page.locator("#months");
        this.year = this.page.locator("#years");
        this.newsLetterCheckBox =  this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.receiveSpecialOfferCheckBox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.firstName = this.page.locator("#first_name");
        this.lastName = this.page.locator("#last_name");
        this.companyName = this.page.locator("#company");
        this.address1 = this.page.locator("#address1");
        this.address2 = this.page.locator("#address2");
        this.country = this.page.locator("#country");
        this.state = this.page.locator("#state");
        this.city = this.page.locator("#city");
        this.zipcode = this.page.locator("#zipcode");
        this.mobileNumber = this.page.locator("#mobile_number");
        this.createAccount = this.page.locator("[data-qa='create-account']");
        this.accountCreated = this.page.locator("[data-qa='account-created']");
        this.confirmationMessage = this.page.locator("p").first();
        this.continueButton = this.page.locator("[data-qa*='continue']");
        this.deleteButton = this.page.locator("a[href*='delete_account']");
        this.deletedAccountButton = this.page.locator("[data-qa='account-deleted']");

    }

    async createUser(title, password, date, month, year, signUpName, lastName,
        companyName, address1, address2, countryName, stateName, cityName, zipcode, contactNumber) {
        await this.expect(this.accountInformation).toHaveText("Enter Account Information");
        await this.titleCheckBox.filter({ hasText: title }).locator('input[type="radio"]').check();
        await this.password.fill(password);
        await this.days.selectOption(date);
        await this.months.selectOption(month);
        await this.year.selectOption(year);
        await this.newsLetterCheckBox.check();
        await this.receiveSpecialOfferCheckBox.check();
        await this.firstName.fill(signUpName);
        await this.lastName.fill(lastName);
        await this.companyName.fill(companyName);
        await this.address1.fill(address1);
        await this.address2.fill(address2);
        await this.country.selectOption(countryName);
        await this.state.fill(stateName);
        await this.city.fill(cityName);
        await this.zipcode.fill(zipcode);
        await this.mobileNumber.fill(contactNumber)
        await this.createAccount.click();
    }

    async confirmAccountCreation() {
        await this.expect(this.accountCreated).toHaveText("Account Created!");
        await this.expect(this.confirmationMessage).toHaveText("Congratulations! Your new account has been successfully created!");
        
    }
    async continueToHomePage(signUpName) {
        await this.continueButton.click();
        await this.expect(this.page.getByText(`Logged in as ${signUpName}`)).toBeVisible();
}

    async deletingCreatedAccount() {
        await this.deleteButton.click();
        await this.expect(this.deletedAccountButton).toHaveText("Account Deleted!");
        await this.continueButton.click();
    }
}

module.exports = AccountCreationPage;