const c = require('colors')
const Emojis = require(`../../utils/Emojis`)

module.exports = class trackStuck {
    constructor(client) {
        this.client = client
    }
    async run (player, track, payload) {
        const channel = this.client.channels.cache.get(player.textChannel);
        channel.send(`${Emojis.Errado} | Ocorreu um erro ao iniciar a música!`);
    }
}