class OrderPage {
    async open() {
        await browser.url(`http://shop.qatl.ru/cart/view`);
    }

    async findProductByName(productName) {
        const cartItems = await $$('//table/tbody/tr[position() < last()-1]');
        for (const item of cartItems) {
            const name = await item.$('td:nth-child(2) a').getText();
            if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
                return item;
            }
        }
        return null; // Если товар не найден
    }
    
    async getDivsWithHasFeedback() {
        return await $$('form div.has-feedback');
    }

    async waitForOrderToBeDisplayed() {
        await browser.waitUntil(
            async () => {
                const productCart = await $('div.product-one.cart');
                return productCart.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected the product cart to be fully loaded after 5 seconds'
            }
        );
    }

    async registerUser(data) {
        await $('//input[@name="login"]').setValue(data.login);
        await $('//input[@name="password"]').setValue(data.password);
        await $('//input[@name="name"]').setValue(data.name);
        await $('//input[@name="email"]').setValue(data.email);
        await $('//input[@name="address"]').setValue(data.address);
        await $('//textarea[@name="note"]').setValue(data.note);
    
        const submitButton = await $('//button[@type="submit"]');
        await submitButton.click();
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

    async getErrorMessage() {
        await browser.waitUntil(
            async () => {
                const errorElement = await $('h1');
                const isDisplayed = await errorElement.isDisplayed();
                return isDisplayed;
            },
            {
                timeout: 5000,
                timeoutMsg: 'Страница ошибки не была загружена',
            }
        );
    
        const errorElement = await $('h1');
        const errorMessage = await errorElement.getText();
        if (errorMessage.includes('Произошла ошибка')) {
            return errorMessage;
        }
        return null; 
    }
    
    
}

module.exports = new OrderPage();
