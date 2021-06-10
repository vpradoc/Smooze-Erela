exports.run = (client, message, args) => {
    message.channel.send(`Ping do BOT **${client.ws.ping}**`)
}

exports.help = {
    name: "ping",
    aliases: ["pong"]
}