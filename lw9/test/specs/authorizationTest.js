const { VALID_USER_DATA, SUCCESS_MESSAGE, INVALID_USER_DATA, ERROR_MESSAGE } = require('../../config/loginPageConfig');
const loginPage = require('../../pages/loginPage');

describe('Authorization', () => {
    beforeEach(async () => {
        // Открыть новую сессию браузера перед каждым тестом
        await loginPage.open();
    });

    it('should login successfully with valid credentials', async () => {
        await loginPage.loginUser(VALID_USER_DATA.login, VALID_USER_DATA.password);
        
    // // Ожидание появления сообщения об успешной авторизации
    // await browser.waitUntil(
    //     async () => {
    //         const alertText = await loginPage.getSuccessAlert();
    //         return alertText === SUCCESS_MESSAGE;
    //     },
    //     {
    //         timeout: 5000,
    //         timeoutMsg: 'Сообщение об успешной авторизации не появилось'
    //     }
    // );

    const alertText = await loginPage.getSuccessAlert();
    expect(alertText).toBe(SUCCESS_MESSAGE);
    });

    it('should display an error message with invalid credentials', async () => {
        await loginPage.loginUser(INVALID_USER_DATA.login, INVALID_USER_DATA.password);
        
        // // Ожидание появления сообщения об ошибке
        // await browser.waitUntil(
        //     async () => {
        //         const alertText = await loginPage.getErrorAlert();
        //         return alertText === ERROR_MESSAGE;
        //     },
        //     {
        //         timeout: 5000,
        //         timeoutMsg: 'Сообщение об ошибке не появилось'
        //     }
        // );

        const alertText = await loginPage.getErrorAlert();
        expect(alertText).toBe(ERROR_MESSAGE);
    });


    it('should display error icons when submitting empty credentials', async () => {
        const submitButton = await loginPage.getSubmitButton();
        await submitButton.click();

        // Проверка наличия элементов ошибок для логина
        const loginErrorElement = await loginPage.getLoginErrorElement();
        expect(await loginErrorElement.isDisplayed()).toBe(true);

        const loginErrorIcon = await loginPage.getLoginErrorIcon();
        expect(await loginErrorIcon.isDisplayed()).toBe(true);

        // Проверка наличия элементов ошибок для пароля
        const passwordErrorElement = await loginPage.getPasswordErrorElement();
        expect(await passwordErrorElement.isDisplayed()).toBe(true);

        const passwordErrorIcon = await loginPage.getPasswordErrorIcon();
        expect(await passwordErrorIcon.isDisplayed()).toBe(true);
    });
    
});
