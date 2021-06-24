const Discord = require('discord.js')
const Command = require('../../structures/Command.js')
const Emojis = require('../../utils/Emojis')
module.exports = class Ban extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "ban";
      this.aliases = [];
      this.category = "Moderação";
      this.description = "Comando para banir um(a) membro(a)!";
      this.usage = "ban";
  
      this.enabled = true;
      this.guild = true;
    }
  
    async run(message, args, prefix) {


  if (message.deletable) message.delete()

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return
  }

  //Se não houver uma pessoa para tomar o BAN!
  const Banido = message.guild.member(
    this.client.users.cache.get(args[0]) ||
      message.mentions.members.first())

  if (!Banido) {
    return message.reply(`${Emojis.Errado} - Por favor, coloque alguém para aplicar o ban!`).then(m => m.delete({ timeout: 5000 }))
  }


  //Membro não encontrado!
  if (!Banido) {
    return message.reply(`${Emojis.Errado} - Por favor, coloque um(a) usuário(a) válido para que eu aplique o ban!`).then(m => m.delete({ timeout: 5000 }))
  }

  //A pessoa não pode banir ela mesma!
  if (message.author.id === Banido.id) {
    return message.reply(`${Emojis.Errado} - Você não pode aplicar o ban em sí mesmo!`).then(m => m.delete({ timeout: 5000 }))
  }

  //O Bot não pode banir este membro!
  if (!Banido.kickable) {
    return message.reply(`${Emojis.Errado} - Eu não tenho permissão de banir este membro!`).then(m => m.delete(5000))
  }

  const Motivo = args[1]

  if(!args[1]) {
      Motivo = "Não informado"
  }

  const Embedban = new Discord.MessageEmbed()
    .setColor(process.env.EMBED_COLOR)
    .setThumbnail(Banido.avatarURL)
    .setTitle(Banido.username)
    .setDescription(`**FOI BANIDO COM SUCESSO!**`)
    .addField(`>**Motivo:**`, Motivo)
    .addField(`>**Autor:**`, message.author.username)
    .setFooter(
        `Pedido por ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )

  const embedconfirm = new Discord.MessageEmbed()
    .setColor(process.env.EMBED_COLOR)
    .setThumbnail(Banido.avatarURL)
    .setTitle(`${message.author.username},`)
    .setDescription(`**Você que banir ${user.username} mesmo?**`)
    .addField(`**Motivo:**`, Motivo)
    .addField(`**Autor:**`, message.author.username)
    .setFooter(
        `Pedido por ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )

  message.channel.send(embedconfirm).then(async (msg) => {
    for (emoji of ["✅", "❌"]) await msg.react(emoji);
    msg
      .awaitReactions(
        (reaction, user) =>
          user.id == message.author.id &&
          ["✅", "❌"].includes(reaction.emoji.name),
        { max: 1 }

      )
      .then(async (collected) => {
        if (collected.first().emoji.name == "✅") {

          message.delete()

          Banido.ban(args.slice(1).join(" "))

            .catch(err => {
              if (error) return message.channel.send('Houve um problema...')
            })
          message.channel.send(Embedban);
          await Banido.send(Embedban)

        }
        if (collected.first().emoji.name == "❌") {

          message.delete()
          message.reply(`${Emojis.Certo} - Ban cancelado!`).then(m => m.delete({ timeout: 5000 }))
        }
      });
  });

    }
}