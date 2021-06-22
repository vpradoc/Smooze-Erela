const Discord = require("discord.js");
const Command = require("../../structures/Command.js");
const Emojis = require("../../utils/Emojis");

module.exports = class Spotify extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "spotify";
    this.aliases = ["sptf"];
    this.category = "Informação"
    this.description =
      "Comando para que eu envie informações da musica que um usuário está ouvindo!";
    this.usage = "spotify";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const user =
      message.mentions.users.first() ||
      this.client.users.cache.get(args[0]) ||
      message.author;

    if (!user.presence.activities.find((f) => f.name === "Spotify")) {
      return message.channel.send(
        `${message.author}, este membro não está escutando nenhuma música no **Spotify** no momento, ou então está usando um status personalizado.`
      );
    } else {
      if (user.presence.activities.find((x) => x.name === "Spotify")) {
        const spotify = user.presence.activities.find(
          (x) => x.name == "Spotify"
        );

        let trackIMG = spotify.assets.largeImageURL();
        let trackURL = `https://open.spotify.com/track/${spotify.syncID}`;
        let trackName = spotify.details;
        let trackAuthor = spotify.state;
        let trackAlbum = spotify.assets.largeText;
        let trackTIME = spotify.timestamps.end - spotify.timestamps.start;

        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `Informações da música que o ${user.username} está ouvindo agora`
          )
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(`${trackIMG}`)
          .setTimestamp()
          .addField(`${Emojis.Fone} Música: `, `${trackName}`, true)
          .addField(`${Emojis.Disco} Álbum:`, `${trackAlbum}`, true)
          .addField(`${Emojis.Microfone} Autor: `, `${trackAuthor}`, false)
          .addField(
            "<:spotify:797207602513575967> Ouça no Spotify: ",
            `Clique **[aqui](${trackURL})** para escutar junto!`,
            false
          )
          .setFooter(
            `Pedido por ${message.author.username}`,
            message.author.avatarURL()
          );

        message.channel.send(embed);
      }
    }
  }
};
