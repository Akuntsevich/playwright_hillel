const BasePage = require("./BasePage");

class GaragePage extends BasePage {
    // 
    constructor(page) {
        super(page, '/panel/garage');
        this._pageHeader = page.getByRole('heading', { name: 'Garage' });
        this.logoutButton = page.locator('span.icon-logout');
    }

    get pageHeader() {
        return this._pageHeader;
    }

    async logout() {
        await this.logoutButton.click();
    }

}

module.exports = GaragePage;