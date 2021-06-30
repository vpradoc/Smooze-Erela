const Discord = require("discord.js");
const fetch = require("node-fetch");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");

module.exports = class Kiss extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "kiss";
    this.aliases = ["beijar"];
    this.category = "Diversão";
    this.description = "Comando para dar um beijo em um(a) usuário(a)!";
    this.usage = "kiss <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.members.first();

    if (!user) {
      message.quote(
        `${Emojis.Errado} - Você deve escolher um membro para levar o beijo!`
      );
    } else if (user.id === message.author.id) {
      message.quote(
        `${Emojis.Errado} - Você não pode dar um beijo em sí mesmo!`
      );
    } else {
      const gif = await fetch("https://nekos.life/api/v2/img/kiss").then(
        (res) => res.json()
      );

      const embed = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setDescription(
          `**${
            message.author.username ? message.author : message.author.username
          } deu um beijo no(a) <@${user.id}>!**`
        )
        .setFooter(
          `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setImage(gif.url);

      message.quote(embed);
    }
  }
};
