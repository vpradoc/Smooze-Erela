const Discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Emoji extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "emoji";
    this.aliases = [];
    this.category = "Informação"
    this.description = "Comando para que eu envie informações de um emoji!";
    this.usage = "emoji";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    if (!args[0])
      return message.quote(
        `${Emojis.Errado} - Coloque um emoji válido para que eu consiga avaliar!`
      );

    const emoji =
      message.guild.emojis.cache.find(
        (x) => x.id == args[0].replace(/\D/g, "")
      ) || message.guild.emojis.cache.find((x) => x.name === `${args[0]}`);

    if (!emoji)
      return message.quote(
        `${Emojis.Errado} - Coloque um emoji válido para que eu consiga avaliar!`
      );

    const image = emoji.url;
    const IDENTIFICADOR = emoji.identifier;
    const Nome = emoji.name;
    const id = emoji.id;
    const animado = emoji.animated;
    const Tempo = emoji.createdAt;
    const Embed = new Discord.MessageEmbed()
      .setTitle(`Aqui estão as informações de **${Nome}**`)
      .setFooter(
        `Pedido por ${message.author.tag}`,
        message.author.displayAvatarURL
      )
      .setColor(process.env.EMBED_COLOR)
      .setThumbnail(image)
      .addField(`**Nome:**`, `${Nome}`, true)
      .addField(`**ID:**`, `${id}`, true)
      .addField(
        `**É ANIMADO?:**`,
        `${emoji.animated !== true ? `Não` : "Sim"}`,
        false
      )
      .addField(`**Identificador:**`, `${IDENTIFICADOR}`, true)
      .addField(
        "**Data da criação:**",
        dateformat("DD/MM/YYYY, às HH:mm:ss", Tempo)
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (emoji) return message.quote(Embed);

    function dateformat(template, date) {
      var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
      date = new Date(
        date || Date.now() - new Date().getTimezoneOffset() * 6e4
      );
      return date
        .toISOString()
        .split(/[-:.TZ]/)
        .reduce( function (template, item, i) {
          return template.split(specs[i]).join(item);
        }, template);
    }
  }
};
