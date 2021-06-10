const Guild = require("../../database/Schemas/Guild");

module.exports = (client, member) => {

    let guild = member.guild;

    Guild.findOne({ _id: guild.id }, async function (err, server) {

        if(server.entrada.status) {
            client.channels.cache.get(server.entrada.channel).send(server.entrada.msg
                .replace(/{member}/g, `<@${member.id}>`)
                .replace(/{name}/g, `${member.user.username}`)
                .replace(/{total}/g, guild.memberCount))
            }

    })
}
