const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
    const user = message.guild.member(
        client.users.cache.get(args[0]) ||
          message.mentions.members.first() ||
          message.author
)
 

if(user.id == '650504527434350602')
return message.channel.send(`🌈 | ${message.author} - Eu acho que o(a) **${user.nickname !== null ? `${user.nickname}` : `${user.user.username}`}** 100% gay!`)

if(user.id == '680943469228982357')
return message.channel.send(`🌈 | ${message.author} - Eu acho que o(a) **${user.nickname !== null ? `${user.nickname}` : `${user.user.username}`}** 0% gay!`)


message.channel.send(`🌈 | ${message.author} - Eu acho que o(a) **${user.nickname !== null ? `${user.nickname}` : `${user.user.username}`}** ${Math.floor(Math.random() *100)}% gay!`)


}

exports.help = {
  name: "gay",
  aliases: [" "],
  
}