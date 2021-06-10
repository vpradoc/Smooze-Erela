const Guild = require("../../database/Schemas/Guild");

exports.run = (client, message, args) => {
  Guild.findOne({ _id: message.guild.id }, async function (err, server) {
    let prefixo = args[0];

    if (!prefixo) {
      return message.channel.send(
        `${message.author}, coloque algo para que o prefixo seja alterado!`
      );
    } else if (prefixo.length > 6) {
      return message.channel.send(
        `${message.author}, o prefixo deve ter no máximo **6** dígitos!`
      );
    } else if ((prefixo == server.prefix)) {
      return message.channel.send(
        `${message.author}, o prefixo que você escolheu já está em uso!`
      );
    } else {
      message.channel.send(
        `${message.author}, o prefixo foi alterado para **${prefixo}** com sucesso!`
      );

      await Guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { prefix: prefixo }});
    }
  });
};

exports.help = {
  name: "prefix",
  aliases: ["prefixo"],
};
