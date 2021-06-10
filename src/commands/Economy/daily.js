const User = require('../../database/Schemas/User')
const moment = require('moment')
const mongoose = require('mongoose')
require('moment-duration-format');

exports.run = async(client, message, args) => {

    User.findOne({_id: message.author.id}, async function(err, user){

        let cooldown = 4.32e7
        let coins = Math.floor(Math.random() * 100)
        let daily = user.daily
        let atual = user.coins

        if(daily !== null && cooldown - (Date.now() - daily) > 0) {
            let time = cooldown - (Date.now() - daily) 
            
            return message.channel.send(`Você deve esperar **${moment.duration(time).format("h [Horas,] m [Minutos] e s [Segundos]")}** para resgatar seu prêmio diário novamente`)

        } else {
            message.channel.send(`${message.author}, você resgatou seu prêmio diário de hoje e conseguiu **${coins}** coins. \nAgora você possuí **${atual + coins}** coins em sua conta!`)
            await User.findOneAndUpdate({_id: message.author.id}, {$set: {coins: coins + atual, daily: Date.now()}})
        }

    })

}
exports.help = {
    name: "daily",
    aliases:["diario"]
}