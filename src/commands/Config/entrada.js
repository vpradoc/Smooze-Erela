const discord = require("discord.js");
const Emojis = require("../../utils/Emojis");
const Guild = require("../../database/Schemas/Guild");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      `${Emojis.Errado} - ${message.author}, você precisa da permissão \`MANAGE_GUILD\` para executar o comando!`
    );

  Guild.findOne({ _id: message.guild.id }, async function (err, server) {
    if (args[0] == "canal") {
      let canal =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((x) => x.id == args[1]);

      if (!canal) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, por favor escolha um canal para que seja setado o sistema!`
        );
      } else if (canal.id === server.entrada.channel) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, o canal escolhido já está em uso!`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, o canal **<#${canal.id}>** receberá as mensagens de entrada apartir de agora!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "entrada.channel": canal.id } }
        );
      }
      return;
    }

    if (args[0] == "set") {
      const tipo = args[1];

      if (!tipo) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, por favor escolha um tipo de mensagem **<embed/mensagem>**.`
        );
      } else if (tipo === server.entrada.modelo) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, o tipo de mensagem escolhido já está em uso!`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, agora as mensagens de entrada serão no formato ${tipo}!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "entrada.modelo": tipo } }
        );
      }

      return;
    }

    if (args[0] == "msg") {
      let msg = args.slice(1).join(" ");

      if (!msg) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, você não inseriu nenhuma mensagem!`
        );
      } else if (msg.lenght > 100) {
        return message.chennel.send(
          `${Emojis.Errado} - ${message.author}, a mensagem escolhida é muito grande! O limite é de 100 caracteres.`
        );
      } else if (msg === server.entrada.msg) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, a mensagem escolhida já está em uso!`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, a mensagem foi alterada para \`\`\`diff\n- ${msg}\`\`\``
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "entrada.msg": msg } }
        );
      }

      return;
    }

    if (args[0] == "on") {
      if (server.entrada.status) {
        message.channel.send(
          `${Emojis.Errado} - ${message.author}, o sistema já está ativado!`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, o sistema foi \`ativado\` com sucesso!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "entrada.status": true } }
        );
      }

      return;
    }

    if (args[0] == "off") {
      if (!server.entrada.status) {
        message.channel.send(
          `${Emojis.Errado} - ${message.author}, o sistema já está desativado!`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, o sistema foi \`desativado\` com sucesso!`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "entrada.status": false } }
        );
      }

      return;
    }

    if (args[0] == "help") {
      let INFO = new discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setDescription(
          `Mensagem Definida: \`${server.entrada.msg.replace(
            "null",
            "Nenhuma"
          )}\``
        )
        .addField(
          `${Emojis.Smooze} - Informações pré-definidas:`,
          `\`\`\`{member} - Menciona o usuário\n{name} - Nome do usuário\n{total} - Total de membros do servidor\n{guild} - Nome do servidor\`\`\``
        )
        .addField(
          `Estrutura:`,
          `${Emojis.Fone} - Canal Escolhido: <#${server.entrada.channel.replace(
            "null",
            "Nenhum"
          )}>\n${Emojis.Pergunta} - Status: ${
            server.entrada.status ? "ativado" : "desativado"
          }\n${Emojis.Texto} - Tipo: ${server.entrada.modelo.replace(
            "null",
            "Nenhum"
          )}`
        )
        .setFooter(
          `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }));

      message.channel.send(INFO);

      return;
    }

    if (args[0] == "test") {
      if (!server.entrada.status) {
        message.channel.send(
          `${Emojis.Errado} - ${message.author}, o sistema está desativado! Ative-o para realizar o teste.`
        );
      } else {
        client.emit("guildMemberAdd", message.member);
        await message.channel.send(
          `${Emojis.Certo} - ${message.author}, a mensagem foi enviada no canal escolhido!`
        );
      }
      return;
    }

    let HELP = new discord.MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setAuthor(
        `${client.user.username} - Sistema de Welcome/Entrada`,
        message.guild.iconURL({ dynamic: true })
      )
      .addField(
        `${Emojis.Smooze} O Sistema se encontra: \`${
          server.entrada.status ? "Ativado" : "Desativado"
        }\``,
        `\`\`\`${server.prefix}entrada msg <Mensagem>\n${server.prefix}entrada canal <Canal>\n${server.prefix}entrada <on/off>\n${server.prefix}entrada set <Mensagem/Embed>\n${server.prefix}entrada help\n${server.prefix}entrada test\`\`\``
      )
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }));

    message.channel.send(HELP);
  });
};

exports.help = {
  name: "entrada",
  aliases: ["welcome"],
  description: "Comando para configurar a mensagem de entrada de um usuário!",
  usage: "<prefix>entrada",
  category: "Config",
};
