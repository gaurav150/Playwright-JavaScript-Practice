const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const POManager = require("../../pageobjects/POManager");
const { expect } = require("@playwright/test");

// Launch browser before each scenario
Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page, expect);


});

// Close the browser after each scenario
After(async function () {
    await this.context?.close();
    await this.browser?.close();
});

BeforeStep(function () {
    // this hook will be executed before all steps in a scenario 
})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
})