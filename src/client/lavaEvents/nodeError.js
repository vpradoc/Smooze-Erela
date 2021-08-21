const c = require('colors')

module.exports = class nodeError {
    constructor(client) {
        this.client = client
    }
    async run (node, error) {
        if (error && error.message.includes('"pong"')) {
            const lavalinkPing = this.client.lavalinkPings.get(node.identifier);
            lavalinkPing.ping = Date.now() - lavalinkPing.lastPingSent;
            return;
          }
          console.log(
            c.red(
              `[❌] [Lavalink]: Ocorreu um erro no node ${node.identifier}.\nErro: ${error.message}`
            )
          );
    }
}