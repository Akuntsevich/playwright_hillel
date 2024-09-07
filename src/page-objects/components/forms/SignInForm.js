class SignInForm {

    constructor(page) {
        this._page = page;
        this._emailField = page.getByLabel('Email')
        this._passwordField = page.getByLabel('Password')
        this._loginButton = page.getByRole('button', { name: 'Login' });
        this._registerButton = page.getByRole('button', { name: 'Registration' });
    }

    async enterEmail(email) {
        await this._emailField.fill(email);
    }

    async enterPassword(password) {
        await this._passwordField.fill(password);
    }

    async fillInLoginForm(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this._loginButton.click();
    }

    async openRegisterForm() {
        await this._registerButton.click();
    }
}

module.exports = SignInForm;