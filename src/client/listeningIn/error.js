const c = require('colors')

module.exports = class error {
    constructor(client) {
        this.client = client
    }
    async run (error) {

        console.error(c.red(`\n\n| ERRO |\n`, error))
    }
}