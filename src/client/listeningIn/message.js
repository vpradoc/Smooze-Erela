const User = require('../../database/Schemas/User')
const Guild = require('../../database/Schemas/Guild')
const discord = require("discord.js");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const Emojis = require("../../utils/Emojis");
const Command = require('../../database/Schemas/Command');
const coldoown = new Set()

module.exports = class {
  constructor(client) {
    this.client = client
  }

async run(message) {
try {

  Guild.findOne({_id: message.guild.id}, async (err, server) => {
  User.findOne({_id: message.author.id}, async (err, user) => {
  if(message.author.bot == true) return


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
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;
        if (coldoown.has(message.author.id))
        return message.channel.send(
          `${Emojis.Tempo} - ${message.author}, você deve aguardar **5 segundos** para usar outro comando.`
        );

  Command.findOne({_id: command}, async (err, comando) => {

    if (comando) {
      if (message.author.id !== process.env.OWNER_ID) {
        if (comando.manutenção)
          return message.channel.send(
            `${message.author}, o comando **\`${cmd.name}\`** está em manutenção no momento.`
          );
      }
      cmd.run(message, args, prefix, author);
      var num = comando.usages;
      num = num + 1;

      await Command.findOneAndUpdate({_id: command}, {$set: {usages: num}})
    
    } else {
      await Command.create({_id: command, usages: 1, manutencao: false})
      message.channel.send(`${message.author}, por favor utilize o comando novamente!`)
      console.log(`O comando ${command} teve seu documento criado na database!`)
    }

  })

  if (!["680943469228982357"].includes(message.author.id)) {
    coldoown.add(message.author.id);
    setTimeout(() => {
      coldoown.delete(message.author.id);
    }, 5000);
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