class HomePage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.categoryLocator = this.page.locator(".left-sidebar h2");
        this.homePageLocator = this.page.locator(".fa-home");
        this.testCasesLocator = this.page.locator(".nav [href*='test_cases']");
        this.productButtonLocator = this.page.locator("[href='/products']");
        this.cartButtonLocator = this.page.locator(".nav [href='/view_cart']");

        this.cartHeader = this.page.locator(".active");
        this.productTilesLocator = this.page.locator(".product-image-wrapper");
        this.testPageTitleLocator = this.page.locator("b");
        this.productTitleforProductPageLocator = this.page.getByRole("heading", { name: "All Products", exact: true });
        this.productsList = this.page.locator(".features_items");
        this.searchAreaOnProductPage = this.page.getByRole('textbox', { name: 'Search Product' });
        this.searchSubmitButton = this.page.locator("#submit_search");
        this.footer = this.page.locator("#footer");
        this.subscriptionText = this.page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionInputArea = this.page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = this.page.locator('#subscribe');
        this.successMessage = this.page.locator(".form-row .alert-success")
    }

    async userVerifiesForHomePage() {
        await this.expect(this.categoryLocator.first()).toHaveText("Category");
    }

    async userClickedOnHomePage() {
        await this.homePageLocator.click();
    }

    async userClickedOnTestCasesButton() {
        await this.testCasesLocator.click();
        await this.expect(this.testPageTitleLocator).toHaveText("Test Cases");
    }

    async userClickedOnProductButton() {
        await this.productButtonLocator.click();
        // Step 5: Verify ALL PRODUCTS page
        await this.expect(this.productTitleforProductPageLocator).toBeVisible();
    }

    async userClickedOnCartButton() {
        await this.cartButtonLocator.click();
        // Step 5: Verify shopping cart as header is visible
        await this.expect(this.cartHeader).toHaveText("Shopping Cart");
        // Verify the URL ends with /view_cart
        await this.expect(this.page).toHaveURL(/\/view_cart$/)
    }

    async userVerifiesForProductList() {
        await this.expect(this.productsList).toBeVisible();
    }

    async userVerifiesFirstProductTile() {
        const products = this.productsList.locator(".col-sm-4");
        await this.expect(products.first()).toBeVisible();
        this.expect(await products.count()).toBeGreaterThan(0);
    }

    async userNaviagatedToViewProductForFirstProduct() {

        await this.productsList.locator('a[href="/product_details/1"]').click();
    }

    async userVerifiesForFirstProductDetailsPage() {
        await this.expect(this.page).toHaveURL(/\/product_details\/1/);
    }

    async userSearchedForProduct(productName) {
        await this.searchAreaOnProductPage.fill(productName);
        await this.searchSubmitButton.click();
    }

    async userVerifiesForProdctsOfSearchResults(expectedResult) {
        const productNames = this.productsList.locator(
            ".col-sm-4 .productinfo.text-center p"
        );

        await this.expect(productNames.first()).toBeVisible();

        const count = await productNames.count();
        this.expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const name = await productNames.nth(i).innerText();

            await this.expect(name).toMatch(expectedResult);
        }
    }

    async userSubscribesToNewsletterSuccessfully(email) {
        await this.footer.scrollIntoViewIfNeeded();
        await this.expect(this.footer).toBeVisible();
        await this.expect(this.subscriptionText).toBeVisible();
        await this.subscriptionInputArea.fill(email);
        await this.subscribeButton.click();
        await this.expect(this.successMessage).toHaveText("You have been successfully subscribed!")
    }
}

module.exports = HomePage;