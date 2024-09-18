import { test, expect } from '@playwright/test';
import GaragePage from '../../src/page-objects/page/GaragePage';

    test.describe('check storage', async() => {

        test('create car', async ({ page }) => {
           const garagePage = new GaragePage(page);
           await garagePage.navigate();
           await garagePage.addCar('BMW', 'X6', 1234);
           await page.pause();
        });
    });