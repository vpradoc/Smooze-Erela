const Command = require("../../structures/Command.js");
const ws = require('ws')
const Emojis = require('../../utils/Emojis.js')
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

    message.channel.send(`${Emojis.Wifi} - Calculando!`).then(m =>{
      var ping = m.createdTimestamp - message.createdTimestamp;
      var botPing = Math.round(this.client.pi);

      m.edit(`**${Emojis.Smooze} | Meu ping:** \`${ping}\`ms\n**${Emojis.Heroku} | Heroku:** \`${this.client.ws.ping}\`ms`);
  });

  }
};
