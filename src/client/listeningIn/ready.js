const discord = require("discord.js");

module.exports = class {
  constructor(client) {
    this.client = client
  }

async run() {
  const status = [
    {
      name: `${this.client.users.cache.size} usuários!`,
    },
    {
      name: `${this.client.guilds.cache.size} servidores!`,
    },
  ];
  setInterval(() => {
    var randomStatus = status[Math.floor(Math.random() * status.length)];
    this.client.user.setActivity(randomStatus.name);
  }, 10 * 1000);

  this.client.user.setStatus("idle");
}
}
