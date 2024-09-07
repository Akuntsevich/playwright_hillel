class OuterHeader {

    constructor(page) {
        this._page = page;
        this._signInButton = page.locator('.header_signin');
    }

    async openSignInForm() {
        await this._signInButton.click();
    }
}

module.exports = OuterHeader;