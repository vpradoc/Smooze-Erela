const { MessageAttachment, Util } = require("discord.js")
const fetch = require("node-fetch");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command.js");
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

module.exports = class Ship extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ship";
    this.aliases = [];
    this.category = "Diversão";
    this.description = "Comando para calcular se aquele casal daria certo!";
    this.usage = "ship";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    const porcentagem = Math.floor(Math.random() * 100);
    const User1 =
      this.client.users.cache.get(args[0]) ||
      message.mentions.members.first() ||
      message.author;
    const User2 =
      this.client.users.cache.get(args[1]) ||
      message.mentions.members.first(-1) || this.client.user

    const canvas = createCanvas(384, 128);
    const ctx = canvas.getContext("2d");
    if (!User2) {
      return message.quote(`${Emojis.Errado} - Por favor, escolha + alguém!`);
    }
    //========================// Import Background //========================//

    const background = await loadImage("./src/assets/img/png/ship.png");
    ctx.drawImage(background, 0, 0, 384, 128);

    //========================// Import Coração //========================//

    ctx.textAlign = "left";
    ctx.font = '100px "Segoe UI Black"';
    await Utils.renderEmoji(ctx, Emojis.Coração, 100, 100, 100, 100);


    //========================// Import Avatar //========================//

    const avatar = await loadImage(
        User1.displayAvatarURL({ format: "jpeg", size: 2048 })
      );
      ctx.drawImage(avatar, 15, 10, 100, 100);

      const avatar1 = await loadImage(
        User2.displayAvatarURL({ format: "jpeg", size: 2048 })
      );
      ctx.drawImage(avatar1, 25, 30, 100, 100);


    //========================// Create Image //========================//

    const attach = new MessageAttachment(
        canvas.toBuffer(),
        `SmoozeShip_.png`
      );

      message.quote(attach);
  }
};
