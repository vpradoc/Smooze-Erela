const Guild = require('../../database/Schemas/Guild')
const User = require('../../database/Schemas/User')
const discord = require("discord.js");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const Emojis = require("../../utils/Emojis");

module.exports = class {
  constructor(client) {
    this.client = client
  }

async run(message) {
try {

  Guild.findOne({_id: message.guild.id}, async (err, server) => {
  User.findOne({_id: message.author.id}, async (err, user) => {
  if(message.author.bot == true) return
  if(user.blacklist === true) return


  if(server){
  if(user){
  
  var prefix;
  prefix = server.prefix;

  if(message.content.match(GetMention(this.client.user.id))) {
    const embed = new discord.MessageEmbed()
    .setColor('#FFFF00')
    .setThumbnail(`https://cdn.discordapp.com/attachments/693473291158945805/852181118047617104/imgbot.png`)
    .setDescription(`Olá sou o Smooze! Um BOT programado utilizando a linguagem \`JavaScript\`. \nCaso queira saber minha lita de comandos, digite **${prefix}ajuda**!\n
    ${Emojis.Id} **Links Úteis**\n**[Meu Criador](https://github.com/Splitze)**\n**[Meu Convite](https://discord.com/oauth2/authorize?client_id=700681803098226778&permissions=20887631278&scope=bot)**`)
    
    .setFooter(`Smooze`, this.client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  }

  let xp = user.Exp.xp
  let level = user.Exp.level
  let nextLevel = user.Exp.nextLevel * level
  let xpGive = Math.floor(Math.random() * 5) + 1

  await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': xp + xpGive}})

  if(xp >= nextLevel) {
    await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': 0, 'Exp.level': level + 1}})
  
    message.channel.send(`${message.author}, você acaba de subir para o level **${level + 1}**!`)
    message.react(`🎆`)
  }

  if (message.content.indexOf(prefix) !== 0) return;
  const author = message.author
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cmdFile =
    this.client.commands.get(cmd.slice(prefix.length)) ||
    this.client.commands.get(this.client.aliases.get(cmd.slice(prefix.length)));
  if(cmdFile) {
    return cmdFile.run(message, args, prefix, author)
  }
} else {
  User.create({_id: message.author.id, gay: Math.floor(Math.random() *100)})
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
}