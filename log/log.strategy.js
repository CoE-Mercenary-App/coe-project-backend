const path = require('path');
const { appendFile } = require('fs');

function writeFile(timestamp, message) {
    const fileName = path.join(__dirname, 'logs.txt');
    appendFile(fileName, `${timestamp} - ${message} \n`, error => {
        if (error) {
            console.log('Error writing to file');
            console.error(error);

        }
    });
}


class LogStrategy {


    static noDate(timestamp, message) {
        console.log(message);
    }

    static toFile(timestamp, message) {
        writeFile(timestamp, message);
    }

    static toConsole(timestamp, message) {
        console.log(`${timestamp} - ${message}`);
    }

    static toFileAndConsole(timestamp, message) {
        writeFile(timestamp, message);
        console.log(`${timestamp} - ${message}`);

    }

    static none() {}



}

module.exports = LogStrategy;