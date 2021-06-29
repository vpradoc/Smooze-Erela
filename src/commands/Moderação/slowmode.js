const Command = require("../../structures/Command.js");
const ClientEmbed = require('../../structures/ClientEmbed')
const Emojis = require('../../utils/Emojis')
module.exports = class SlowMode extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "slowmode";
    this.aliases = ["modolento"];
    this.category = "Moderação";
    this.description = "Comando para que eu ative o modo lento no canal!";
    this.usage = "slowmode";

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

    const slow = args[0]
    if(!slow) {
        return message.quote(`${Emojis.Errado} - Por favor coloque um número para que eu ative o slowmode! (O número será utilizado em **segundos**)\nPara desativar o SlowMode, utilize **s.slowmode off**!`)
    }

    if(slow === "off") {
        message.quote(`${Emojis.Certo} - O SlowMode foi desativado com sucesso!`)
        await message.channel.setRateLimitPerUser(0)
        return
    }

    if(isNaN(slow)) {
        return message.quote(`${Emojis.Errado} - Por favor, coloque um tempo válido!`)
    }
    message.quote(`${Emojis.Certo} - SlowMode ativo com sucesso com \`${slow}\` segundos!`)
    await message.channel.setRateLimitPerUser(slow)
    
}  
  }