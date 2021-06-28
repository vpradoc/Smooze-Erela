const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const User = require('../../database/Schemas/User')
module.exports = class Divorce extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "divorce";
    this.category = "Diversão";
    this.description = "Comando para se divorciar!";
    this.usage = "divorce";
    this.aliases = ["divorcio", "divorciar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author ) {
    const doc = await User.findOne({
      _id: message.author.id,
    });

    const par = this.client.users.cache.get(doc.marry.user).tag

    if (!doc.marry.has)
      return message.quote(`${Emojis.Errado} - Você não está casado!`);

    message.channel
      .send(
        `${
          message.author
        }, você deve divorciar do(a) **\`${par}\`**?`
      )
      .then(async (msg) => {
        for (let emoji of ['855890757873303572', '855890773827518466']) await msg.react(emoji);

        msg
          .awaitReactions(
            (reaction, member) =>
              member.id === message.author.id &&
              ['855890757873303572', '855890773827518466'].includes(reaction.emoji.id),
            { max: 1 }
          )
          .then(async (collected) => {
            if (collected.first().emoji.id === '855890757873303572') {
              message.quote(
                `${Emojis.Certo} - Você se divorciou com sucesso.`
              );

              await User.findOneAndUpdate(
                { _id: message.author.id },
                {
                  $set: {
                    "marry.user": "null",
                    "marry.has": false,
                    "marry.time": 0,
                  },
                }
              );
              await User.findOneAndUpdate(
                { _id: doc.marry.user },
                {
                  $set: {
                    "marry.user": "null",
                    "marry.has": false,
                    "marry.time": 0,
                  },
                }
              );

              return msg.delete();
            }

            if (collected.first().emoji.id === '855890773827518466') {
              msg.delete();

              return message.quote(
                `${Emojis.Certo} - Divorcio cancelado!`
              );
            }
          });
      });
  }
};