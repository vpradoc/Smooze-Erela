const moment = require("moment");
const discord = require("discord.js");
const duration = require("moment-duration-format");
const os = require("os");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");

module.exports = class Botinfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "botinfo";
    this.aliases = ["binfo", "bi"];
    this.category = "Informação"
    this.description = "Comando para que eu envie as informações do BOT!";
    this.usage = "botinfo";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const inline = true;
    const botAvatar = this.client.user.displayAvatarURL();
    const date = this.client.user.createdAt;
    const userName = this.client.user.username;
    const servsize = this.client.guilds.cache.size;
    const dev = this.client.users.cache.get("680943469228982357");
    const uptime = moment
      .duration(this.client.uptime)
      .format("h [horas] m [minutos] e s [segundos]")
      .replace("minsutos", "minutos");
    const usersize = this.client.users.cache.size;

    const embed = new discord.MessageEmbed()
      .setColor("#FFFF00")
      .setThumbnail(botAvatar)
      .setAuthor(`Smooze`, this.client.user.displayAvatarURL())
      .addField(
        `**Informações Básicas**`,
        `${Emojis.Coroa} Dono: **[Vinicius](https://github.com/Splitze)** | ${
          dev.tag
        } \n${Emojis.Calendario} Data da criação: **${formatDate(
          "DD/MM/YYYY",
          date
        )}**\n👤 Usuários: **${usersize}**\n🏠 Servidores: **${servsize}**`
      )
      .addField(
        `**Informações Técnicas**`,
        `${Emojis.DJs} Livraria: **Discord.Js - v${discord.version}** \n${
          Emojis.Node
        } Versão do Node: **[${process.version}](https://nodejs.org/en/)**\n${
          Emojis.Cama
        } Tempo online: **${uptime}**\n${Emojis.Engrenagem} RAM Usada: **${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}MB**\n${Emojis.Wifi} Ping: **${this.client.ws.ping}ms**\n${
          Emojis.Heroku
        } Hospedagem: **[Heroku](https://www.heroku.com/)**\n${
          Emojis.Linux
        } Sistema Operacional: **${os.platform}**`
      )
      .addField(
        `**Meu Convite**`,
        `**[Me coloque em seu servidor!](https://discord.com/oauth2/authorize?client_id=700681803098226778&permissions=20887631278&scope=bot)**`
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.quote(embed);
  }}

  function formatDate(template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
      return template.split(specs[i]).join(item)
    }, template)
  
};
