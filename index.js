require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const logger = require("./src/utils/logger.js")

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const modules = ["Information", "Config", "Economy", "Fun", "Miscellaneous", "Owner"]
const fs = require('fs')
const dbIndex = require('./src/database/index.js')
dbIndex.start()
const { eventNames } = require('cluster')

modules.forEach((x) => {
    fs.readdir(`./src/commands/${x}/`, (err, files) => {
        if (err) return logger.error(err)
        logger.sucess(`Comandos carregados na pasta: ${x} (${files.length})`)


    files.forEach((f) => {
        const props = require(`./src/commands/${x}/${f}`)
        client.commands.set(props.help.name, props)
        props.help.aliases.forEach((alias) => {
            client.aliases.set(alias, props.help.name)
        })
        })
    })
})

fs.readdir("./src/client/events/", (err, files) => {
    if(err) return logger.error(err)
    files.forEach((file) => {
        const event = require(`./src/client/events/${file}`)
        let eventName = file.split(".") [0]
        client.on(eventName, event.bind(null, client))
        delete require.cache[(require.resolve(`./src/client/events/${file}`))]
        logger.sucess(`Evento carregado: ${eventName}`)
    })
})

client.login(process.env.TOKEN).then(() => {
    logger.sucess(`Bot iniciado!`)
})