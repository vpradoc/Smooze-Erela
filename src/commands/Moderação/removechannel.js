const discord = require('discord.js')
const Command = require('../../structures/Command.js')

module.exports = class RemoveChannel extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "removechannel";
      this.aliases = ['rchannel'];
      this.category = "Moderação";
      this.description = "Comando para que eu delete um canal!";
      this.usage = "removechannel";
  
      this.enabled = true;
      this.guild = true;
    }
  
    async run(message, args, prefix) {

    if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply('Você não tem as permissões necessárias para **criar/deletar** canais!').then(m => m.delete({ timeout: 10000 }))

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.reply('Eu não tenho as permissões necessárias para **criar/deletar** canais!').then(m => m.delete({ timeout: 10000 }))

        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) 

    if (!canal)
        return message.reply('Por favor, coloque o id de um canal para ser excluído!').then(m => m.delete({ timeout: 10000 }))


    const Embed = new discord.MessageEmbed()
        .setColor('#FFFF00')
        .setThumbnail('https://cdn.discordapp.com/attachments/797207262782816339/804140377652199434/imgbot.png')
        .setTitle(`Você quer mesmo deletar o canal ${canal.name}?`)
        .addField(`**Sim**`, `Emoji: ✅`)
        .addField(`**Não**`, `Emoji: ❌`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    const msg = await message.channel.send(Embed);

    await msg.react('✅')
    await msg.react('❌')
    const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
    msg.awaitReactions(filter, { max: 1 })
        .then((collected) => {
            collected.map((emoji) => {
                switch (emoji._emoji.name) {
                    case '✅':
                        msg.delete()
                        canal.delete()
                        message.reply(`**\`${canal.name}\`** Deletado com sucesso!`)
                        return
                    case '❌':
                        msg.delete()
                        message.reply(`Ação finalizada com sucesso!`)
                }
            })
        })
    }
}