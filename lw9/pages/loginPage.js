class LoginPage {

    async open() {
        await browser.url('http://shop.qatl.ru/user/login');
    }
    async getSubmitButton() {
        return await $('//button[@type="submit"]');
    }
    
    async getLoginErrorElement() {
        return await $('.has-error.has-danger input[name="login"]');
    }

    async getPasswordErrorElement() {
        return await $('.has-error.has-danger input[name="password"]');
    }

    async getLoginErrorIcon() {
        return await $('.has-error.has-danger input[name="login"] ~ span.glyphicon-remove');
    }

    async getPasswordErrorIcon() {
        return await $('.has-error.has-danger input[name="password"] ~ span.glyphicon-remove');
    }

    async getSuccessAlert() {
        return await $('div.alert.alert-success').getText();
    }    

    async getErrorAlert() {
        return await $('div.alert.alert-danger').getText();
    } 
    
    async loginUser(login, password) {
        await $('//input[@name="login"]').setValue(login);
        await $('//input[@name="password"]').setValue(password);
        const submit = await this.getSubmitButton();
        await submit.click();
    }
}


module.exports = new LoginPage();