const Discord = require('discord.js');
const mongoose = require('mongoose')
const User = require('../../database/Schemas/User')
const Emojis = require('../../utils/Emojis')

exports.run = async (client, message, args) => {
  
    const result = Math.floor(Math.random() *6)
    
    message.channel.send(`${Emojis.Dado} - ${message.author}, você jogou os dados e obteve como resultado o número **${result}**`)
}

exports.help = {
  name: "dados",
  aliases: [],
  description: "Comando para jogar os dados!",
  usage: "<prefix>dados",
  category: "Fun",
  
}