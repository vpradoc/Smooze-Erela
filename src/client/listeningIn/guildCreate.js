const ClientS = require('../../database/Schemas/Client')
const Emojis = require('../../utils/Emojis')
const { MessageEmbed } = require('discord.js')
const { Message } = require('discord.js')

module.exports = class {
    constructor(client) {
        this.client = client
    }
    
    async run(guild) {
        try {

            const owner = this.client.users.cache.get(guild.ownerID)

            ClientS.findOne({_id: this.client.user.id}, async(err, cliente) => {
            const Embed = new MessageEmbed()
            .setTitle(`Fui adicionado em um servidor!`)
            .setColor("#008000")
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setDescription(`${Emojis.Bussola}**  Nome:** ${guild.name}\n${Emojis.Id}**  ID:** \`${guild.id}\`\n${Emojis.Coroa}**  Dono:** ${owner.tag}\n${Emojis.Id}**  Owner ID:** \`${guild.ownerID}\`\n${Emojis.Bust}**  Membros:** ${guild.memberCount}`)

            const canal = this.client.channels.cache.get(cliente.logchannel)

            canal.send({embeds: [Embed]})
            })
        } catch (err) {
            console.log(`Erro no evento GuildCreate (${err})`)
        }
        
    }
}