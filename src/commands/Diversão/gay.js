const Discord = require("discord.js");
const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command.js");

module.exports = class Entrada extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "gay";
    this.aliases = [];
    this.category = "Diversão";
    this.description = "Comando para saber se o quanto gay é um(a) usuário(a)!";
    this.usage = "gay";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const pessoa = message.guild.member(
      this.client.users.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.author
    );

    User.findOne({ _id: pessoa.id }, async function (err, user) {
      const randomnumber = Math.floor(Math.random() * 100);

      const embed1 = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setDescription(
          `🌈 | ${message.author} - Eu acho o(a) **${
            pessoa.nickname !== null
              ? `${pessoa.nickname}`
              : `${pessoa.user.username}`
          }** ${randomnumber}% gay!`
        );

      const embed2 = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setDescription(
          `🌈 - Eu acho o(a) **${
            pessoa.nickname !== null
              ? `${pessoa.nickname}`
              : `${pessoa.user.username}`
          }** ${user.gay}% gay!`
        );

      if (user.gay == "null") {
        message.quote(embed1);
        await User.findOneAndUpdate(
          { _id: pessoa.id },
          { $set: { gay: randomnumber } }
        );
      } else {
        message.quote(embed2);
      }
    });
  }
};
