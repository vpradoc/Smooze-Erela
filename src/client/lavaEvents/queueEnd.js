const c = require('colors')
const Emojis = require(`../../utils/Emojis`)

module.exports = class queueEnd {
    constructor(client) {
        this.client = client
    }
    async run (player) {
        
        const channel = this.client.channels.cache.get(player.textChannel);
      channel.send(
        `${Emojis.Certo} |  Fila de músicas acabou, vou esperar **2 minutos** antes de sair do canal!`
      );
      setTimeout(() => {
        if (!player) return;

        return player.destroy();
      }, 2 * 60000);
    }
}