const { SEARCH_TEXT, SEARCH_URL, SEARCH_BREADCRUMB, SEARCH_PAGE_TITLE, CATEGORY_URL } = require('../../config/catalogPageConfig');
const catalogPage = require('../../pages/catalogPage');

describe('Catalog Search', () => {
    beforeEach(async () => {
        await catalogPage.open(CATEGORY_URL);
    });

    it('should find products with names that match the search', async () => {
        await catalogPage.findByText(SEARCH_TEXT);
        await browser.waitUntil(
            async () => (await browser.getUrl()) === SEARCH_URL,
            {
                timeout: 5000,
                timeoutMsg: 'Expected URL was not found after 5 seconds'
            }
        );
        const isPresent = await catalogPage.isSearchTextPresentInAllTitles(SEARCH_TEXT);
        const titleText = await browser.getTitle();
        const breadcrumbText = await catalogPage.breadcrumb.getText();

        expect(isPresent).toBe(true);
        expect(breadcrumbText).toBe(SEARCH_BREADCRUMB);
        expect(titleText).toBe(SEARCH_PAGE_TITLE);
    });
});
