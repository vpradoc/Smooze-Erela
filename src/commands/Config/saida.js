const discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild");

exports.run = (client, message, args) => {
  Guild.findOne({ _id: message.guild.id }, async function (err, server) {

    if(!message.author.hasPermission("MANAGE_GUILD")) return message.channel.send(`${message.author}, você precisa da permissão \`MANAGE_GUILD\` para executar o comando!`)

    if (args[0] == "canal") {
      let canal =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((x) => x.id == args[1]);

      if (!canal) {
        return message.channel.send(
          `${message.author}, por favor escolha um canal para que seja setado o sistema!`
        );
      } else if (canal.id === server.saida.channel) {
        return message.channel.send(
          `${message.author}, o canal escolhido já está em uso!`
        );
      } else {
        message.channel.send(
          `${message.author}, o canal **<#${canal.id}>** receberá as mensagens de saida apartir de agora!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "saida.channel": canal.id } }
        );
      }
      return;
    }

    if (args[0] == "msg") {
      let msg = args.slice(1).join(" ");

      if (!msg) {
        return message.channel.send(
          `${message.author}, você não inseriu nenhuma mensagem!`
        );
      } else if (msg.lenght > 100) {
        return message.chennel.send(
          `${message.author}, a mensagem escolhida é muito grande! O limite é de 100 caracteres.`
        );
      } else if (msg === server.saida.msg) {
        return message.channel.send(
          `${message.author}, a mensagem escolhida já está em uso!`
        );
      } else {
        message.channel.send(
          `${message.author}, a mensagem foi alterada para \`\`\`diff\n- ${msg}\`\`\``
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "saida.msg": msg } }
        );
      }

      return;
    }

    if (args[0] == "on") {
      if (server.saida.status) {
        message.channel.send(`${message.author}, o sistema já está ativado!`);
      } else {
        message.channel.send(
          `${message.author}, o sistema foi ativado com sucesso!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "saida.status": true } }
        );
      }

      return;
    }

    if (args[0] == "off") {
      if (!server.saida.status) {
        message.channel.send(
          `${message.author}, o sistema já está desativado!`
        );
      } else {
        message.channel.send(
          `${message.author}, o sistema foi desativado com sucesso!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "saida.status": false } }
        );
      }

      return;
    }

    let INFO = new discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setDescription(
        `**Adicionais:**\nPara inserir somente o nome utilize **{name}**\nPara inserir o total de membros do servidor, use **{total}**`
      )
      .setAuthor(
        `${message.guild.name} - Saida`,
        message.guild.iconURL({ dynamic: true })
      )
      .addFields(
        {
          name: "Canal Escolhido:",
          value:
            server.saida.channel == "null"
              ? "Nenhum"
              : `<#${server.saida.channel}>`,
        },
        {
          name: "Mensagem:",
          value:
            server.saida.msg == "null"
              ? "Nenhuma mensagem"
              : `\`\`\`diff\n- ${server.saida.msg}\`\`\``,
        },
        {
          name: "Status do Sistema:",
          value: `No momento o sistema se encontra **${
            server.saida.status ? "ativado" : "desativado"
          }**`,
        }
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }));

    message.channel.send(INFO);
  });
};

exports.help = {
  name: "saida",
  aliases: ["exit", "byebye"],
};
