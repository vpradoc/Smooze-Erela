const malScraper = require("mal-scraper");
const translate = require("@iamtraction/google-translate");
const moment = require("moment");
const discord = require("discord.js");
const Command = require("../../structures/Command.js");

module.exports = class Anime extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "anime";
    this.aliases = [];
    this.category = "Outros";
    this.description = "Comando para que eu envie informações de um anime!";
    this.usage = "anime";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const search = args.join(" ");

    if (!search)
      return message.quote(
        `${Emojis.Errado} - Insira o nome do anime que deseja pesquisar.`
      );

    const data = await malScraper.getInfoFromName(search);

    const date = data.aired.split(" to ").map((x) => x.replace(",", ""));

    const ANIME = new discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setDescription(`**[${data.title}](${data.url})**`)
      .setThumbnail(data.picture)
      .addFields(
        {
          name: `Episódios`,
          value: data.episodes.toLocaleString(),
          inline: true,
        },
        {
          name: `Tipo do Anime`,
          value: data.type,
          inline: true,
        },
        {
          name: `Rank do Anime`,
          value: data.ranked,
          inline: true,
        },
        {
          name: `Popularidade do Anime`,
          value: data.popularity,
          inline: true,
        },
        {
          name: `Status do Anime`,
          value: data.status
            .replace("Finished Airing", "Finalizado")
            .replace("Currently Airing", "Finalizado"),
          inline: true,
        },
        {
          name: `Categoria do Anime`,
          value: data.source.replace("Manga", "Mangá"),
          inline: true,
        },
        {
          name: `Informações sobre Lançamento`,
          value:
            date[1] == "?" || !date[1]
              ? `**${moment(new Date(date[0])).format("L")}**`
              : `**${moment(new Date(date[0])).format("L")}** - **${moment(
                  new Date(date[1])
                ).format("L")}**`,
          inline: true,
        },
        {
          name: `Duração por Episódio`,
          value: data.duration.replace(". per ep", ""),
          inline: true,
        },
        {
          name: `Gêneros do Anime`,
          value: data.genres.map((x) => x).join(", "),
          inline: false,
        },
        {
          name: `Avaliação do Anime`,
          value: data.score,
          inline: true,
        }
      );

    if (data.trailer != undefined)
      ANIME.addField(
        `Trailer do Anime`,
        `**[Clique Aqui](${data.trailer})**`,
        true
      );

    message.quote(message.author, ANIME).catch((err) => {
      console.log(err);
      return message.quote(`${Emojis.Errado} - Anime não encontrado.`);
    });
  }
};
