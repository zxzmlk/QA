class CatalogPage {
    // Получение всех элементов с названиями продуктов
    async getProductTitles() {
        return await $$('div.prdt-top h3').getText();
    }

    async getBreadcrumb() {
        return await $('//div[@class="breadcrumbs-main"]/ol/li[2]').getText();
    }

    // Метод для проверки наличия текста в названиях продуктов
    async isSearchTextPresentInAllTitles(searchText) {
        const titles = await this.getProductTitles();
        for (const titleText of titles) {
            if (!titleText.includes(searchText)) {
                return false;
            }
        }
        return true;
    }    
 
    async open(categoryURL) {
        await browser.url(`http://shop.qatl.ru/${categoryURL}`);
    }

    async searchProducts(text) {
        const searchField = await $('//*[@id="typeahead"]');
        await searchField.setValue(text)
        const submitButton = await $('//form[@action="search"]//input[@type="submit"]');
        await submitButton.click();

    }

    // Поиск элемента товара по имени
    async findProductByName(productName) {
        const products = await $$('div.product-main.simpleCart_shelfItem');
        for (const product of products) {
            const name = await product.$('h3').getText();
            if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
                return product;
            }
        }
        return null; // Если товар не найден
    }

    // Добавление товара в корзину
    async addToCart(productElement) {
        const cartButton = await productElement.$('a.add-to-cart-link');
        await cartButton.click();
    }

    async extractProductData(productElement) {
        let name = await productElement.$('h3').getText();
        const imageSrc = await productElement.$('img').getAttribute('src');
        let price = await productElement.$('span.item_price').getText();
        
        // Приведение имени к нижнему регистру
        name = name.toLowerCase();
    
        // Удаление символов валюты из строки цены
        price = price.replace(/[€$£]/g, '').trim();
    
        return {
            name,
            imageSrc,
            price
        };
    }

    // Метод для получения целочисленного значения элемента корзины
    async getCartValue() {
        const cartElement = await $('//div[@class="cart box_1"]/a/div/span');
        let cartText = await cartElement.getText();
        
        // Проверка на надпись "Empty Cart"
        if (cartText.trim() === 'Empty Cart') {
            return 0;
        } else {
            // Удаление символов валюты и преобразование строки в целое число
            const cartValue = parseInt(cartText.replace(/[€$£]/g, '').trim());
            return cartValue;
        }
    }

    
}

module.exports = new CatalogPage();
