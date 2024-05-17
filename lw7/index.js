const fetch = require('node-fetch');
const CurrencyExchange = require('./currencyExchange');
const MountebankServer = require('./mountebankServer');

const exchangeRUB = {
    'RUB': 1,
    'AUD': 60.96,
    'USD': 91.64,
    'EUR': 98.84,
};

const serviceStub = new MountebankServer(3000);

// Добавляем заглушки ответов на api-запросы для каждой валюты
Object.keys(exchangeRUB).forEach((currency) => {
    const currencyExchange = new CurrencyExchange(currency, exchangeRUB);
    serviceStub.addRoute(currencyExchange.getResponse());
});

const responseError = {
    'uri': '/.*',
    'verb': 'GET',
    'res': {
        'statusCode': 404,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify({'Error': 'Invalid currency code'}),
    }
};

serviceStub.addRoute(responseError);

function makeRequests() {
    const supportedCurrencies = Object.keys(exchangeRUB);
    const allCurrencies = [...supportedCurrencies, 'GBP', ''];
    const requests = allCurrencies.map(currency => {
        return fetch(`http://localhost:3000/${currency}`)
            .then(response => {
                if (response.status === 200 && response.body) {
                    return response.json();
                } else if (response.status === 404) {
                    return response.json().then(error => {
                        throw new Error(`Error for ${currency}: ${error.Error}`);
                    });
                } else {
                    throw new Error("Unexpected API Error");
                }
            })
            .then(data => {
                if (data.Error) {
                    console.error(`Error response for ${currency}:`, data);
                } else { 
                    console.log(`Response for ${currency}:`, data);
                }
            })
            .catch(error => {
                console.error(`Error fetching ${currency}:`, error.message);
            });
    });

    return Promise.all(requests);
}

serviceStub.start().then(() => {
    makeRequests();
    // Response for RUB: { RUB: '1.00', AUD: '60.96', USD: '91.64', EUR: '98.84' }
    // Response for AUD: { RUB: '0.02', AUD: '1.00', USD: '1.50', EUR: '1.62' }
    // Response for EUR: { RUB: '0.01', AUD: '0.62', USD: '0.93', EUR: '1.00' }
    // Response for USD: { RUB: '0.01', AUD: '0.67', USD: '1.00', EUR: '1.08' }
    // Error response for GBP: { Error: 'Invalid currency code' }
    // Error response for : { Error: 'Invalid currency code' }
});
