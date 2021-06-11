const discord = require('discord.js')
const moment = require('moment')
const duration = require('moment-duration-format')
const os = require('os')

exports.run = async(client, message, args) => {

    
    const uptime = moment.duration(client.uptime).format("h [horas] m [minutos] e s [segundos]").replace("minsutos", "minutos");

    const Embed = new discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle(`Informações da Hospedagem`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .addField(`<:heroku:798340915583909899> **HOST**`, `\`\`\`\n(${os.hostname})\`\`\``, false)
    .addField('<:bateria:798549136634806282> **RAM Usada**', `\`\`\`\n${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB\`\`\``, true)
    .addField(`<:linux:798341832169488415> **Sistema Operacional**`, `\`\`\`\n${os.platform}  Versão: ${os.release}\`\`\``, true)
    .addField(`**<:cama:798535883732287508> Estou acordado à**`, `\`\`\`\n${uptime}\`\`\``, true)
    .addField(`**<:wifi:797207638500442173> Ping**`, `\`\`\`\n${client.ws.ping}ms\`\`\``)
    .setTimestamp()
    .setFooter(`Pedido por ${message.author.username}`, message.author.displayAvatarURL())


    message.channel.send(Embed)



}
exports.help = {
    name: "host",
    aliases: ["uptime", "hospedagem"],
    description: "Comando para saber informações da host!",
    usage: "<prefix>host",
    category: "Owner"
}