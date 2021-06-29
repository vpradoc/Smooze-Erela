const Guild = require("../../database/Schemas/Guild"),
  User = require("../../database/Schemas/User"),
  Command = require("../../database/Schemas/Command"),
  ClientS = require("../../database/Schemas/Client");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const ClientEmbed = require("../../structures/ClientEmbed");
const  discord = require("discord.js");
const moment = require("moment");
const Emojis = require('../../utils/Emojis')
const coldoown = new Set();

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    moment.locale("pt-BR");



    try {
      let server = await Guild.findOne({ _id: message.guild.id });
      let user = await User.findOne({_id: message.author.id});
      const client = await ClientS.findOne({ _id: this.client.user.id });

      if (message.author.bot == true) return;


    
      if (!user)
        await User.create({ _id: message.author.id, gay: Math.floor(Math.random() *100) });

      if (!server) {
        await Guild.create({_id: message.guild.id})}
      if (!client)
        await ClientS.create({
          _id: this.client.user.id,
          manutenção: false,
        });

        server = await Guild.findOne({ _id: message.guild.id });

        var prefix = server.prefix

        user = await User.findOne({_id: message.author.id});
        
        if(user.blacklist) return 

      if(message.content.match(GetMention(this.client.user.id))) {
        const embed = new discord.MessageEmbed()
        .setColor('#FFFF00')
        .setThumbnail(`https://cdn.discordapp.com/attachments/693473291158945805/852181118047617104/imgbot.png`)
        .setDescription(`Olá sou o Smooze! Um BOT programado utilizando a linguagem \`JavaScript\`. \nCaso queira saber minha lita de comandos, digite **${prefix}ajuda**!\n
        ${Emojis.Id} **Links Úteis**\n**[Meu Criador](https://github.com/Splitze)**\n**[Meu Convite](https://discord.com/oauth2/authorize?client_id=700681803098226778&permissions=20887631278&scope=bot)**`)
        
        .setFooter(`Smooze`, this.client.user.displayAvatarURL())
        .setTimestamp()
        message.quote(embed)
      }
      
      user = await User.findOne({_id: message.author.id});

      let xp = user.Exp.xp
      let level = user.Exp.level;
      let nextLevel = user.Exp.nextLevel * level;

      let xpGive = Math.floor(Math.random() * 5) + 1;

      await User.findOneAndUpdate(
        { _id: message.author.id },
        {
          $set: {
            "Exp.xp": xp + xpGive,
          },
        }
      );

      if (xp >= nextLevel) {
        await User.findOneAndUpdate(
          { _id: message.author.id },
          { $set: { "Exp.xp": 0, "Exp.level": level + 1 } }
        );

        message.channel.send(`${message.author}, você acaba de subir para o level **${level + 1}**!`)
    message.react(`🎆`)
      }

      if (message.content.indexOf(prefix) !== 0) return;
      const author = message.author;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

      if (!cmd) return;
      if (coldoown.has(message.author.id))
        return message.channel.send(
          `${message.author}, você deve aguardar **5 segundos** para usar outro comando.`
        );

      const comando = await Command.findOne({ _id: cmd.name });

      if (comando) {
        if (message.author.id !== '680943469228982357') {
          if (comando.manutenção)
            return message.quote(
              `${Emojis.Smooze} - O comando **\`${cmd.name}\`** está em manutenção no momento!`
            );

          if (client.manutenção) {
            const embedcmanu = new ClientEmbed()
            .setDescription(`**${message.author.tag}**, eu me encontro em manutenção no momento.\nPor favor, tente novamente mais tarde!`)
            return message.quote(embedcmanu);
          }
        }
       
        cmd.run(message, args, prefix, author);
        var num = comando.usages;
        num = num + 1;

    
        if (!["680943469228982357"].includes(message.author.id)) {
          coldoown.add(message.author.id);
          setTimeout(() => {
            coldoown.delete(message.author.id);
          }, 5000);
        }
        await Command.findOneAndUpdate(
          { _id: cmd.name },
          { $set: { usages: num } }
        );
      } else {
        await Command.create({
          _id: cmd.name,
          usages: 1,
          manutenção: false,
        });
        message.channel.send(`${message.author}, por favor utilize o comando novamente!`)
        console.log(
          `O comando ${cmd.name} teve seu documento criado com sucesso.`
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }
  }
}
