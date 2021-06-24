const discord = require('discord.js')
const Command = require('../../structures/Command.js')
const Emojis = require('../../utils/Emojis')
module.exports = class RenameChannel extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "renamechannel";
      this.aliases = [];
      this.category = "Moderação";
      this.description = "Comando para que eu renomeie um canal!";
      this.usage = "renamechannel";
  
      this.enabled = true;
      this.guild = true;
    }
  
    async run(message, args, prefix) {

    if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`${Emojis.Errado} - Você não tem as permissões necessárias para **RENOMEAR** canais!`)

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`${Emojis.Errado} - Eu não tenho as permissões necessárias para **RENOMEAR** canais!`)

        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) 

    if (!canal)
        return message.reply(`${Emojis.Errado} - Por favor, coloque o **ID/NOME** de um canal para ser renomeado!`)

        await message.channel.send(
            "> Escreva o nome do canal abaixo:\n> Tempo de Resposta:`1 minuto`"
          );
    
          var nome = message.channel.createMessageCollector(
            (x) => x.author.id == message.author.id,
            { time: 60000 * 2, max: 1 }
          );

          nome.on("collect", async (c) => {
            nome = c.content;
         
          canal.setName(nome)
          await message.reply(`${Emojis.Certo} - Canal renomeado com sucesso!`)
        });
        }
    }