const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    try {
        // Запуск браузера
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();

        // Переход на сайт и авторизация
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/', { waitUntil: 'load' });
        console.log('Page loaded');

        await page.click('button.header_signin');
        await page.fill('input#signinEmail', 'al.kun.055@gmail.com');
        await page.fill('input#signinPassword', 'j3498ojcjc30B');
        await page.click('div.modal-footer >> text=Login');

        await page.waitForNavigation({ waitUntil: 'load' });
        console.log('Logged in successfully');

        // Извлечение cookies после логина
        const cookies = await page.context().cookies();
        console.log('Cookies:', cookies);

        // Сохранение cookies в JSON файл
        fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
        console.log('Cookies saved to cookies.json');

        // Закрытие браузера
        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
