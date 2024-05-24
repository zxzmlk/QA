class PrdouctPage {
    get addToCartButton() { return $('#productAdd'); }
    get quantityField() { return $('//input[@name="quantity"]'); }
    
    async addToCart() {
        await this.addToCartButton.click();
    }

    async setQuantity(quantity) {
        await this.quantityField.setValue(quantity);
    }

    open(productURL) {
        return browser.url(`http://shop.qatl.ru/product/${productURL}`);
    }
}

module.exports = new PrdouctPage();