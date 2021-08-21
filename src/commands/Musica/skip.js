const Command = require("../../structures/Command");
const { music } = require('erela.js')
const Emojis = require('../../utils/Emojis')
module.exports = class Skip extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "skip";
    this.category = "Musica";
    this.description = "Comando para que eu pule uma música!";
    this.usage = "skip";
    this.aliases = ["pular"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author) {
    const player = this.client.music.get(message.guild.id);
    
    if(message.guild.me.voice.channel != null) {
      if(message.member.voice.channel.id != message.guild.me.voice.channel.id === true) return message.reply(`${Emojis.Errado} **|** Você precisa estar no mesmo canal que eu estou para modificar a fila!`)
      }
      if (!player) return message.reply(`${Emojis.Errado} **|** Não estou em nenhum canal!`);
  
      const { channel } = message.member.voice;
      if (!channel) return message.reply(`${Emojis.Errado} **|** Você precisa estar em um canal!`);
      if (channel.id !== player.voiceChannel) return message.reply(`${Emojis.Errado} **|** Você precisa estar no mesmo canal que eu para modificar a fila!`);

      if (!player.queue.current) return message.reply(`${Emojis.Errado} **|** Não tem nenhuma música na fila!`)

      const { title } = player.queue.current;

      player.stop();
      return message.channel.send(`**${title}** Pulado!`). then(msg => {
        this.client.setTimeout(() => msg.delete(), 10000)
        })
  }
}
