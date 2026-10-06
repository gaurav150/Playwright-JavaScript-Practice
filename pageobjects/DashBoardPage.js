class DashBoardPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']")
        this.toast = page.getByRole('alert', { name: 'Product Added To Cart' });

    }

    async searchProductAddCart(productName) {
        await this.productText.first().waitFor()
        const productCount = await this.products.count();
        for (let i = 0; i < productCount; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async verifyProductAddedToCartAlert() {
        await this.expect(this.toast).toHaveText('Product Added To Cart');
    }

    async navigateToCart() {

        await this.cartButton.click()
    }
}

module.exports = DashBoardPage;