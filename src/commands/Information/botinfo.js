const moment = require('moment')
const discord = require('discord.js')
const duration = require('moment-duration-format')
const os = require('os')
const Emojis = require("../../utils/Emojis");

exports.run = async (client, message, args) => {

  const inline = true
  const botAvatar = client.user.displayAvatarURL()
  const date = client.user.createdAt
  const userName = client.user.username
  const servsize = client.guilds.cache.size
  const dev = client.users.cache.get('680943469228982357')
  const uptime = moment.duration(client.uptime).format("h [horas] m [minutos] e s [segundos]").replace("minsutos", "minutos");
  const usersize = client.users.cache.size



  const embed = new discord.MessageEmbed()
    .setColor('#FFFF00')
    .setThumbnail(botAvatar)
    .setAuthor(`Smooze`, client.user.displayAvatarURL())
    .addField(`**Informações Básicas**`, `${Emojis.Coroa} Dono: **[Vinicius](https://github.com/Splitze)** | ${dev.tag} \n${Emojis.Calendario} Data da criação: **${formatDate('DD/MM/YYYY', date)}**\n👤 Usuários: **${usersize}**\n🏠 Servidores: **${servsize}**`)
    .addField(`**Informações Técnicas**`, `${Emojis.DJs} Livraria: **Discord.Js - v${discord.version}** \n${Emojis.Node} Versão do Node: **[${process.version}](https://nodejs.org/en/)**\n${Emojis.Cama} Tempo online: **${uptime}**\n${Emojis.Bateria} RAM Usada: **${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)}MB**\n${Emojis.Wifi} Ping: **${client.ws.ping}ms**\n${Emojis.Heroku} Hospedagem: **[Heroku](https://www.heroku.com/)**\n${Emojis.Linux} Sistema Operacional: **${os.platform}**`)
    .addField(`**Meu Convite**`, `**[Me coloque em seu servidor!](https://discord.com/oauth2/authorize?client_id=700681803098226778&permissions=20887631278&scope=bot)**`)
    .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );


  message.channel.send(embed)

}


function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}

exports.help = {
    name: "botinfo",
    aliases: ["binfo"],
    description: "Comando para para ver as informações do BOT dentro do servidor!",
    usage: "<prefix>botinfo",
    category: "Information"
}