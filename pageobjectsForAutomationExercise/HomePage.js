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
        this.continueButtonForProductPage = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.productTilesInCartPage = this.page.locator("tbody tr");
        this.productPrices = this.productTilesInCartPage.locator(".cart_price");
        this.productQuantities = this.productTilesInCartPage.locator(".cart_quantity");
        this.productTotalPrices = this.productTilesInCartPage.locator(".cart_total");
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

    async userHoveredOnFirstProductTile() {
        const firstProduct = this.productsList.locator(".col-sm-4").first();
        await this.expect(firstProduct).toBeVisible();
        await firstProduct.hover();
        await this.page.getByText('Add to cart').nth(1).click();
        await this.continueButtonForProductPage.click()
    }

    async userHoversOnSecondProductTile() {
        const secondProduct = this.productsList.locator(".col-sm-4").nth(1);
        await this.expect(secondProduct).toBeVisible();
        await secondProduct.scrollIntoViewIfNeeded();
        await secondProduct.hover();
        await this.page.getByText('Add to cart').nth(2).click();
        await this.continueButtonForProductPage.click()
    }

    async userVerifiesPriceQuantityAndTotalPriceOfProducts(numberOfDifferentProducts) {
        // Verify two products are present
        await this.expect(this.productTilesInCartPage).toHaveCount(numberOfDifferentProducts);

        // Verify first product
        await this.expect(this.productPrices.nth(0)).toHaveText("Rs. 500");
        await this.expect(this.productQuantities.nth(0)).toHaveText("1");
        await this.expect(this.productTotalPrices.nth(0)).toHaveText("Rs. 500");

        // Verify second product
        await this.expect(this.productPrices.nth(1)).toHaveText("Rs. 400");
        await this.expect(this.productQuantities.nth(1)).toHaveText("1");
        await this.expect(this.productTotalPrices.nth(1)).toHaveText("Rs. 400");
    }

    async userClickedOnViewButtonOfLastProduct() {
        let viewButton = this.productsList.locator(".col-sm-4").last().locator(".choose")
        await viewButton.click();
        await this.page.locator("#quantity").fill("4");
        await this.page.locator(".cart").click();
        // Wait for the Add to Cart modal
        const modal = this.page.locator("#cartModal");
        await this.expect(modal).toBeVisible();

        // Continue Shopping is inside the modal
        await modal.getByRole("button", { name: "Continue Shopping" }).click();
        
    }

    async userVerifiesQuantitiesInCartPage() {
        await this.expect(this.productQuantities.nth(0)).toHaveText("4");
    }
}

module.exports = HomePage;