const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");

module.exports = class Wasted extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "wasted";
    this.aliases = [];
    this.category = "Diversão";
    this.description = "Use este comando para criar um Wasted com a foto de um(a) usuário(a)!";
    this.usage = "dados";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await Random.Wasted({ Image: Member.user.displayAvatarURL({ format: "jpg" }), Color: process.env.EMBED_COLOR});

    return message.channel.send(Data);
  }
}