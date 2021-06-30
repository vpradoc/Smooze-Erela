const discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require('../../utils/Emojis')

module.exports = class Avatar extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "avatar";
    this.aliases = ["foto"];
    this.category = "Informação";
    this.description =
      "Comando para que eu envite o avatar de um(a) usuário(a)!";
    this.usage = "avatar <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const user = message.guild.member(
      this.client.users.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.author
    );

    const avatar = user.user.displayAvatarURL({
      dynamic: true,
      format: "jpg",
      size: 2048,
    });

    const EMBED = new discord.MessageEmbed()

      .setTitle(`${user.nickname ? user.nickname : user.user.username}`)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(
        `${Emojis.Camera} Clique **[aqui](${avatar})** para baixar o avatar.`
      )
      .setImage(avatar)
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.quote(EMBED);
  }
};
