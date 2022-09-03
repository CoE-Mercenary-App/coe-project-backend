const LogStrategy = require('./log.strategy');
const config = require('./config.json');

class Logger {

    constructor(strategy = 'toConsole') {
        this.logs = [];
        this.strategy = LogStrategy[strategy];
    }

    get count() {
        return this.logs.length;
    }

    changeStrategy(newStrategy) {
        this.strategy = LogStrategy[newStrategy];
    }

    logRequest(req) {
        const resMessage = `${req?.method}: ${req?.originalUrl} Timeout:${req?.res?._keepAliveTimeout} Complete:${req?.complete}`;
        this.logMessage(resMessage);
    }

    logMessage(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        this.strategy(timestamp, message);
    }




}

module.exports = new Logger(config.logs.strategy);