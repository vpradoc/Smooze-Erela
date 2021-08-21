const c = require('colors')
const ClientEmbed = require('../../structures/ClientEmbed')
const Emojis = require('../../utils/Emojis')
const ms = require('ms')
module.exports = class trackStart {
    constructor(client) {
        this.client = client
    }
    async run (player, track) {

        const channel = this.client.channels.cache.get(player.textChannel);

        const embed = new ClientEmbed(track.requester)
        .setTitle(`${Emojis.CD} Iniciando:`)
        .setThumbnail(track.thumbnail)
        .setDescription(
          `**[${track.title}](${
            track.uri
          })** - [${track.requester.tag}]\n\n${Emojis.Nada}${Emojis.TV} **Canal:** \`${
            track.author
          }\`\n${Emojis.Nada}${Emojis.Tempo} **Duração:** \`${ms(
            track.duration
          )}\``
        );
      return channel.send({ embeds: [embed] });
    }
}