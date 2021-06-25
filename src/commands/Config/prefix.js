const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command.js");
const Emojis = require('../../utils/Emojis')
module.exports = class Prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "prefix";
    this.aliases = ["prefixo"];
    this.category = "Config";
    this.description =
      "Comando para configurar o prefixo do bot em seu servidor!";
    this.usage = "prefix";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    Guild.findOne({ _id: message.guild.id }, async (err, server) => {
      let prefixo = args[0];

      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.quote(`${Emojis.Errado} - Você não tem a permissão necessária (\`MANAGE_GUILD\`)para executar esse comando!`)
      }

      if (!prefixo) {
        return message.quote(
          `${Emojis.Errado} - Coloque algo para que o prefixo seja alterado!`
        );
      } else if (prefixo.length > 6) {
        return message.quote(
          `${Emojis.Errado} - O prefixo deve ter no máximo **6** dígitos!`
        );
      } else if (prefixo == server.prefix) {
        return message.quote(
          `${Emojis.Errado} - O prefixo que você escolheu já está em uso!`
        );
      } else {
        message.quote(
          `${Emojis.Certo} - O prefixo foi alterado para **${prefixo}** com sucesso!`
        );

        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { prefix: prefixo } }
        );
      }
    });
  }
};
