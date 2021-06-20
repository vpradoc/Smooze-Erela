const Discord = require("discord.js");
const moment = require("moment");
const Command = require("../../structures/Command.js");

module.exports = class Serverinfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "serverinfo";
    this.aliases = [];
    this.category = "Information";
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
          : `${message.guild.premiumSubscriptionCount} Boost(s) ( Level Server: ${message.guild.premiumTier} )`;

      let channels = [
        `Texto: ${
          message.guild.channels.cache.filter((x) => x.type == "text").size
        }`,
        `Voz: ${
          message.guild.channels.cache.filter((x) => x.type == "voice").size
        }`,
      ].join("\n");

      const SERVERINFO = new Discord.MessageEmbed()
        .setAuthor(`Informações do servidor`)
        .setColor(process.env.EMBED_COLOR)
        .setTimestamp()
        .setFooter(
          `Pedido por ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
          {
            name: "<:id:798255861561819148>  **ID DO SERVIDOR**",
            value: `\`\`\`\n${message.guild.id}\`\`\``,
            inline: true,
          },
          {
            name: "<:coroa:802924330925162546>  **Proprietário(a)**",
            value: `\`\`\`\n${message.guild.owner.user.tag}\`\`\``,
            inline: true,
          },
          {
            name: `:loud_sound:  **Total de Canais** ( **${
              message.guild.channels.cache.size -
              message.guild.channels.cache.filter((x) => x.type == "category")
                .size
            }** )`,
            value: channels,
            inline: false,
          },
          {
            name: ":robot:  **Bots**",
            value: message.guild.members.cache
              .filter((x) => x.user.bot)
              .size.toLocaleString(),
            inline: true,
          },
          {
            name: "<:calendario:798254558480433152>  **Data de Criação**",
            value: `${moment(message.guild.createdAt).format("L")} ( ${moment(
              message.guild.createdAt
            )
              .startOf("day")
              .fromNow()} )`,
            inline: true,
          },
          {
            name: ":birthday:  **Data da minha Entrada**",
            value: `${moment(
              message.guild.member(this.client.user.id).joinedAt
            ).format("L")} ( ${moment(
              message.guild.member(this.client.user.id).joinedAt
            )
              .startOf("day")
              .fromNow()} )`,
            inline: false,
          },
          {
            name: "<:boost:798251201765965855>  **Quantidade / Nível Nitro Boost**",
            value: boost,
            inline: true,
          },
          {
            name: ":bust_in_silhouette:  **Total de Usuários**",
            value: message.guild.memberCount.toLocaleString(),
            inline: false,
          },
          {
            name: "Status dos Membros:",
            value: `Online: ${
              message.guild.members.cache
                .map((x) => x.presence.status)
                .filter((x) => x == "online").length
            }\nAusente: ${
              message.guild.members.cache
                .map((x) => x.presence.status)
                .filter((x) => x == "idle").length
            }\nOcupado: ${
              message.guild.members.cache
                .map((x) => x.presence.status)
                .filter((x) => x == "dnd").length
            }\nOffline: ${
              message.guild.members.cache
                .map((x) => x.presence.status)
                .filter((x) => x == "offline").length
            }`,
            inline: true,
          }
        );

      message.channel.send(SERVERINFO);
    } catch (err) {
      console.log(`Erro ao executar o comando serverinfo [${err}]`);
    }
  }
};
