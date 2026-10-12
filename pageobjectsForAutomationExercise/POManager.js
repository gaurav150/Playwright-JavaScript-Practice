const LoginPage = require("./LoginPage");
const AccountCreationPage = require("./AccountCreationPage");
// const DashBoardPage = require("./DashBoardPage");
// const CartPage = require("./CartPage");
// const CheckOutPage = require("./CheckOutPage");
// const ConfirmationPage = require("./ConfirmationPage");

class POManager {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;

        this.loginPage = new LoginPage(this.page, this.expect);
        this.accountCreationPage = new AccountCreationPage(this.page, this.expect);
        // this.dashBoardPage = new DashBoardPage(this.page, this.expect);
        // this.cartPage = new CartPage(this.page, this.expect);
        // this.checkOutPage = new CheckOutPage(this.page, this.expect);
        // this.confirmationPage = new ConfirmationPage(this.page, this.expect);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getAccountCreationPage() {
        return this.accountCreationPage;
    }

    // getDashBoardPage() {
    //     return this.dashBoardPage;
    // }

    // getCartPage() {
    //     return this.cartPage;
    // }

    // getCheckOutPage() {
    //     return this.checkOutPage;
    // }

    // getConfirmationPage() {
    //     return this.confirmationPage;
    // }
}

module.exports = POManager;