class ConfirmationPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.confirmationMessage = this.page.locator(".hero-primary");
        this.orderIdLocator = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderButton = this.page.locator("button[routerlink*='myorders']");
        this.orderRows = this.page.locator("tbody tr");
        this.orderDetailsIdLocator = this.page.locator(".col-text");
    }

    async verifyOrderConfirmationMessage() {
        
        await this.expect(this.confirmationMessage).toHaveText(" Thankyou for the order. ");
        
    }

    async getOrderIdFromConfirmationPage() {
        const orderIdText = await this.orderIdLocator.textContent();
        const orderId =  orderIdText
            .replace(/\|/g, '')
            .trim();
        return orderId
    }


    async getOrderIdFromOrderDetailsPage() {
        const orderId = await this.getOrderIdFromConfirmationPage();
        await this.orderButton.click();
        await this.page.locator("tbody").waitFor();
        const orderCount = await this.orderRows.count();

        for (let i = 0; i < orderCount; ++i) {
            const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
            if (rowOrderId === orderId) {
                await this.orderRows.nth(i).locator("button.btn-primary").click();
                break;
            }
        }

        const orderDetailsIdText = await this.orderDetailsIdLocator.textContent();
        const orderDetailsId = orderDetailsIdText
            .replace(/\|/g, '')
            .trim();
        return orderDetailsId;
    }

    verifyOrderIdsMatch(actualOrderId, expectedOrderId) {
        this.expect(actualOrderId).toEqual(expectedOrderId);
    }
}

module.exports = ConfirmationPage;