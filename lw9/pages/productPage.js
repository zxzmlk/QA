class PrdouctPage {
    async addToCart() {
        const addToCartButton = await $('#productAdd');
        await addToCartButton.click();
    }

    async setQuantity(quantity) {
        const quantityField = await $('//input[@name="quantity"]');
        await quantityField.setValue(quantity);
    }

    open(productURL) {
        return browser.url(`http://shop.qatl.ru/product/${productURL}`);
    }
}

module.exports = new PrdouctPage();