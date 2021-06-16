const Discord = require("discord.js");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Emojis = require("../../utils/Emojis");

exports.run = async (client, message, args) => {
  const user =
    client.users.cache.get(args[0]) ||
    message.mentions.members.first()

  if (!user) {
    message.channel.send(
      `${Emojis.Errado} - ${message.author}, você deve escolher um membro para fazer carinho!`
    );
  } else if (user === message.author) {
    message.channel.send(
      `${Emojis.Errado} - ${message.author}, você não pode fazer carinho em sí mesmo!`
    );
  } else {
    const gif = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
      res.json()
    );

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setDescription(
        `**${
          message.author.username ? message.author : message.author.username
        } fez um carinho no(a) <@${user.id}>!**`
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setImage(gif.url);

    message.channel.send(embed);
  }
};

exports.help = {
  name: "carinho",
  aliases: ["pat"],
  description: "Comando para fazer um carinho em um(a) usuário(a)!",
  usage: "<prefix>carinho",
  category: "Fun",
};
