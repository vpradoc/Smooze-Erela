const Guild = require("../../database/Schemas/Guild");

module.exports = (client, member) => {

    let guild = member.guild;

    Guild.findOne({ _id: guild.id }, async function (err, server) {

        if(server.saida.status) {
            client.channels.cache.get(server.saida.channel).send(server.saida.msg
                .replace(/{name}/g, `${member.user.username}`)
                .replace(/{total}/g, guild.memberCount))
            }

    })
}
