const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const { loadImage, registerFont, createCanvas } = require("canvas");
registerFont("src/assets/fonts/Montserrat-Black.ttf", { family: "Montserrat" });
registerFont("src/assets/fonts/Bebas-Regular.ttf", { family: "Bebas" });
registerFont("src/assets/fonts/BebasNeue-Regular.ttf", { family: "BebasNeue" });
registerFont("src/assets/fonts/Segoe Print.ttf", { family: "Segoe Print" });
registerFont("src/assets/fonts/Segoe UI.ttf", { family: "Segoe UI" });
registerFont("src/assets/fonts/arial.ttf", { family: "Arial" });
registerFont("src/assets/fonts/Segoe UI Black.ttf", {
  family: "Segoe UI Black",
});
const Utils = require("../../utils/Util");
const Emojis = require("../../utils/Emojis");

const { MessageAttachment, Util } = require("discord.js");

module.exports = class Profile extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "profile";
    this.category = "Outros";
    this.description = "Veja seu perfil com este comando!";
    this.usage = "profile <@user>";
    this.aliases = ["perfil", "p"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author) {
    const USER =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    let flags;
    if (this.client.users.cache.get(USER.id).flags == null) flags = "";
    else
      flags = this.client.users.cache
        .get(USER.id)
        .flags.toArray()
        .join("-")
        .replace("EARLY_VERIFIED_DEVELOPER", "<:DEV:797207489178894367>")
        .replace("HOUSE_BRILLIANCE", "<:BrillianceLogo:797207475371507752>")
        .replace("VERIFIED_DEVELOPER", "")
        .replace("HOUSE_BRAVERY", "<:bravery:797207453934026772>")
        .replace("HOUSE_BALANCE", "<:balance:797207441384276008>")
        .replace("EARLY_SUPPORTER", "<:suporter:797207624339685376>")
        .replace("VERIFIED_BOT", "<:Botverificado:797207464402616360>")
        .replace("-", "")
        .replace("-", "");

    User.findOne({ _id: USER.id }, async (err, user) => {
      const canvas = createCanvas(1024, 768);
      const ctx = canvas.getContext("2d");
      if(!user) {
        return message.quote(`${Emojis.Errado} - Não tenho informações sobre este usuário!`)
      }

     
      //========================// Import Background //========================//

      const background = await loadImage("./src/assets/img/png/bg1.png");
      ctx.drawImage(background, 0, 0, 1024, 768);

      //========================// Import BreakLines //========================//

      function addBreakLines(str, max) {
        max = max + 1;
        for (let i = 0; i < str.length / max; i++) {
          str =
            str.substring(0, max * i) +
            `\n` +
            str.substring(max * i, str.length);
        }
        return str;
      }

      //========================// Texts //========================//

      // Username

      ctx.textAlign = "left";
      ctx.font = '50px "Segoe UI Black"';
      ctx.fillStyle = "rgb(253, 255, 0)";
      await Utils.renderEmoji(
        ctx,
        USER.username.length > 20
          ? USER.username.slice(0, 20) + "..."
          : USER.username,
        200,
        60
      );

      // Titles

      ctx.textAlign = "left";
      ctx.font = '37px "Bebas"';
      ctx.fillStyle = "rgb(253, 255, 252)";
      await Utils.renderEmoji(ctx, `${Emojis.Coin}Coins:`, 200, 100);

      // Coins/

      ctx.textAlign = "left";
      ctx.font = '38px "BebasNeue"';
      ctx.fillStyle = "rgb(253, 255, 0)";
      ctx.fillText(`${Utils.toAbbrev(user.coins)}`, 331, 100);

       // Casamento

      if (user.marry.has) {

      ctx.textAlign = "center";
      ctx.font = '27px "Montserrat"';
      ctx.fillStyle = "rgb(76, 48, 114)";
        const casado = this.client.users.cache.get(user.marry.user).tag
      ctx.fillText("Casado com", 530, 150);

      ctx.textAlign = "center";
      ctx.font = '27px "Segoe UI"'
      ctx.fillStyle = "rgb(76, 48, 114)";
      ctx.fillText(
          casado,
          530,
          175
        );
      }

      // Flags

      ctx.textAlign = "left";
      ctx.font = '45px "Segoe UI Black"';
      await Utils.renderEmoji(ctx, user.marry.has ? Emojis.Anel+flags.replace("-", " ") : flags.replace("-", " "), 760, 120, 15, 5);

      // Titles

      ctx.textAlign = "left";
      ctx.font = '40px "BebasNeue"';
      ctx.fillStyle = "rgb(255, 255, 0)";
      ctx.fillText("Sobre Mim:", 30, 630);

      // Sobre

      ctx.textAlign = "left";
      ctx.font = '30px "BebasNeue"';
      ctx.fillStyle = "rgb(253, 255, 252)";
      await Utils.renderEmoji(
        ctx,
        addBreakLines(
          user.about == "null"
            ? `Use ${prefix}sobremim <msg> para alterar essa mensagem!`
            : user.about,
          60
        ),
        30,
        635
      );

      //========================// Import Avatar //========================//

      ctx.arc(100, 95, 85, 0, Math.PI * 2, true);
      (ctx.lineWidth = 9), 5;
      ctx.strokeStyle = "#ffff00";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      const avatar = await loadImage(
        USER.displayAvatarURL({ format: "jpeg", size: 2048 })
      );
      ctx.drawImage(avatar, 15, 10, 175, 175);

      //========================// Create Image //========================//

      const attach = new MessageAttachment(
        canvas.toBuffer(),
        `SmoozeProfile_.png`
      );

      message.quote(attach);
    });
  }
};
