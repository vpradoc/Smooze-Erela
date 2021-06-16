const discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild");

module.exports = (client, member) => {

    let guild = member.guild;

    Guild.findOne({ _id: guild.id }, async function (err, server) {

        if(server.entrada.status) {
            let canal = client.channels.cache.get(server.entrada.channel)

            

                if(server.entrada.modelo === "embed") {
                    let embed = new discord.MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setTitle(`${server.entrada.embedtitulo.replace(/{member}/g, `<@${member.id}>`)
                    .replace(/{name}/g, `${member.user.username}`)
                    .replace(/{total}/g, guild.memberCount)
                    .replace(/{guild}/g, guild.name)}`)
                    if(server.entrada.embedavatar === true ) embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                    if(server.entrada.embedimage !== "null") embed.setImage(server.entrada.embedimage)
                    .setDescription(`${server.entrada.embeddescription.replace(/{member}/g, `<@${member.id}>`)
                    .replace(/{name}/g, `${member.user.username}`)
                    .replace(/{total}/g, guild.memberCount)
                    .replace(/{quebra}/g, `\n`)
                    .replace(/{guild}/g, guild.name)}`)
                
                    canal.send(`<@${member.id}>`).then(m => m.edit(embed))
                }
                
                else {
                canal.send(server.entrada.msg
                .replace(/{member}/g, `<@${member.id}>`)
                .replace(/{name}/g, `${member.user.username}`)
                .replace(/{total}/g, guild.memberCount)
                .replace(/{quebra}/g, `\n`)
                .replace(/{guild}/g, guild.name))
            }}

    })
}
