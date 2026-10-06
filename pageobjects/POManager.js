const LoginPage = require("./LoginPage");
const DashBoardPage = require("./DashBoardPage");
const CartPage = require("./CartPage");
const CheckOutPage = require("./CheckOutPage");
const ConfirmationPage = require("./ConfirmationPage");

class POManager {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;

        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page, this.expect);
        this.cartPage = new CartPage(this.page, this.expect);
        this.checkOutPage = new CheckOutPage(this.page, this.expect);
        this.confirmationPage = new ConfirmationPage(this.page, this.expect);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckOutPage() {
        return this.checkOutPage;
    }

    getConfirmationPage() {
        return this.confirmationPage;
    }
}

module.exports = POManager;