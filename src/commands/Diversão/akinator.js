const Emojis = require("../../utils/Emojis");
const { Aki } = require("aki-api");
const discord = require("discord.js");
const akinator = new Set();
const Command = require("../../structures/Command.js");

module.exports = class Akinator extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "akinator";
    this.aliases = ["aki"];
    this.category = "Diversão";
    this.description = "Comando para jogar uma partida de akinator!";
    this.usage = "akinator";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const emojiimage = [
        Emojis.Certo,
      Emojis.Errado,
      Emojis.Pergunta,
      Emojis.Pensando,
      Emojis.Nervoso,
      Emojis.Smooze,
    ];
    const emojis = [
        "855890757873303572",
        "855890773827518466",
      "855891307511676978",
      "855891564006080604",
      "855891898081345547",
      "803618840433000488",
    ];

    if (akinator.has(message.author.id))
  return message.channel.send(
    `${message.author}, você já tem uma partida em andamento.`
  );

akinator.add(message.author.id);

message.channel
  .send(`${message.author}, estou começando sua partida.`)
  .then(async (x) => {
    // ================= Parte para iniciar o Game
    const region = "pt";
    const aki = new Aki(region);
    await aki.start();
    // ================= Parte para iniciar o Game

    const EMBED = new discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle(`${aki.currentStep + 1}ª Pergunta`)
      .setThumbnail("https://i.imgur.com/6MPgU4x.png")
      .addField(
        aki.question,
        aki.answers.map((x, f) => `${emojiimage[f]} | ${x}`).join("\n")
      );

    message.channel.send(EMBED).then(async (msg) => {
      x.delete();
      for (const emoji of emojis) await msg.react(emoji);

      const collector = msg.createReactionCollector(
        (reaction, user) =>
          emojis.includes(reaction.emoji.id) &&
          user.id === message.author.id,
        {
          time: 60000 * 10,
        }
      );

      collector
        .on("end", () => akinator.delete(message.author.id))
        .on("collect", async ({ emoji, users }) => {
          users.remove(message.author).catch(() => null);

          if (emoji.id === "803618840433000488") return collector.stop();

          await aki.step(emojis.indexOf(emoji.id));

          if (aki.progress >= 80 || aki.currentStep >= 78) {
            await aki.win();

            collector.stop();

            message.channel.send(
              new discord.MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setTitle(`Este é seu Personagem?`)
                .setDescription(
                  `> **${aki.answers[0].name}**\n\n> ${aki.answers[0].description}\n> Rank: **#${aki.answers[0].ranking}**\nResponda com **SIM** caso eu tenha acertado e com **NÃO** caso eu tenha errado.`
                )
                .setImage(aki.answers[0].absolute_picture_path)
                .setThumbnail(`https://i.imgur.com/6MPgU4x.png`)
            );

            const filter = (m) =>
              /(yes|no|y|n|sim|s)/i.test(m.content) &&
              m.author.id === message.author.id;

            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 30000,
                erros: ["time"],
              })
              .then((collected) => {
                const isWinner = /yes|y|sim|s/i.test(
                  collected.first().content
                );

                message.channel.send(
                  isWinner
                    ? `Como eu já sabia, acertei mais uma vez...`
                    : `Ok, ok você ganhou dessa vez... Nos vemos na próxima!`
                );
              })
              .catch(() => null);
          } else {
            msg.edit(
              new discord.MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setTitle(`${aki.currentStep + 1}ª Pergunta`)
                .setThumbnail(`https://i.imgur.com/6MPgU4x.png`)
                .addField(
                  aki.question,
                  aki.answers
                    .map((x, f) => `${emojiimage[f]} | ${x}`)
                    .join("\n")
                )
            );
          }
        });
    });
  });
}
  }