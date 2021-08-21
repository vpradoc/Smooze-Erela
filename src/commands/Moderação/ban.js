const Discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Ban extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ban";
    this.category = "Moderação";
    this.description = "Comando para banir um(a) membro(a)!";
    this.usage = "ban <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix, author) {

    let user1 = message.author

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply(`${Emojis.Errado} **|** Você não tem as permissões necessárias para criar canais (\`BAN_MEMBERS\`)!`)
    }

    //Se não houver uma pessoa para tomar o BAN!
    const Banido = message.guild.members.cache.get(args[0]) || message.mentions.members.first()

    if (!Banido) {
      return message.channel.send(
        `${Emojis.Errado} **|** ${message.author}, por favor coloque alguém para que eu aplique o ban!`
      );
    }

    //Membro não encontrado!
    if (!Banido) {
      return message.channel.send(
        `${Emojis.Errado} **|** ${message.author}, por favor coloque um(a) usuário(a) válido para que eu aplique o ban!`
      );
    }

    //A pessoa não pode banir ela mesma!
    if (message.author.id === Banido.id) {
      return message.channel.send(
        `${Emojis.Errado} **|** ${message.author}, você não pode aplicar o ban em sí mesmo!`
      );
    }

    //O Bot não pode banir este membro!
    if (!Banido.kickable) {
      return message.channel.send(
        `${Emojis.Errado} **|** ${message.author}, eu não tenho permissão de banir este membro!`
      );
    }

    let Motivo = args[1];

    if (!Motivo) {
      Motivo = "NENHUM MOTIVO ESPECIFICADO"
    }
        const Embedban = new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setFooter(
            `Executado por ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setAuthor(`${Banido.user.username} - Banido!`, Banido.user.displayAvatarURL())
          .setDescription(`${Emojis.Nada}${Emojis.Id} **Motivo:**\n\`${Motivo}\`\n${Emojis.Nada}${Emojis.Bust} **Autor:**\n${Emojis.Nada}${author}`)

          const Embedbanido = new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setFooter(
            `Executado por ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setAuthor(`Você foi banido!`, Banido.user.displayAvatarURL())
          .setDescription(`${Emojis.Nada}${Emojis.Id} **Motivo:**\n\`${Motivo}\`\n${Emojis.Nada}${Emojis.Bust} **Autor:**\n${Emojis.Nada}${author}`)


          const filter = (reaction, user) => {
            return (
              user.id == user1.id && ["866095859267928094", "866096308841218099", "866100685237911563"].includes(reaction.emoji.id)
            );
          };


          message.reply(`${Emojis.Certo} **|** ${message.author}, gostaria mesmo de banir o membro **${Banido}**, com o motivo \`${Motivo}\`?\nPara banir de forma silenciosa, basta reagir com ${Emojis.SoundOff}`).then(async (msgReact) => {
            for (let emoji of [Emojis.Certo, Emojis.Errado, Emojis.SoundOff]) await msgReact.react(emoji);
    
            msgReact
        .awaitReactions({ filter: filter, max: 1 })
        .then(async (collected) => {
          if (collected.first().emoji.id === "866095859267928094") {
                msgReact.delete();
                Banido.ban({reason: Motivo});
                message.reply({ embeds: [Embedban] });
                Banido.send({ embeds: [Embedbanido] });
                return
              }
              if(collected.first().emoji.id === "866096308841218099") {
                msgReact.delete();
                return message.channel.send(
                  `${Emojis.Certo} **|** ${message.author}, o ban foi cancelado com sucesso!`
                );
                }
                if(collected.first().emoji.id === "866100685237911563") {
              
                msgReact.delete();
                Banido.ban({reason: Motivo});
                Banido.send({ embeds: [Embedbanido] });
                return;
            }
          });
        });
      }
  }

