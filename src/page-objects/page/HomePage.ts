import { Locator, Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { GaragePage } from "./GaragePage";
import { SignInModal } from "../components/forms/SignInModal";

export class HomePage extends BasePage {

    protected readonly _header: Locator
    protected readonly _gestLogInBtn: Locator
    protected readonly _SignInBtn: Locator
    protected readonly _SignInPopUp: Locator

    constructor(page: Page) {
        super(page, '/');
        this._header = this._page.locator('.header');
        this._gestLogInBtn = this._header.getByRole('button', { name: 'Guest log in' });
        this._SignInBtn = this._header.getByRole('button', { name: 'Sign in' });
        this._SignInPopUp = new SignInModal(this._page);
    }
    
    async loginAsGuest() {
        await this._gestLogInBtn.click();
        return new GaragePage(this._page);
    }

    async loginAsUser(login: string, pass: string) {
        await this._SignInBtn.click();
        await this._SignInPopUp.login(login, pass);
    }
}