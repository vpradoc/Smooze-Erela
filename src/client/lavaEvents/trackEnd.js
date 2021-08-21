const c = require('colors')

module.exports = class trackEnd {
    constructor(client) {
        this.client = client
    }
    async run (player) {
        if (player.get("message") && !player.get("message").deleted) {
            player.get("message").delete();
          }
    }
}