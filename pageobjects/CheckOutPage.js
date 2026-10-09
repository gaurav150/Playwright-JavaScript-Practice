class CheckOutPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.cvv = this.page.locator('.field.small').filter({ hasText: 'CVV Code' }).getByRole('textbox');
        this.nameCard = this.page.getByText('Name on Card').locator('..').getByRole('textbox');
        this.applyCoupon = this.page.locator('input[name="coupon"]');
        this.countryNameLocator = this.page.getByRole('textbox', { name: 'Select Country' });
        this.dropDown = this.page.locator('.ta-results');
        this.couponSuccess = this.page.locator(".field.small p");
        this.submitCouponCode = this.page.locator("button[type='submit']");
        this.countryButton = this.dropDown.locator("button");
        this.placeOrderButton = page.locator(".actions a");
    }

    async placeOrder(cvvData, userName, couponCode, partialCountryName, countryName) {

        await this.cvv.waitFor();
        await this.cvv.fill(cvvData);
        await this.nameCard.fill(userName);
        await this.applyCoupon.fill(couponCode);
        await this.submitCouponCode.click();
        await this.expect(this.couponSuccess).toHaveText("* Coupon Applied");
        await this.countryNameLocator.pressSequentially(partialCountryName, { delay: 300 });
        await this.dropDown.waitFor();

        const countryOption = this.dropDown
            .locator('button.ta-item')
            .filter({ hasText: new RegExp(`^\\s*${countryName}\\s*$`) });

        await countryOption.click();
        await this.expect(this.dropDown).toBeHidden();
        await this.placeOrderButton.click();
    }
}
module.exports = CheckOutPage;