const { PRODUCT_DATA: PRODUCT_PAGE_DATA, PRODUCT_ORDER_PRICE } = require('../../config/cartPageConfig');
const { CATEGORY_URL, DEFAULT_PRODUCT_QUANTITY } = require('../../config/catalogPageConfig');
const cartPage = require('../../pages/cartPage');
const catalogPage = require('../../pages/catalogPage');
const productPage = require('../../pages/productPage');

describe('Adding products to the cart', () => {
    beforeEach(async () => {
        // Открыть новую сессию браузера перед каждым тестом
        await browser.reloadSession();
    });

    it('should add a product with the same data from catalog page', async () => {
        await catalogPage.open(CATEGORY_URL);

        const productElFromCatalog = await catalogPage.findProductByName(PRODUCT_PAGE_DATA.name);
        await catalogPage.addToCart(productElFromCatalog);

        await cartPage.waitForCartToBeDisplayed();

        const productElFromCart = await cartPage.findProductByName('Test Product');
        expect(productElFromCart).not.toBeNull();
        const productDataFromCart = await cartPage.extractProductData(productElFromCart);
    
        // Сравнение всех полей, кроме поля quantity
        expect(productDataFromCart.name).toEqual(PRODUCT_PAGE_DATA.name);
        expect(productDataFromCart.imageSrc).toEqual(PRODUCT_PAGE_DATA.imageSrc);
        expect(productDataFromCart.price).toEqual(PRODUCT_PAGE_DATA.price);
        // Проверка, что quantity равно 1
        expect(productDataFromCart.quantity).toEqual(DEFAULT_PRODUCT_QUANTITY);
    });

    it('should add a product with the same data from product page', async () => {
        await productPage.open(PRODUCT_PAGE_DATA.url);

        await productPage.setQuantity(PRODUCT_PAGE_DATA.quantity);
        await productPage.addToCart();
        
        await cartPage.waitForCartToBeDisplayed();

        const productElFromCart = await cartPage.findProductByName(PRODUCT_PAGE_DATA.name);
        const productDataFromCart = await cartPage.extractProductData(productElFromCart);

        expect(productDataFromCart.name).toEqual(PRODUCT_PAGE_DATA.name);
        expect(productDataFromCart.imageSrc).toEqual(PRODUCT_PAGE_DATA.imageSrc);
        expect(productDataFromCart.price).toEqual(PRODUCT_PAGE_DATA.price);
        expect(productDataFromCart.quantity).toEqual(PRODUCT_PAGE_DATA.quantity);
    });

    it('should reflect the correct price change after adding a product', async () => {
        await catalogPage.open(CATEGORY_URL);
        const cartValueBeforeAdding = await catalogPage.getCartValue();

        const productElFromCatalog = await catalogPage.findProductByName(PRODUCT_PAGE_DATA.name);
        await catalogPage.addToCart(productElFromCatalog);

        await browser.waitUntil(
            async () => {
                const newCartValue = await catalogPage.getCartValue();
                return newCartValue !== cartValueBeforeAdding;
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected cart value to change after adding a product'
            }
        );

        const cartValueAfterAdding = await catalogPage.getCartValue();
        expect(cartValueAfterAdding).toEqual(cartValueBeforeAdding + parseInt(PRODUCT_PAGE_DATA.price));
    });
    
    afterEach(async () => {
        // Закрыть сессию браузера после каждого теста
        await browser.deleteSession();
    });
});
