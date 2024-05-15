class CurrencyExchange {
    constructor(currency, exchange) {
        this.currency = currency;
        this.rate = exchange[currency];
        this.exchangeRates = { ...exchange };
        this.calculateExchangeRates();
    }

    calculateExchangeRates() {
        for (let item in this.exchangeRates) {
            this.exchangeRates[item] = (this.exchangeRates[item] / this.rate).toFixed(2);
        }
    }

    getResponse() {
        return {
            'uri': this.currency,
            'verb': 'GET',
            'res': {
                'statusCode': 200,
                'responseHeaders': { 'Content-Type': 'application/json' },
                'responseBody': JSON.stringify(this.exchangeRates),
            }
        };
    }
}


module.exports = CurrencyExchange;
