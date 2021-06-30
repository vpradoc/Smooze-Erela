const Discord = require("discord.js");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");

module.exports = class Slap extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "slap";
    this.aliases = ["tapa"];
    this.category = "Diversão";
    this.description =
      "Comando para dar um tapa em um(a) usuário(a)!";
    this.usage = "slap <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {

  const user =
    this.client.users.cache.get(args[0]) ||
    message.mentions.members.first()

  if (!user) {
    message.quote(
      `${Emojis.Errado} - Você deve escolher um membro para levar o tapa!`
    );
  } else if (user === message.author) {
    message.quote(
      `${Emojis.Errado} - Você não pode dar um tapa em sí mesmo!`
    );
  } else {
    const gif = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
      res.json()
    );

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setDescription(
        `**${
          message.author.username ? message.author : message.author.username
        } deu um tapa no(a) <@${user.id}>!**`
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setImage(gif.url);

    message.quote(embed);
  }
};
}