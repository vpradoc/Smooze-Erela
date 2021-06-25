const Discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Bigemoji extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "bigemoji";
    this.aliases = ["bemoji"];
    this.category = "Informação";
    this.description =
      "Comando para que eu envie um emoji em um tamanho familia!";
    this.usage = "bigemoji";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    if (!args[0])
      return message.quote(`${Emojis.Errado} - Coloque um emoji para que eu consiga avaliar!`);

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
      .setDescription(`**${Emojis.Dado} Aqui está seu emoji:**`)
      .setColor(process.env.EMBED_COLOR)
      .setImage(image)
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (emoji) return message.quote(Embed);
  }
};
