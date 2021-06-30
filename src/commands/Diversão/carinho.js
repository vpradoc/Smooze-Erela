const Discord = require("discord.js");
const fetch = require("node-fetch");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");

module.exports = class Carinho extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "carinho";
    this.aliases = ["pat"];
    this.category = "Diversão";
    this.description = "Comando para fazer um carinho em um(a) usuário(a)!";
    this.usage = "carinho <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.members.first();

    if (!user) {
      message.quote(
        `${Emojis.Errado} - Você deve escolher um membro para fazer carinho!`
      );
    } else if (user.id === message.author.id) {
      message.quote(
        `${Emojis.Errado} - Você não pode fazer carinho em sí mesmo!`
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

      message.quote(embed);
    }
  }
};
