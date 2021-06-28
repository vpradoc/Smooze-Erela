const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const Emojis = require('../../utils/Emojis')


module.exports = class About extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "sobremim";
    this.category = "Outros";
    this.description = "Troque a biografia do seu perfil!";
    this.usage = "sobremim <msg>";
    this.aliases = ["about", "sobre"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author ) {
    const about = args.join(" ");
   
    User.findOne({ _id: author.id }, async (err, usuario) => {

    if (!about)
      return message.quote(
        `${Emojis.Errado} - Você não inseriu o que deseja colocar no seu sobre.`
      );
    if (about.length > 300)
      return message.quote(
        `${Emojis.Errado} - O seu sobre deve ter menos de 300 caracteres.`
      );
    if (usuario.about == about)
      return message.quote(
        `${Emojis.Errado} - O sobre que você inseriu é o mesmo setado atualmente.`
      );

    message.quote(
      `${Emojis.Certo} - Seu sobre foi alterado com sucesso.`
    );
    await User.findOneAndUpdate(
      { _id: message.author.id },
      { $set: { about: about } }
    );
  })}}
