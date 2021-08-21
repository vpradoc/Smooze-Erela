const c = require('colors')

module.exports = class unhandledRejection {
    constructor(client) {
        this.client = client
    }
    async run (error) {

        console.error(`\n\n| REJEIÇÃO NÃO TRATADA |\n`, error);
    
    }
}