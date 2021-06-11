exports.run = (client, message, args) => {
    message.channel.send(`Ping do BOT **${client.ws.ping}**`)
}

exports.help = {
    name: "ping",
    aliases: ["pong"],
    description: "Comando para saber informações do pingd de um usuário!",
    usage: "<prefix>ping",
    category: "Information"
}