const discord = require('discord.js')

module.exports = async(client) => {

    const status = [
        {
        name: `👤 Usuários: ${client.users.cache.size} `
    },
    {
        name: `🏠 Servidores: ${client.guilds.cache.size}`
    
    }
    ]

    function setStatus() {
        var randomStatus = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(randomStatus.name)
    }
    
    client.user.setStatus('dnd')
    setStatus()
    setInterval(() => {
        setStatus()
    }, 10 * 1000);
}