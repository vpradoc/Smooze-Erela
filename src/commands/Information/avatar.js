const discord = require('discord.js')

exports.run = (client, message, args) => {
    
    const user = message.guild.member(
        client.users.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.author
      );
      

    const avatar = user.user.displayAvatarURL({
      dynamic: true,
      format: "jpg",
      size: 2048,
    });

    const EMBED = new discord.MessageEmbed()

      .setTitle(`${user.nickname ? user.nickname : user.username}`)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(`<:camera:797207483248410704> Clique **[aqui](${avatar})** para baixar o avatar.`)
      .setImage(avatar)
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(EMBED);
}

exports.help = {
    name: "avatar",
    aliases: ["foto"],
    description: "Comando para pegar o avatar de um usuário!",
    usage: "<prefix>avatar",
    category: "Information"
}