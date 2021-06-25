const Discord = require("discord.js");
const moment = require("moment");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis.js");

module.exports = class Serverinfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "serverinfo";
    this.aliases = ["si", "sinfo"];
    this.category = "Informação"
    this.description = "Comando para que eu envie informações de seu servidor!";
    this.usage = "serverinfo";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    moment.locale("pt-br");

    try {
      let boost =
        message.guild.premiumSubscriptionCount === 0
          ? "O servidor não conta com Nitro Boost's"
          : `${message.guild.premiumSubscriptionCount} Boost(s) (Nível: ${message.guild.premiumTier})`;

      let channels = [
        `Texto: ${
          message.guild.channels.cache.filter((x) => x.type == "text").size
        }`,
        `Voz: ${
          message.guild.channels.cache.filter((x) => x.type == "voice").size
        }`,
      ].join("\n");

      const SERVERINFO = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
        .setColor(process.env.EMBED_COLOR)
        .setTimestamp()
        .setFooter(
          `Pedido por ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
          {
            name: `**Informações do Servidor**`,
            value: `${Emojis.Coroa} **Dono:**\n${message.guild.owner.user.tag}\n${Emojis.Id} **Id:**\n${message.guild.id}\n${Emojis.Calendario} **Data da criação:**\n${moment(message.guild.createdAt).format("L")} (${moment(message.guild.createdAt).startOf("day").fromNow()})\n${Emojis.Smooze} **Data da minha entrada:**\n${moment(message.guild.member(this.client.user.id).joinedAt).format("L")} (${moment(message.guild.member(this.client.user.id).joinedAt).startOf("day").fromNow()})\n`
          },
          {
            name: `**Estrutura do servidor:**`,
            value: `${Emojis.Fone} **Total de Canais:**\n${message.guild.channels.cache.size - message.guild.channels.cache.filter((x) => x.type == "category").size}\n${Emojis.Robo} **Bots:**\n${message.guild.members.cache.filter((x) => x.user.bot).size.toLocaleString()}\n${Emojis.Boost} **Boost's:**\n${boost}\n`
          },
          {
          name: `**Membros:** \`${message.guild.memberCount.toLocaleString()}\``,
          value: `
                  🟢 **Online:** \`${message.guild.members.cache.map((x) => x.presence.status).filter((x) => x == "online").length}\`\n🟡 **Ausente:** \`${message.guild.members.cache.map((x) => x.presence.status).filter((x) => x == "idle").length}\`\n🔴 **Ocupado:** \`${message.guild.members.cache.map((x) => x.presence.status).filter((x) => x == "dnd").length}\`\n⚫ **Offline:** \`${message.guild.members.cache.map((x) => x.presence.status).filter((x) => x == "offline").length}\``
          })

          if(message.guild.bannerURL !== "null" ) SERVERINFO.setImage(message.guild.bannerURL({dynamic: true, format: "jpg", size: 2048}))

      message.quote(SERVERINFO);
    } catch (err) {
      console.log(`Erro ao executar o comando serverinfo [${err}]`);
    }
  }
};
