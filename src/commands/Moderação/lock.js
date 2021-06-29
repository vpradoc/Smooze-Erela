const Command = require("../../structures/Command.js");
const ClientEmbed = require('../../structures/ClientEmbed')
const Emojis = require('../../utils/Emojis')
module.exports = class GuildBanner extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "lock";
    this.aliases = ["lockchannel"];
    this.category = "Moderação";
    this.description = "Comando para que eu bloqueie o canal!";
    this.usage = "lock";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix, author) {

    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.quote(`${Emojis.Errado} - Você não tem a permissão (\`MANAGE_CHANNELS\`) necessária!`)
    }
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        return message.quote(`${Emojis.Errado} - Eu não tenho a permissão para modificar canais!`)
}

    message.quote(`${Emojis.Certo} - Canal bloqueado com sucesso!`)
    await message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false })
    
}  
  }