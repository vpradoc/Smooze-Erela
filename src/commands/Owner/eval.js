const Command = require("../../structures/Command.js");

module.exports = class Eval extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "eval";
    this.aliases = [];
    this.category = "Owner";
    this.description = "Comando para que eu avalie algo!";
    this.usage = "eval";

    this.enabled = true;
    this.guild = true;
  }

  async run(message, args, prefix) {
    if (message.author.id !== "680943469228982357") return;
    if (!args[0]) return;

    let litchdelicia = args.join(" ");
    let litchtotoso = eval(litchdelicia);
    if (typeof litchtotoso !== "string")
      litchtotoso = require("util").inspect(litchtotoso, { depth: 0 });
    message.channel.send(
      `Entrada: \`\`\`js\n${litchdelicia}\`\`\`\n Saída: \`\`\`js\n${litchtotoso}\`\`\``
    );
  }
};
