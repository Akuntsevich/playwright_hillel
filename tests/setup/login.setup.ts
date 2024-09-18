import { test as setup } from '@playwright/test';
import { HomePage } from "../../src/page-objects/page/HomePage";

const USER = process.env.SIGN_IN_USER!;
const PASSWORD = process.env.SIGN_IN_PASSWORD!;

setup('Login', async({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.loginAsUser(USER, PASSWORD);
    await page.getByRole('button', { name: 'Add car' }).waitFor();
    await page.context().storageState({path: './tests/homework_27_1/session-storage.json'});
});