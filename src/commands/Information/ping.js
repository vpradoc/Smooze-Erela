const Command = require("../../structures/Command.js");

module.exports = class Ping extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ping";
    this.aliases = [];
    this.category = "Information";
    this.description = "Comando para que eu envie informações sobre meu ping!";
    this.usage = "ping";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    message.channel.send(`Ping do BOT **${this.client.ws.ping}**`);
  }
};
