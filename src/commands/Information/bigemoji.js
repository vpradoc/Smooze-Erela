const Discord = require('discord.js')
const Emojis = require('../../utils/Emojis')

exports.run = async (client, message, args) => {

  if (!args[0]) return message.reply(`Coloque um emoji para que eu consiga avaliar!`)

  const emoji = message.guild.emojis.cache.find(x => x.id == args[0].replace(/\D/g, '')) || message.guild.emojis.cache.find(x => x.name === `${args[0]}`)

  if (!emoji) return message.reply(`Coloque um emoji válido para que eu consiga avaliar!`)

  const image = emoji.url
  const IDENTIFICADOR = emoji.identifier
  const Nome = emoji.name
  const id = emoji.id
  const animado = emoji.animated
  const Tempo = emoji.createdAt
  const Embed = new Discord.MessageEmbed()
    .setDescription(`**${Emojis.Dado} Aqui está seu emoji:**`)
    .setColor(process.env.EMBED_COLOR)
    .setImage(image)
    .setFooter(
      `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
      message.author.displayAvatarURL({ dynamic: true })
    );

  if (emoji) return message.channel.send(Embed)



}
exports.help = {
  name: "bigemoji",
  aliases: ["bemoji"],
  description: "Comando para pegar um emoji em tamanho familia!",
  usage: "<prefix>bigemoji",
  category: "Information"
};