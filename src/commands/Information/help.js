const { MessageEmbed } = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Help extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "help";
    this.aliases = ["ajuda"];
    this.category = "Information";
    this.description = "Comando para que eu envie minha lista de utilidades!";
    this.usage = "help";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    Guild.findOne({ _id: message.guild.id }, async (err, server) => {
      const data = [];
      const Config = [];
      const Economy = [];
      const Fun = [];
      const Information = [];
      const Miscellaneous = [];
      const { commands } = message.client;

      if (args[0]) {
        const name = args[0].toLowerCase();
        const command =
          commands.get(name) ||
          commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
          return message.channel.send(
            `${message.author}, não encontrei nenhum comando com o nome \`${name}\``
          );
        }

        const EMBED1 = new MessageEmbed()
          .setTitle(`Informações sobre o comando:`)
          .setThumbnail(this.client.user.displayAvatarURL({ size: 2048 }))
          .setColor(process.env.EMBED_COLOR)
          .addFields(
            {
              name: "**Nome do Comando**",
              value: command.name,
            },
            {
              name: "**Aliases**",
              value: `\`${command.aliases
                .join(", ")
                .replace("  ", "Não tem!")}\``,
            },
            {
              name: "**Descrição:**",
              value: command.description,
            },
            {
              name: "**Como usar**",
              value: command.usage.replace("<prefix>", server.prefix),
            }
          )
          .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.channel.send(EMBED1);
      } else {
        const HELP = new MessageEmbed()
          .setAuthor(
            "Smooze - Lista de Comandos",
            `https://cdn.discordapp.com/avatars/700681803098226778/733d9ad9f1b6e7f9048587b0594103ae.webp?size=2048`
          )
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(this.client.user.displayAvatarURL({ size: 2048 }))
          .setFooter(
            `${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();

        HELP.setDescription(`Olá ${message.author.username}, sou o **\`Smooze\`**, um bot criado em JavaScript.
    Posso executar comandos diversos para fazer com que meus usuários se sintam a vontade em seus servidores.\n
    Para saber mais sobre algum dos comandos listados abaixo, utilize **${prefix}help <comando>**! \n`);
        commands.map((command) => {
          if (command.category === "Config")
            Config.push(command.name);
          else if (command.category === "Economy")
            Economy.push(command.name);
          else if (command.category === "Fun") Fun.push(command.name);
          else if (command.category === "Information")
            Information.push(command.name);
          else if (command.category === "Miscellaneous")
            Miscellaneous.push(command.name);
        });

        HELP.addFields(
          {
            name: `${Emojis.Engrenagem} **Config**`,
            value: `\`${Config.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Dinheiro} **Economy**`,
            value: `\`${Economy.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Gapple} **Fun**`,
            value: `\`${Fun.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Id} **Information**`,
            value: `\`${Information.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Pergunta} **Miscellaneous**`,
            value: `\`${Miscellaneous.map((x) => `${x}`).join(" - ")}\``,
          }
        );

        await message.channel.send(HELP);
      }
    });
  }
};
