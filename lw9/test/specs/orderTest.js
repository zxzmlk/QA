const { PRODUCT_DATA: PRODUCT_PAGE_DATA } = require('../../config/productPageConfig');
const { VALID_USER_DATA, SUCCESS_MESSAGE, INVALID_USER_DATA, ERROR_MESSAGE } = require('../../config/loginPageConfig');
const { USER_DATA } = require('../../config/orderPageConfig');
const cartPage = require('../../pages/cartPage');
const productPage = require('../../pages/productPage');
const orderPage = require('../../pages/orderPage');
const loginPage = require('../../pages/loginPage');

describe('Product order', () => {
    beforeEach(async () => {
        // Открыть новую сессию браузера перед каждым тестом
        await browser.reloadSession();
    });

    it('should display the order details that match the product', async () => {
        await productPage.open(PRODUCT_PAGE_DATA.url);

        await productPage.setQuantity(PRODUCT_PAGE_DATA.quantity);
        await productPage.addToCart();
        
        await cartPage.waitForCartToBeDisplayed();
        await cartPage.makeOrder()

        const productElFromOrder = await orderPage.findProductByName(PRODUCT_PAGE_DATA.name);
        const productDataFromOrder = await orderPage.extractProductData(productElFromOrder);

        expect(productDataFromOrder.name).toEqual(PRODUCT_PAGE_DATA.name);
        expect(productDataFromOrder.imageSrc).toEqual(PRODUCT_PAGE_DATA.imageSrc);
        expect(productDataFromOrder.price).toEqual(PRODUCT_PAGE_DATA.price);
        expect(productDataFromOrder.quantity).toEqual(PRODUCT_PAGE_DATA.quantity);
    });

    it('should not naviagate to error page', async () => {
        await productPage.open(PRODUCT_PAGE_DATA.url);

        await productPage.setQuantity(PRODUCT_PAGE_DATA.quantity);
        await productPage.addToCart();
        
        await cartPage.waitForCartToBeDisplayed();
        await cartPage.makeOrder()

        await orderPage.registerUser(USER_DATA);
    
        const error = await orderPage.getErrorMessage();
        expect(error).toBe(null);
    });

    it('should not display a block with registration for an authorized user', async () => {
        //Авторизуем валидного пользователя
        await loginPage.open();
        await loginPage.loginUser(VALID_USER_DATA.login, VALID_USER_DATA.password);

        await productPage.open(PRODUCT_PAGE_DATA.url);

        await productPage.setQuantity(PRODUCT_PAGE_DATA.quantity);
        await productPage.addToCart();
        
        await cartPage.waitForCartToBeDisplayed();
        await cartPage.makeOrder()

        const divsWithHasFeedback = await orderPage.getDivsWithHasFeedback();
        expect(divsWithHasFeedback).toHaveLength(0);
    });
    
    afterEach(async () => {
        // Закрыть сессию браузера после каждого теста
        await browser.deleteSession();
    });
});
