const Command = require("../../structures/Command.js");
const User = require("../../database/Schemas/User");
const Emojis = require("../../utils/Emojis.js");
const path = require('path')
module.exports = class Blacklist extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "reload";
    this.category = "Owner";
    this.description = "Reinicia um comando!";
    this.usage = "reload <Comando>";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    if (!args[0])
      return message.quote(
        `${Emojis.Errado} - Você precisa inserir um comando para dar reload.`
      );
    const cmd =
      this.client.commands.get(args[0]) ||
      this.client.commands.get(this.client.aliases.get(args[0]));
    if (!cmd)
      return message.quote(
        `${Emojis.Errado} - Você precisa inserir um comando para dar reload.`
      );
    const cmdname = cmd.name;
    const cmdFile = path.parse(`../../commands/${cmd.category}/${cmdname}.js`);
    if (!cmdFile.ext || cmdFile.ext !== ".js")
      return message.quote(
        `${Emojis.Errado} - Isso não é um comando.`
      );
    await this.client.commands.delete(cmdname);
    const reload = async (commandPath, commandName) => {
      let props = new (require(`${commandPath}/${commandName}`))(this);
      delete require.cache[require.resolve(`${commandPath}/${commandName}`)];

      this.client.commands.set(props.name, props);
    };
    const response = reload(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response)
      return message.quote(
        `${Emojis.Certo} -  O comando **${cmdname}** foi recarregado com sucesso.`
      );
  }
};
