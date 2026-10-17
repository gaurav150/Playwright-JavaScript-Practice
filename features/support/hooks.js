const { Before, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

// Launch browser before each scenario
Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();


});

// Close the browser after each scenario
After(async function () {
    await this.context?.close();
    await this.browser?.close();
});