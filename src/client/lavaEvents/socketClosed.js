const c = require('colors')
const Emojis = require(`../../utils/Emojis`)

module.exports = class socketClosed {
    constructor(client) {
        this.client = client
    }
    async run (player, payload) {
        if (payload.byRemote) {
            return player.destroy();
          }
    }
}