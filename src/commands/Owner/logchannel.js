const Command = require('../../structures/Command')
const ClientS = require('../../database/Schemas/Client')
const ClientEmbed = require('../../structures/ClientEmbed')
const Emojis = require('../../utils/Emojis')
const Client = require('../../database/Schemas/Client')

module.exports = class LogChannel extends Command {
    constructor(client) {
        super(client)
    this.client = client
    this.name = "logchannel"
    this.category = "Owner"
    this.description = "Comando para setar o canal de logs do BOT!"
    this.aliases = ["logc"]

    this.guildOnly = true
    this.enabled = true
}

async run(message, args, prefix, author) {
    if (message.author.id !== "680943469228982357") return

    const canal = this.client.channels.cache.get(args[1])

    ClientS.findOne({_id: this.client.user.id}, async (err, cliente) => {

    if(args[0] === "set") {

        message.reply(`${Emojis.Certo} **|** O canal ${canal} foi escolhido para receber os logs do bot!`)
        await ClientS.findOneAndUpdate(
            {_id: this.client.user.id},
            {$set: {logchannel: canal.id}}
        )
    }
    else if(args[0] === "reset") {

        message.reply(`${Emojis.Certo} **|** O canal de logs foi resetado!`)
        await ClientS.findOneAndUpdate(
            {_id: this.client.user.id},
            {$set: {logchannel: null}}
        )
    }
})
}}