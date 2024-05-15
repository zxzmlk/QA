const mbHelper = require('mountebank-helper');

class MountebankServer {
    constructor(port) {
        this.port = port;
        this.imposter = new mbHelper.Imposter({ 'imposterPort': this.port });
    }

    addRoute(response) {
        this.imposter.addRoute(response);
    }

    start() {
        return mbHelper.startMbServer(2525)
            .then(() => {
                return this.imposter.postToMountebank();
            })
            .then(() => {
                console.log('Imposter successfully posted.');
            });
    }
}


module.exports = MountebankServer;
