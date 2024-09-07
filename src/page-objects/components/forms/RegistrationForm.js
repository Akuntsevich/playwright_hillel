const { expect } = require('@playwright/test');

class RegistrationForm {

    constructor(page) {
        this._page = page;
        this._nameField = page.locator('input#signupName');
        this._lastNameField = page.locator('input#signupLastName');
        this._emailField = page.locator('input#signupEmail');
        this._passwordField = page.locator('input#signupPassword');
        this._repeatPasswordField = page.locator('input#signupRepeatPassword');
        this.registerButton = page.locator('text=Register');
        this._errorMessages = page.locator('div.form-group p');
    }

    async enterName(name) {
        await this._nameField.fill(name);
    }

    async enterLastName(lastName) {
        await this._lastNameField.fill(lastName);
    }

    async enterEmail(email) {
        await this._emailField.fill(email);
    }

    async enterPassword(password) {
        await this._passwordField.fill(password);
    }

    async enterRepeatPassword(password) {
        await this._repeatPasswordField.fill(password);
    }

    async fillInRegistrationForm(name, lastName, email, password) {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(password);
        await this.registerButton.click();
    }

    async registerButtonEnabled () {
        return await this.registerButton.isEnabled();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async fillFormAndTriggerValidation() {
        await this._page.focus('input#signupName');
        await this._page.focus('input#signupLastName');
        await this._page.focus('input#signupEmail');
        await this._page.focus('input#signupPassword');
        await this._page.focus('input#signupRepeatPassword');
        await this._page.click('input#signupName');
    }

    async checkErrorMessage(index, expectedText) {
        await expect(this._errorMessages.nth(index)).toHaveText(expectedText);
    }

    async isRegisterButtonDisabled() {
        await expect(this._page.locator('text=Register')).toBeDisabled();
    }

    async focusNameField() {
        await this._page.focus('input#signupName');
    }

    async focusLastNameField() {
        await this._page.focus('input#signupLastName');
    }

    async checkRepeatPasswordBorderColor(expectedColor) {
        await expect(this._repeatPasswordField).toHaveCSS('border-color', expectedColor);
    }

    async checkNameValue(expectedValue) {
        await expect(this._nameField).toHaveValue(expectedValue);
    }

    async checkLastNameValue(expectedValue) {
        await expect(this._lastNameField).toHaveValue(expectedValue);
    }

}
module.exports = RegistrationForm;