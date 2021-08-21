const c = require('colors')
const Emojis = require(`../../utils/Emojis`)

module.exports = class trackError {
    constructor(client) {
        this.client = client
    }
    async run (player, track, payload) {
        const channel = this.client.channels.cache.get(player.textChannel);
        channel.send(
        `${Emojis.Errado} |  Erro ao colher informações da música **(${track.title})**!`
      );
      player.stop();
    }
}