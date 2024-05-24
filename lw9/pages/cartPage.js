class CartPage {
    // Метод для ожидания появления корзины
    async waitForCartToBeDisplayed() {
    await browser.waitUntil(
        async () => {
            const cart = await $('//div[@class="modal-content"]');
            return cart.isDisplayed();
        },
        {
            timeout: 5000,
            timeoutMsg: 'Expected the cart to be fully loaded after 5 seconds'
        }
    );
    }

    async makeOrder() {
        const orderButton = await $('a.btn.btn-primary[href="cart/view"]');
        await orderButton.click();
    }

    async findProductByName(productName) {
        const cartItems = await $$('//div[@id="cart"]//table/tbody/tr[position() < last()-1]');
        for (const item of cartItems) {
            const name = await item.$('td:nth-child(2) a').getText();
            if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
                return item;
            }
        }
        return null; // Если товар не найден
    }
    
    
    // Метод, который принимает элемент товара и извлекает из него данные
    async extractProductData(productElement) {
        let name = await productElement.$('td:nth-child(2) a').getText();
        const imageSrc = await productElement.$('td:nth-child(1) a img').getAttribute('src');
        const quantity = await productElement.$('td:nth-child(3)').getText();
        let price = await productElement.$('td:nth-child(4)').getText();

        name = name.toLowerCase();
        price = price.replace(/[€$£]/g, '').trim();

        return {
            name,
            imageSrc,
            price,
            quantity
        };
    }
}

module.exports = new CartPage();
