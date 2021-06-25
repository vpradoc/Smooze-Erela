const discord = require('discord.js')
const Command = require('../../structures/Command.js')
const Emojis = require('../../utils/Emojis')

module.exports = class CreateChannel extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "createchannel";
      this.aliases = ['cchanel'];
      this.category = "Moderação";
      this.description = "Comando para que eu crie um canal!";
      this.usage = "createchannel";
  
      this.enabled = true;
      this.guild = true;
    }
  
    async run(message, args, prefix) {

    if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply('Você não tem as permissões necessárias para criar canais!').then(m => m.delete({ timeout: 10000 }))

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.reply('Eu não tenho as permissões necessárias para criar canais!').then(m => m.delete({ timeout: 10000 }))

    const nome = args.join(" ")

    if (!nome)
        return message.reply('Por favor, coloque um nome para o canal!').then(m => m.delete({ timeout: 10000 }))


    const Embed = new discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setThumbnail('https://cdn.discordapp.com/attachments/797207262782816339/804140377652199434/imgbot.png')
        .setTitle('Escolha um tipo de canal para ser criado!')
        .addField(`**Canal de texto**`, `Emoji: ${Emojis.Balão}`)
        .addField(`**Canal de voz**`, `Emoji: ${Emojis.Microfone}`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    const msg = await message.channel.send(Embed);

    await msg.react('855892525033062460')
    await msg.react('855895180216500234')
    const filter = (reaction, user) => (reaction.emoji.id === '855895180216500234' || reaction.emoji.id === '855892525033062460') && (user.id === message.author.id);
    msg.awaitReactions(filter, { max: 1 })
        .then((collected) => {
            collected.map((emoji) => {
                switch (emoji._emoji.id) {
                    case '855892525033062460':
                        msg.delete()
                        message.guild.channels.create(`${nome}`)
                        message.reply(`**${nome}** Criado com sucesso!`)
                        return
                    case '855895180216500234':
                        msg.delete()
                        message.guild.channels.create(`${nome}`, {
                            type: 'voice'
                        })
                        message.reply(`**${nome}** Criado com sucesso!`)
                }
            })
        })

}}