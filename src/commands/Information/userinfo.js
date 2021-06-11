const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
  moment.locale("pt-BR");

  try {
    const user = message.guild.member(
      client.users.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.author
    );

    function Device(user) {
      if (!user.presence.clientStatus) return null;
      let devices = Object.keys(user.presence.clientStatus);

      let deviceList = devices.map((x) => {
        if (x === "desktop") return "💻 COMPUTADOR";
        else if (x === "mobile") return "📱 CELULAR";
        else return " ";
      });

      return deviceList.join(" - ");
    }
    const device = Device(user);

    let flags;
    if (client.users.cache.get(user.id).flags == null) flags = "";
    else
      flags = client.users.cache
        .get(user.id)
        .flags.toArray()
        .join("-")
        .replace("EARLY_VERIFIED_DEVELOPER", "<:DEV:797207489178894367>")
        .replace("HOUSE_BRILLIANCE", "<:BrillianceLogo:797207475371507752>")
        .replace("VERIFIED_DEVELOPER", "")
        .replace("HOUSE_BRAVERY", "<:bravery:797207453934026772>")
        .replace("HOUSE_BALANCE", "<:balance:797207441384276008>")
        .replace("EARLY_SUPPORTER", "<:suporter:797207624339685376>")
        .replace("VERIFIED_BOT", "<:Botverificado:797207464402616360>")
        .replace("-", " ")
        .replace(" - ", " ");

    const ROLES = user.roles.cache
      .filter((r) => r.id !== message.guild.id)
      .map((roles) => roles);

    let roles;
    if (!ROLES.length) roles = "Nenhum cargo no servidor!";
    else
      roles =
        ROLES.length > 10
          ? ROLES.map((r) => r)
              .slice(0, 10)
              .join(", ") + `e mais ${Number(ROLES.length - 10)} cargos`
          : ROLES.map((r) => r).join(", ");

    let presence;
    if (!user.presence.activities.length) presence = "Não está jogando nada";
    else presence = user.presence.activities.join(", ");

    const joined = `${moment(user.joinedAt).format("L")} ( ${moment(
      user.joinedAt
    )
      .startOf("day")
      .fromNow()} )`;

    const created = `${moment(client.users.cache.get(user.id).createdAt).format(
      "L"
    )} ( ${moment(client.users.cache.get(user.id).createdAt)
      .startOf("day")
      .fromNow()} )`;

    const USERINFO = new Discord.MessageEmbed()
      .setColor(message.guild.member(user.id).roles.highest.hexColor)
      .setTitle(flags + user.user.username)
      .addFields(
        {
          name: ":video_game: Jogando:",
          value: `\`\`\`diff\n- ${presence}\`\`\``,
        },
        {
          name: ":paperclip: Nome do Usuário:",
          value: user.user.tag,
          inline: true,
        },
        {
          name: ":paperclips: Nickname no Servidor:",
          value: !!user.nickname ? user.nickname : "Nenhum Nickname",
          inline: true,
        },
        {
          name: "Dispositivo:",
          value: String(device).replace("null", "Nenhum"),
        },
        { name: "ID:", value: user.id },
        {
          name: "<:calendario:798254558480433152> Conta Criada:",
          value: created,
          inline: true,
        },

        {
          name: ":birthday: Entrada no Servidor:",
          value: joined,
          inline: true,
        },
        {
          name: ":robot: É bot?",
          value: user.user.bot ? "Sim" : "Não",
          inline: true,
        },
        {
          name: `:speaking_head: Cargos no Servidor`,
          value: roles,
        }
      )
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setFooter(
        `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(USERINFO);
  } catch (err) {
    console.log(`ERRO NO COMANDO USERINFO\nERROR: ${err}`);
  }
};

exports.help = {
  name: "userinfo",
  aliases: ["uinfo", "ui"],
  description: "Comando para saber informações de um usuário!",
  usage: "<prefix>userinfo",
  category: "Information"
};
