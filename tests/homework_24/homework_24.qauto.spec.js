import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import casual from 'casual-browserify';
import SIGNUP_FORM_ERRORS from '../../src/utils/constants';
import mainUser from '../../src/test-data/credentials';
import OuterHeader from '../../src/page-objects/components/OuterHeader';
import SignInForm from '../../src/page-objects/components/forms/SignInForm';
import RegistrationForm from '../../src/page-objects/components/forms/RegistrationForm';
import GaragePage from '../../src/page-objects/page/GaragePage';

test.describe('Registration flow test suits with POM', () => {
    let outerHeader;
    let signInForm;
    let registrationForm;
    let garagePage;
   
    const uniqueEmail = casual.email;
    const loginPassword = mainUser.password;
    const namep = process.env.USER_NAME;
    const passwordP = process.env.USER_PASSWORD;

    test.beforeEach(async ({ page }) => {
        outerHeader = new OuterHeader(page);
        signInForm = new SignInForm(page);
        registrationForm = new RegistrationForm(page);
        garagePage = new GaragePage(page);
        await page.goto(`https://${namep}:${passwordP}@qauto.forstudy.space/`, { waitUntil: 'load' });
    });

    test('Successful registration with valid data', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterName('Alex');
        await registrationForm.enterLastName('Kun');
        await registrationForm.enterEmail(uniqueEmail);
        await registrationForm.enterPassword(loginPassword);
        await registrationForm.enterRepeatPassword(loginPassword);
        await registrationForm.registerButtonEnabled();
        await registrationForm.clickRegisterButton();
        await expect(await garagePage.pageHeader).toBeVisible();
        await expect(await garagePage.pageHeader).toHaveText('Garage');
        await garagePage.logout();
        await outerHeader.openSignInForm();
        await signInForm.fillInLoginForm(uniqueEmail, loginPassword);
        await expect(await garagePage.pageHeader).toBeVisible();

    });

    test('Should show error for empty fields', async ({ page }) => {
        
        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.fillFormAndTriggerValidation();
        await registrationForm.checkErrorMessage(0, SIGNUP_FORM_ERRORS.SIGNUP_NAME_REQUIRED);
        await registrationForm.checkErrorMessage(1, SIGNUP_FORM_ERRORS.SIGNUP_LAST_NAME_REQUIRED);
        await registrationForm.checkErrorMessage(2, SIGNUP_FORM_ERRORS.SIGNUP_EMAIL_REQUIRED);
        await registrationForm.checkErrorMessage(3, SIGNUP_FORM_ERRORS.SIGNUP_PASSWORD_REQUIRED);
        await registrationForm.checkErrorMessage(4, SIGNUP_FORM_ERRORS.SIGNUP_RE_ENTER_PASSWORD_REQUIRED);
        await registrationForm.isRegisterButtonDisabled();

    });

    test('Should show error for wrong data', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterName('a1');
        await registrationForm.enterLastName('b2');
        await registrationForm.enterEmail('1');
        await registrationForm.enterPassword('1');
        await registrationForm.enterRepeatPassword('1');
        await registrationForm.checkErrorMessage(0, SIGNUP_FORM_ERRORS.SIGNUP_NAME_INVALID);
        await registrationForm.checkErrorMessage(1, SIGNUP_FORM_ERRORS.SIGNUP_LAST_NAME_INVALID);
        await registrationForm.checkErrorMessage(2, SIGNUP_FORM_ERRORS.SIGNUP_EMAIL_INVALID);
        await registrationForm.checkErrorMessage(3, SIGNUP_FORM_ERRORS.SIGNUP_PASSWORD_INVALID);
        await registrationForm.isRegisterButtonDisabled();

    });

    test('Should show error for wrong length in name and last name fields', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterName('a');
        await registrationForm.focusLastNameField();
        await registrationForm.checkErrorMessage(0, SIGNUP_FORM_ERRORS.SIGNUP_NAME_LENGTH);
        await registrationForm.enterName('a'.repeat(21));
        await registrationForm.checkErrorMessage(0, SIGNUP_FORM_ERRORS.SIGNUP_NAME_LENGTH);
        await registrationForm.enterLastName('b'.repeat(21));
        await registrationForm.focusNameField();
        await registrationForm.checkErrorMessage(1, SIGNUP_FORM_ERRORS.SIGNUP_LAST_NAME_LENGTH);

    });

    test('Should show error when passwords do not match', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterPassword(loginPassword);
        await registrationForm.enterRepeatPassword('D1fferentP@ss');
        await registrationForm.focusNameField();
        await registrationForm.checkErrorMessage(0, SIGNUP_FORM_ERRORS.SIGNUP_PASSWORDS_NOT_MATCH);
        await registrationForm.checkRepeatPasswordBorderColor('rgb(220, 53, 69)');
        await registrationForm.isRegisterButtonDisabled();

    });

    test('Register button should be disabled with incorrect data', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterName('J');
        await registrationForm.enterLastName('D');
        await registrationForm.enterEmail('john.doe@');
        await registrationForm.enterPassword('123');
        await registrationForm.enterRepeatPassword('123');
        await registrationForm.isRegisterButtonDisabled();
    
    });

    test('Trims spaces in name and last name fields', async ({ page }) => {

        await outerHeader.openSignInForm();
        await signInForm.openRegisterForm();
        await registrationForm.enterName('   John   ');
        await registrationForm.enterLastName('   Doe   ');
        await registrationForm.checkNameValue('   John   ');
        await registrationForm.checkLastNameValue('   Doe   ');
        
    });
});