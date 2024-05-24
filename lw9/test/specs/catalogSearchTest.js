const { SEARCH_TEXT, SEARCH_URL, SEARCH_BREADCRUMB, SEARCH_PAGE_TITLE, CATEGORY_URL } = require('../../config/catalogPageConfig');
const catalogPage = require('../../pages/catalogPage');

describe('Catalog Search', () => {
    beforeEach(async () => {
        await catalogPage.open(CATEGORY_URL);
    });

    it('should find products with names that match the search', async () => {
        await catalogPage.searchProducts(SEARCH_TEXT);
        await browser.waitUntil(
            async () => (await browser.getUrl()) === SEARCH_URL,
            {
                timeout: 5000,
                timeoutMsg: 'Expected URL was not found after 5 seconds'
            }
        );
        const isPresent = await catalogPage.isSearchTextPresentInAllTitles(SEARCH_TEXT);

        //тест не должен проходить
        expect(isPresent).toBe(true);
    });

    it('should change the page title to the text from the search', async () => {
        await catalogPage.searchProducts(SEARCH_TEXT);
        await browser.waitUntil(
            async () => (await browser.getUrl()) === SEARCH_URL,
            {
                timeout: 5000,
                timeoutMsg: 'Expected URL was not found after 5 seconds'
            }
        );
        const titleText = await browser.getTitle();
        expect(titleText).toBe(SEARCH_PAGE_TITLE);
    });

    it('should substitute text from search into category navigation', async () => {
        await catalogPage.searchProducts(SEARCH_TEXT);
        await browser.waitUntil(
            async () => (await browser.getUrl()) === SEARCH_URL,
            {
                timeout: 5000,
                timeoutMsg: 'Expected URL was not found after 5 seconds'
            }
        );
        const breadcrumbText = await catalogPage.getBreadcrumb();
        expect(breadcrumbText).toBe(SEARCH_BREADCRUMB);
    });
});
