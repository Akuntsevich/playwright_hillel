import { Locator, Page } from 'playwright';

export class BaseComponent {
    protected readonly _page: Page;
    protected readonly _container: Locator;

    constructor(page: Page, container: Locator){
        this._page = page;
        this._container = container;
    }
}