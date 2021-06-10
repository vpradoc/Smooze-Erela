const User = require('../../database/Schemas/User')
const discord = require('discord.js')
exports.run = async(client, message, args) => {

    const pessoa =
        message.mentions.users.first() ||
        client.users.cache.get(args[0]) ||
        message.author;

    User.findOne({_id: pessoa.id}, async function(err, user) {


        let coins = user.coins
        
        if(err) {
            message.channel.send('Esta pessoa não possuí conta no meu banco!')}

        const embed = new discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`<:dinheiro:852258064957833226> Saldo Bancário:`)
        .addField(`:coin: Coins:`, `${coins}`)
        .setThumbnail(pessoa.displayAvatarURL())
        .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.channel.send(embed)

    })
}

exports.help = {
    name:"coins",
    aliases:["dinheiro"]
}