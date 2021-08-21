const c = require('colors')

module.exports = class nodeConnect {
    constructor(client) {
        this.client = client
    }
    async run (node) {
        this.client.lavalinkPings = new Map();

        this.client.lavalinkPings.set(node.identifier, {});
        const sendPing = () => {
        node.send({
          op: "ping",
        });
      };
      sendPing();
      setInterval(() => {
        sendPing();
      }, 45000);
      console.log(c.green(`[🚀] Lavalink CONECTADO!`));
    }
}