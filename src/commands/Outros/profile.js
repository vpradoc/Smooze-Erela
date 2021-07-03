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
const moment = require("moment");
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


      if (!user.marry.has) {

      const canvas = createCanvas(700, 1200);
      const ctx = canvas.getContext("2d");
      if(!user) {
        return message.quote(`${Emojis.Errado} - Não tenho informações sobre este usuário!`)
      }

     
      //========================// Import Background //========================//

      const background = await loadImage("./src/assets/img/png/profile.png");
      ctx.drawImage(background, 0, 0, 700, 1200);

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
      ctx.font = '60px "Segoe UI Black"';
      ctx.fillStyle = "rgb(32, 34, 37)"

      await Utils.renderEmoji(
        ctx,
        USER.username.length > 13
          ? USER.username.slice(0, 13)+"..."
          : USER.username,
          270, 317
      );

      // Identifier

      ctx.textAlign = "left";
      ctx.font = '55px "Bebas"';
      ctx.fillStyle = "rgb(86, 86, 87)";
      await Utils.renderEmoji(ctx, `#${USER.discriminator}`, 580, 390);

      // Flags

      ctx.textAlign = "left";
      ctx.font = '45px "Segoe UI Black"';
      await Utils.renderEmoji(ctx, user.marry.has ? Emojis.Anel+flags.replace("-", " ") : flags.replace("-", " "), 270, 390, 0, 0);


      // Titles

      ctx.textAlign = "left";
      ctx.font = '50px "BebasNeue"';
      ctx.fillStyle = "rgb(142, 142, 142)";
      ctx.fillText("Sobre Mim:", 68, 840);

      // Sobre

      ctx.textAlign = "left";
      ctx.font = '40px "BebasNeue"';
      ctx.fillStyle = "rgb(253, 255, 252)";
      await Utils.renderEmoji(
        ctx,
        addBreakLines(
          user.about == "null"
            ? `O Smooze é muito legal! Sabia que usando ${prefix}sobre <msg> você pode mudar essa mensagem?!`
            : user.about,
          35
        ),
        68,
        855
      );

      //========================// Import Avatar //========================//

      ctx.arc(133, 331, 120, 0, Math.PI * 2, true);
      (ctx.lineWidth = 23), 5;
      ctx.strokeStyle = "#009cff";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      const avatar = await loadImage(
        USER.displayAvatarURL({ format: "jpeg", size: 2048 })
      );
      ctx.drawImage(avatar, 10, 205, 250, 250);

      //========================// Create Image //========================// 

      const attach = new MessageAttachment(
        canvas.toBuffer(),
        `SmoozeProfile_.png`
      );

      message.quote(attach);
    }
    






      else {

        const canvas1 = createCanvas(700, 1200);
        const ctx1 = canvas1.getContext("2d");
        if(!user) {
        return message.quote(`${Emojis.Errado} - Não tenho informações sobre este usuário!`)
      }

      const casado = this.client.users.cache.get(user.marry.user)

      const avatar1 = await loadImage(
        casado.displayAvatarURL({ format: "png", size: 2048 })
      );
      ctx1.drawImage(avatar1, 64, 510, 215, 215);
     
      //========================// Import Background //========================//

      const background = await loadImage("./src/assets/img/png/profilec.png");
      ctx1.drawImage(background, 0, 0, 700, 1200);

      // Identifier

      ctx1.textAlign = "left";
      ctx1.font = '45px "Bebas"';
      ctx1.fillStyle = "rgb(255, 255, 255)";
      await Utils.renderEmoji(ctx1, `${Emojis.Anel} Casado com:`, 285, 555);
      // Identifier

      ctx1.textAlign = "left";
      ctx1.font = '30px "Bebas"';
      ctx1.fillStyle = "rgb(255, 255, 255)";
      await Utils.renderEmoji(ctx1, `${casado.tag}`, 300, 585);

      // Identifier

      ctx1.textAlign = "left";
      ctx1.font = '30px "Bebas"';
      ctx1.fillStyle = "rgb(255, 255, 255)";
      await Utils.renderEmoji(ctx1, `${moment.duration(Date.now() - user.marry.time)
      .format("M [Meses] d [Dias] h [Horas] m [Minutos] s [Segundos]")}`, 300, 615);

      //========================// Import BreakLines //========================// 310, 542 moment
            

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

      ctx1.textAlign = "left";
      ctx1.font = '60px "Segoe UI Black"';
      ctx1.fillStyle = "rgb(32, 34, 37)"

      await Utils.renderEmoji(
        ctx1,
        USER.username.length > 13
          ? USER.username.slice(0, 13)+"..."
          : USER.username,
          270, 317
      );

      // Identifier

      ctx1.textAlign = "left";
      ctx1.font = '55px "Bebas"';
      ctx1.fillStyle = "rgb(86, 86, 87)";
      await Utils.renderEmoji(ctx1, `#${USER.discriminator}`, 580, 390);

      // Flags

      ctx1.textAlign = "left";
      ctx1.font = '45px "Segoe UI Black"';
      await Utils.renderEmoji(ctx1, user.marry.has ? Emojis.Anel+flags.replace("-", " ") : flags.replace("-", " "), 270, 390, 0, 0);


      // Titles

      ctx1.textAlign = "left";
      ctx1.font = '50px "BebasNeue"';
      ctx1.fillStyle = "rgb(142, 142, 142)";
      ctx1.fillText("Sobre Mim:", 68, 840);

      // Sobre

      ctx1.textAlign = "left";
      ctx1.font = '40px "BebasNeue"';
      ctx1.fillStyle = "rgb(253, 255, 252)";
      await Utils.renderEmoji(
        ctx1,
        addBreakLines(
          user.about == "null"
            ? `O Smooze é muito legal! Sabia que usando ${prefix}sobre <msg> você pode mudar essa mensagem?!`
            : user.about,
          35
        ),
        68,
        855
      );

      //========================// Import Avatar //========================//

      ctx1.arc(133, 331, 120, 0, Math.PI * 2, true);
      (ctx1.lineWidth = 23), 5;
      ctx1.strokeStyle = "#009cff";
      ctx1.stroke();
      ctx1.closePath();
      ctx1.clip();

      const avatar2 = await loadImage(
        USER.displayAvatarURL({ format: "jpeg", size: 2048 })
      );
      ctx1.drawImage(avatar2, 10, 205, 250, 250);

      //========================// Create Image //========================// 

      const attach = new MessageAttachment(
        canvas1.toBuffer(),
        `SmoozeProfile_.png`
      );

      message.quote(attach);





      }
  
  });
  }
};
