const weather = require("weather-js");
const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

module.exports = class Clima extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "clima";
    this.aliases = ["tempo"];
    this.category = "Informação"
    this.description =
      "Comando para que eu envie informações do clima de uma cidade!";
    this.usage = "clima <cidade>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    weather.find(
      { search: args.join(" "), degreeType: "C" },
      function (error, result) {
        // 'C' can be changed to 'F' for farneheit results
        if (error) return;
        if (!args[0])
          return message.quote("Por favor, coloque um local!");

        if (result === undefined || result.length === 0)
          return message.quote("Localização inválida!");

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
          .setTitle(`:map:  Clima em \`${current.observationpoint}\``)
          .setThumbnail(current.imageURL)
          .setColor(
            current.temperature < 20 ? "#00BFFF" : process.env.EMBED_COLOR
          )
          .addField(
            "<:marcador:852537673511600138> Fuso Horário:",
            `${location.timezone}`,
            true
          )
          .addField("☁️ Sensação Térmica:", `${current.feelslike}°`, true)
          .addField("🌡️ Unidade de Medida:", "Celsius", true)
          .addField("💦 Umidade do Ar:", `${current.humidity}%`, true)
          .addField(
            "<:termometro:852534998430253126> Temperatura:",
            `${current.temperature}°`,
            true
          )
          .addField(
            "🌪️ Ventos:",
            current.winddisplay.replace(
              "East",
              "Leste",
              "West",
              "Oeste",
              "North",
              "Norte",
              "South",
              "Sul"
            ),
            true
          )
          .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.quote(weatherinfo);
      }
    );
  }
};
