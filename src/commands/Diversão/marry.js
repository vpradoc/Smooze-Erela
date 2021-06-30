const Discord = require("discord.js");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");
const User = require("../../database/Schemas/User");


module.exports = class Marry extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "marry";
    this.aliases = ["casar"];
    this.category = "Diversão";
    this.description = "Comando para casar com um(a) usuário(a)!";
    this.usage = "marry <user>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.members.first();

      const doc = await User.findOne({
        _id: message.author.id,
      });

      
    if (!user) {
      message.quote(
        `${Emojis.Errado} - Você deve escolher um(a) usuário(a) para casar-se!`
      );
    } else if (user.id === message.author.id) {
      message.quote(
        `${Emojis.Errado} - Você não pode casar com sí mesmo!`
      );
    } else if(user.id === this.client.id) {
        message.quote(
            `${Emojis.Errado} - Você não pode se casar comigo!`
          );
    } else if(doc.marry.has) {
        message.quote(
            `${Emojis.Errado} - Você já se encontra comprometido(a)!`
        )
    }

    const target = await User.findOne({ _id: user.id });

    if (target.marry.has)
      return message.quote(
        `${
          Emojis.Errado
        } - O(a) membro(a) já está casado(a) com o(a) **\`${taraget.marry.user
          .then((x) => x.tag)}\`**.`
      );
    
      message.channel
      .send(`${Emojis.Anel} - ${user}, você deseja se casar com o(a) ${message.author}?`)
      .then(async (msg) => {
        for (let emoji of ['855890757873303572', '855890773827518466']) await msg.react(emoji);
    
        msg
          .awaitReactions(
            (reaction, member) =>
              member.id === user.id &&
              ['855890757873303572', '855890773827518466'].includes(reaction.emoji.id),
            { max: 1 }
          )
          .then(async (collected) => {
            if (collected.first().emoji.id === '855890757873303572') {
              message.quote(
                `${Emojis.Anel} - ${message.author}, o(a) aceitou seu pedido de casamento, parabéns!`
              );

              await User.findOneAndUpdate(
                { _id: message.author.id },
                {
                  $set: {
                    "marry.user": user.id,
                    "marry.has": true,
                    "marry.time": Date.now(),
                  },
                }
              );
              await User.findOneAndUpdate(
                { _id: user.id },
                {
                  $set: {
                    "marry.user": message.author.id,
                    "marry.has": true,
                    "marry.time": Date.now(),
                  },
                }
              );

              return msg.delete();
            }

            if (collected.first().emoji.id === '855890773827518466') {
              msg.delete();

              return message.channel.send(
                `${Emojis.Flushed} - ${user}, o(a) recusou seu pedido de casamento!`
              );
            }
          });
      });
  }
};
