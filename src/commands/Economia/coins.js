const User = require("../../database/Schemas/User");
const discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require('../../utils/Emojis.js')
module.exports = class Coins extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "coins";
    this.aliases = ["dinheiro"];
    this.category = "Economia";
    this.description = "Comando para saber quantos coins você tem!";
    this.usage = "coins";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const pessoa =
      message.mentions.users.first() ||
      this.client.users.cache.get(args[0]) ||
      message.author;

    User.findOne({ _id: pessoa.id }, async (err, user) => {
      let coins = user.coins;

      if (err) {
        message.channel.send("Esta pessoa não possuí conta no meu banco!");
      }

      const embed = new discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`${Emojis.Dinheiro} **Saldo Bancário:**`)
        .addField(`${Emojis.Coin} **Coins:**`, `${coins}`)
        .setThumbnail(pessoa.displayAvatarURL())
        .setFooter(
          `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.channel.send(embed);
    });
  }
};
exports.help = {
  name: "coins",
  aliases: ["dinheiro"],
  description: "Comando para saber quantos coins você tem!",
  usage: "<prefix>daily",
  category: "Economy",
};
