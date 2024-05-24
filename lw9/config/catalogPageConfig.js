const SEARCH_TEXT = 'TEST';
const SEARCH_BREADCRUMB = `Поиск по запросу "${SEARCH_TEXT}"`;
const SEARCH_PAGE_TITLE = `Поиск по: ${SEARCH_TEXT}`;
const SEARCH_URL = `http://shop.qatl.ru/search?s=${SEARCH_TEXT}`;

const CATEGORY_URL = 'category/men'
const DEFAULT_PRODUCT_QUANTITY = '1'

module.exports = {SEARCH_TEXT, SEARCH_URL, SEARCH_BREADCRUMB, SEARCH_PAGE_TITLE, CATEGORY_URL, DEFAULT_PRODUCT_QUANTITY};