const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  if (!args[0]) return message.reply(`Coloque um emoji válido para que eu consiga avaliar!`).then(m => m.delete({ timeout: 5000 }))

  const emoji = message.guild.emojis.cache.find(x => x.id == args[0].replace(/\D/g, '')) || message.guild.emojis.cache.find(x => x.name === `${args[0]}`)

  if (!emoji) return message.reply(`Coloque um emoji válido para que eu consiga avaliar!`).then(m => m.delete({ timeout: 5000 }))

  const image = emoji.url
  const IDENTIFICADOR = emoji.identifier
  const Nome = emoji.name
  const id = emoji.id
  const animado = emoji.animated
  const Tempo = emoji.createdAt
  const Embed = new Discord.MessageEmbed()
    .setTitle(`Aqui estão as informações de **${Nome}**`)
    .setFooter(`Pedido por ${message.author.tag}`, message.author.displayAvatarURL)
    .setColor(process.env.EMBED_COLOR)
    .setThumbnail(image)
    .addField(`**Nome:**`, `${Nome}`, true)
    .addField(`**ID:**`, `${id}`, true)
    .addField(`**É ANIMADO?:**`, `${emoji.animated !== true ? `Não` : 'Sim'}`, false)
    .addField(`**Identificador:**`, `${IDENTIFICADOR}`, true)
    .addField('**Data da criação:**', dateformat('DD/MM/YYYY, às HH:mm:ss', Tempo))
    .setFooter(
      `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
      message.author.displayAvatarURL({ dynamic: true })
    );

  if (emoji) return message.channel.send(Embed)


  function dateformat(template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
      return template.split(specs[i]).join(item)
    }, template)
  }

}
exports.help = {
  name: "emoji",
  aliases: ["emojiinfo"],
  description: "Comando para saber informações de um emoji!",
  usage: "<prefix>emoji",
  category: "Information"
};