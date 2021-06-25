const discord = require("discord.js");
const moment = require("moment");
const duration = require("moment-duration-format");
const os = require("os");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Host extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "host";
    this.aliases = [];
    this.category = "Owner";
    this.description =
      "Comando para que eu envie informações sobre a hospedagem!";
    this.usage = "host";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const uptime = moment
      .duration(this.client.uptime)
      .format("h [horas] m [minutos] e s [segundos]")
      .replace("minsutos", "minutos");

    const Embed = new discord.MessageEmbed()
      .setColor("#FFFF00")
      .setTitle(`Informações da Hospedagem`)
      .setThumbnail(`${this.client.user.displayAvatarURL()}`)
      .addField(
        `${Emojis.Heroku} **HOST**`,
        `\`\`\`\n(${os.hostname})\`\`\``,
        false
      )
      .addField(
        `${Emojis.Engrenagem} **RAM Usada**`,
        `\`\`\`\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB\`\`\``,
        true
      )
      .addField(
        `${Emojis.Linux} **Sistema Operacional**`,
        `\`\`\`\n${os.platform}  Versão: ${os.release}\`\`\``,
        true
      )
      .addField(
        `${Emojis.Cama} **Estou acordado à**`,
        `\`\`\`\n${uptime}\`\`\``,
        true
      )
      .addField(
        `${Emojis.Wifi} **Ping**`,
        `\`\`\`\n${this.client.ws.ping}ms\`\`\``
      )
      .setTimestamp()
      .setFooter(
        `Pedido por ${message.author.username}`,
        message.author.displayAvatarURL()
      );

    message.quote(Embed);
  }
};
