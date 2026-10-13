class ContactUsPage{

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.titleText = this.page.locator(".contact-form h2");
        this.name = this.page.locator("[data-qa='name']");
        this.email = this.page.locator("[data-qa='email']");
        this.subject = this.page.locator("[data-qa='subject']");
        this.message = this.page.locator("[data-qa='message']");
        this.uploadFile = this.page.locator("[name='upload_file']")
        this.submitButton = this.page.locator("[data-qa='submit-button']");
        this.confirmationText = this.page.locator(".status");
        this.navigateTOHomePage = this.page.locator("#form-section .btn");
        
    }

    async fillingContactUsForm(fullName, emailId, subjectDetails, messageContent,filePath) {
        await this.expect(this.titleText).toHaveText("Get In Touch");
        await this.name.fill(fullName);
        await this.email.fill(emailId);
        await this.subject.fill(subjectDetails);
        await this.message.fill(messageContent);
        await this.uploadFile.setInputFiles(filePath);
        // Register the handler before clicking Submit

        // Pause for 1.5 seconds
        await this.page.waitForTimeout(1_500);
        // Verify the fields before submission
        await this.expect(this.name).toHaveValue(fullName);
        await this.expect(this.email).toHaveValue(emailId);
        await this.expect(this.subject).toHaveValue(subjectDetails);
        await this.expect(this.message).toHaveValue(messageContent);
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitButton.click();

        
    }

    async userVerifiesSuccessMessage() {
        await this.expect(this.confirmationText).toHaveText("Success! Your details have been submitted successfully.")
    }

    async userNavigatingToHomePage() {
        await this.navigateTOHomePage.click()
        
    }

    
}
module.exports = ContactUsPage;