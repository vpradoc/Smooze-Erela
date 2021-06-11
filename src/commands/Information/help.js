const { MessageEmbed } = require("discord.js");
const Guild = require("../../database/Schemas/Guild");

exports.run = async (client, message, args) => {

    Guild.findOne({ _id: message.guild.id }, async function (err, server) {

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
      commands.find((c) => c.help.aliases && c.help.aliases.includes(name));

    if (!command) {
      return message.channel.send(
        `${message.author}, não encontrei nenhum comando com o nome \`${name}\``
      );
    }

    const EMBED1 = new MessageEmbed()
    .setTitle(`Informações sobre o comando:`)
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setColor(process.env.EMBED_COLOR)
    .addFields({
        name: '**Nome do Comando**',
        value: command.help.name
        },
        {
            name: '**Aliases**',
            value: `\`${command.help.aliases.join(", ").replace("  ", "Não tem!")}\``
        },
        {
            name: '**Descrição:**',
            value: command.help.description
        },
        {
            name: '**Como usar**',
            value: command.help.usage.replace("<prefix>", server.prefix)
        })
        .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );


    message.channel.send(EMBED1);
  } else {
    const HELP = new MessageEmbed()
      .setAuthor("Smooze - Lista de Comandos", `https://cdn.discordapp.com/avatars/700681803098226778/733d9ad9f1b6e7f9048587b0594103ae.webp?size=2048`)
      .setColor(process.env.EMBED_COLOR)
      .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    HELP.setDescription(`Olá ${message.author.username}, sou o **\`Smooze\`**, um bot criado em JavaScript.
    Posso executar comandos diversos para fazer com que meus usuários se sintam a vontade em seus servidores.\n
    Para utilizar meus comandos listados abaixo, utilize o seguinte prefixo **\`${server.prefix}\`**! \n`);
    commands.map((command) => {
      if (command.help.category === "Config")
        Config.push(command.help.name);
      else if (command.help.category === "Economy")
        Economy.push(command.help.name);
      else if (command.help.category === "Fun")
        Fun.push(command.help.name);
      else if (command.help.category === "Information")
        Information.push(command.help.name);
      else if (command.help.category === "Miscellaneous")
        Miscellaneous.push(command.help.name);
    });

    HELP.addFields(

      {
        name: "Config",
        value: `\`${Config.map(x => `${x}`).join(" - ")}\``,
      },
      {
        name: "Economy",
        value: `\`${Economy.map(x => `${x}`).join(" - ")}\``,
      },
      {
        name: "Fun",
        value: `\`${Fun.map(x => `${x}`).join(" - ")}\``,
      },
      {
        name: "Information",
        value: `\`${Information.map(x => `${x}`).join(" - ")}\``,
      },
      {
        name: "Miscellaneous",
        value: `\`${Miscellaneous.map(x => `${x}`).join(" - ")}\``,
      },
    )


    await message.channel.send(HELP);
  }})
}

exports.help = {
  name: "help",
  aliases: ["h", "ajuda"],
  category: "Config",
  description: "Use esse comando para ver a lista de comandos do BOT!",
  usage: "<prefix>help"
};
