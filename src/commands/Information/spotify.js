const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    const user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author;

    if (!user.presence.activities.find(f => f.name === "Spotify")) { 

        return message.channel.send(`${message.author}, este membro não está escutando nenhuma música no **Spotify** no momento, ou então está usando um status personalizado.`)
   
    } else {


    if(user.presence.activities.find(x => x.name === "Spotify")) {

      const spotify =  user.presence.activities.find(x => x.name == "Spotify")

            let trackIMG = spotify.assets.largeImageURL()
            let trackURL = `https://open.spotify.com/track/${spotify.syncID}`
            let trackName = spotify.details
            let trackAuthor = spotify.state
            let trackAlbum = spotify.assets.largeText
            let trackTIME = spotify.timestamps.end - spotify.timestamps.start
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Informações da música que o ${user.username} está ouvindo agora`, `https://cdn.discordapp.com/attachments/750068088740905092/787751821795655690/408668371039682560.png`)
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(`${trackIMG}`)
            .setTimestamp()
            .addField('<:fone:798180146745442314> Música: ', `${trackName}`, true)
            .addField('<:disco:797207521298612284> Álbum:', `${trackAlbum}`, true)
            .addField('<:microfone:797207572808466452> Autor: ', `${trackAuthor}`, false)
            .addField('<:spotify:797207602513575967> Ouça no Spotify: ', `Clique **[aqui](${trackURL})** para escutar junto!`, false)
            .setFooter(`Pedido por ${message.author.username}`, message.author.avatarURL())

            message.channel.send(embed);
    } 
    }}
exports.help = {
    name: "spotify",
    aliases: ['spotify', 'sptf'],
    description: "Comando para saber informações da música de um usuário!",
    usage: "<prefix>spotify",
    category: "Information"
}