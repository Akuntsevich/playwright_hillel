import { test, expect } from '@playwright/test';
import casual from 'casual-browserify';

test.describe('Registration flow test suits', () => {
    const baseEmail = 'al.kun.055@gmail.com';
    const uniqueEmail = casual.email;
    const loginPassword = 'j3498ojcjc30B';
    const namep = process.env.USERNAME;
    const passwordP = process.env.PASSWORD;

    test.beforeEach(async ({ page }) => {
        await page.goto(`https://${namep}:${passwordP}@qauto.forstudy.space/`, { waitUntil: 'load' });
    });

    test('Successful registration with valid data', async ({ page }) => {
        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupName', 'Alex');
        await page.fill('input#signupLastName', 'Kun');
        await page.fill('input#signupEmail', uniqueEmail);
        await page.fill('input#signupPassword', loginPassword);
        await page.fill('input#signupRepeatPassword', loginPassword);
        await expect(page.locator('text=Register')).toBeEnabled();
        await page.click('text=Register');

        await expect(page).toHaveURL(/\/panel\/garage/);
        await page.click('span.icon-logout');

        // Login again
        await page.click('button.header_signin');
        await page.fill('input#signinEmail', uniqueEmail);
        await page.fill('input#signinPassword', loginPassword);
        await page.click('div.modal-footer >> text=Login');
        await expect(page).toHaveURL(/\/panel\/garage/);
    });

    test('Should show error for empty fields', async ({ page }) => {
        const nameError = page.locator('div.form-group >> text="Name required"');
        const passwordError = page.locator('div.form-group >> text="Password required"');

        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.click('input#signupName');
        await page.click('input#signupLastName');
        await page.click('input#signupEmail');
        await page.click('input#signupPassword');
        await page.click('input#signupRepeatPassword');
        await page.click('input#signupName');  // Re-focus to trigger validation
        
        await expect(nameError).toBeVisible();
        await expect(page.locator('text=Last name required')).toBeVisible();
        await expect(page.locator('text=Email required')).toBeVisible();
        await expect(passwordError).toBeVisible();
        await expect(page.locator('text=Re-enter password required')).toBeVisible();
        await expect(page.locator('text=Register')).toBeDisabled();
    });

    test('Should show error for wrong data', async ({ page }) => {
        const nameInvalid = page.locator('div.form-group >> text="Name is invalid"');
        const passwordInvalid = page.locator('div.form-group >> text="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"').first();

        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupName', 'a1');
        await page.fill('input#signupLastName', 'b2');
        await page.fill('input#signupEmail', '1');
        await page.fill('input#signupPassword', '1');
        await page.fill('input#signupRepeatPassword', '1');
        await page.click('input#signupName');  // Re-focus to trigger validation
        
        await expect(nameInvalid).toBeVisible();
        await expect(page.locator('text=Last name is invalid')).toBeVisible();
        await expect(page.locator('text=Email is incorrect')).toBeVisible();
        await expect(passwordInvalid).toBeVisible();
        await expect(page.locator('text=Register')).toBeDisabled();
    });

    test('Should show error for wrong length in name and last name fields', async ({ page }) => {
        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupName', 'a');
        await page.click('input#signupLastName');
        
        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
        
        await page.fill('input#signupName', 'a'.repeat(21));
        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
        
        await page.fill('input#signupLastName', 'b'.repeat(21));
        await page.click('input#signupName');
        await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Should show error when passwords do not match', async ({ page }) => {
        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupPassword', loginPassword);
        await page.fill('input#signupRepeatPassword', 'D1fferentP@ss');
        await page.click('input#signupName');
        
        await expect(page.locator('text=Passwords do not match')).toBeVisible();
        await expect(page.locator('input#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('text=Register')).toBeDisabled();
    });

    test('Register button should be disabled with incorrect data', async ({ page }) => {
        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupName', 'J');
        await page.fill('input#signupLastName', 'D');
        await page.fill('input#signupEmail', 'john.doe@');
        await page.fill('input#signupPassword', '123');
        await page.fill('input#signupRepeatPassword', '123');
        await expect(page.locator('text=Register')).toBeDisabled();
    });

    test('Trims spaces in name and last name fields', async ({ page }) => {
        await page.click('button.header_signin');
        await page.click('button.btn.btn-link:has-text("Registration")');
        await page.fill('input#signupName', '   John   ');
        await page.fill('input#signupLastName', '   Doe   ');
        await expect(page.locator('input#signupName')).toHaveValue('   John   ');
        await expect(page.locator('input#signupLastName')).toHaveValue('   Doe   ');
    });
});
