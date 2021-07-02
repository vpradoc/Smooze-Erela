const { MessageEmbed } = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require('../../structures/ClientEmbed')
module.exports = class Help extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "help";
    this.aliases = ["ajuda"];
    this.category = "Informação"
    this.description = "Comando para que eu envie minha lista de utilidades!";
    this.usage = "help";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix, author) {
    Guild.findOne({ _id: message.guild.id }, async (err, server) => {
      const data = [];
      const Config = [];
      const Economia = [];
      const Diversão = [];
      const Moderação = []
      const Informação = [];
      const Imagens = [];
      const Outros = [];
      const { commands } = message.client;

      if (args[0]) {
        const name = args[0].toLowerCase();
        const command =
          commands.get(name) ||
          commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
          return message.quote(
            `${Emojis.Errado} - Não encontrei nenhum comando com o nome \`${name}\``
          );
        }

        const EMBED1 = new ClientEmbed(author)
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
              value: `\`${command.aliases}\``,
            },
            {
              name: "**Descrição:**",
              value: command.description,
            },
            {
              name: "**Como usar**",
              value:`${server.prefix}${command.usage}`,
            }
          )
          .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.quote(EMBED1);
      } else {
        const HELP = new ClientEmbed(author)
          .setAuthor(
            "Smooze - Lista de Comandos",
            this.client.user.displayAvatarURL()
          )
          .setColor(process.env.EMBED_COLOR)


          const ownerc = this.client.commands.filter((x) => x.category == "Owner").size
        HELP.setDescription(`Olá ${message.author.username}, sou o **\`Smooze\`**, um bot criado em JavaScript.
    Posso executar comandos diversos para fazer com que meus usuários se sintam a vontade em seus servidores. No momento eu conto com \`${this.client.commands.size - ownerc}\` funcionalidades.\n
    Para saber mais sobre algum dos comandos listados abaixo, utilize **${server.prefix}help <comando>**! \n\n`);
        commands.map((command) => {
          if (command.category === "Config")
            Config.push(command.name);
          else if (command.category === "Economia")
            Economia.push(command.name);
          else if (command.category === "Diversão") 
            Diversão.push(command.name);
            else if (command.category === "Imagens") 
            Imagens.push(command.name);
          else if (command.category === "Informação")
            Informação.push(command.name);
          else if (command.category === "Outros")
            Outros.push(command.name);
            else if (command.category === "Moderação")
            Moderação.push(command.name);
        });

        HELP.addFields(
          {
            name: `${Emojis.Engrenagem} **Config**`,
            value: ` \`${Config.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Coin} **Economia**`,
            value: ` \`${Economia.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Toy} **Diversão**`,
            value: ` \`${Diversão.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Camera} **Imagens**`,
            value: ` \`${Imagens.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Id} **Informação**`,
            value: ` \`${Informação.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Robo} **Moderação**`,
            value: ` \`${Moderação.map((x) => `${x}`).join(" - ")}\``,
          },
          {
            name: `${Emojis.Pergunta} **Outros**`,
            value: ` \`${Outros.map((x) => `${x}`).join(" - ")}\``,
          }
        );

        await message.quote(HELP);
      }
    });
  }
};
