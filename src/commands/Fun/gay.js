const Discord = require('discord.js');
const mongoose = require('mongoose')
const User = require('../../database/Schemas/User')

exports.run = async (client, message, args) => {
  

    const pessoa = message.guild.member(
          client.users.cache.get(args[0]) ||
          message.mentions.members.first() ||
          message.author
)

User.findOne({_id: pessoa.id}, async function(err, user){

  const randomnumber = Math.floor(Math.random() *100)

  const embed1 = new Discord.MessageEmbed()
  .setColor(process.env.EMBED_COLOR)
  .setDescription(`🌈 | ${message.author} - Eu acho o(a) **${pessoa.nickname !== null ? `${pessoa.nickname}` : `${pessoa.user.username}`}** ${randomnumber}% gay!`)

  const embed2 = new Discord.MessageEmbed()
  .setColor(process.env.EMBED_COLOR)
  .setDescription(`🌈 | ${message.author} - Eu acho o(a) **${pessoa.nickname !== null ? `${pessoa.nickname}` : `${pessoa.user.username}`}** ${user.gay}% gay!`)
  
  if(user.gay == 'null') {
    message.channel.send(embed1)
    await User.findOneAndUpdate({_id: pessoa.id}, {$set: {gay: randomnumber}}) 
  } else{
message.channel.send(embed2)
}
    })
}

exports.help = {
  name: "gay",
  aliases: [" "],
  description: "Comando para saber o quanto gay é um usuário!",
  usage: "<prefix>gay",
  category: "Fun",
  
}