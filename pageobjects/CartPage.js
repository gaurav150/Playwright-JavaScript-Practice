class CartPage{ 

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.listOfOrders = page.locator("div li");
        this.cartProducts = page.locator("h3");
        this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
        this.continueShopping = page.locator(".heading button[routerlink*='dashboard']");
    }

    async searchProductInCartPage(productName) { 
        await this.continueShopping.waitFor();
        await this.listOfOrders.first().waitFor();
        const cartCount = await this.cartProducts.count();
        let match = false;
        for (let i = 0; i < cartCount; ++i) {
            if (await this.cartProducts.nth(i).textContent() === productName) {
                match = true;
                break;
            }
        }
        await this.expect(match).toBeTruthy();
    }

    async clickingToCheckout() {
        await this.checkoutButton.click();
    }


}
module.exports = CartPage;