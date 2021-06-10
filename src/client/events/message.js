const Guild = require('../../database/Schemas/Guild')
const User = require('../../database/Schemas/User')
const discord = require("discord.js");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

module.exports = async (client, message) => {
try {

  Guild.findOne({_id: message.guild.id}, async function(err, server){
  User.findOne({_id: message.author.id}, async function(err, user){
  if(message.author.bot == true) return

  if(server){
  if(user){
  
  var prefix;
  prefix = server.prefix;

  if(message.content.match(GetMention(client.user.id))) {
    const embed = new discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle(`Olá, sou o Smooze`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/693473291158945805/852181118047617104/imgbot.png`)
    .setDescription(`Sou um BOT programado utilizando a linguagem JavaScript! \nCaso queira saber minha lita de comandos, digite **${prefix}ajuda**!`)
    .setTimestamp()
    message.channel.send(embed)
  }

  if (message.content.indexOf(prefix) !== 0) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cmdFile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if(cmdFile) {
    return cmdFile.run(client, message, args)
  }
} else {
  User.create({_id: message.author.id})
} 
} else {
  Guild.create({_id: message.guild.id})
}
})
  })
}catch(err) {
  if (err) console.log(err)
}

}