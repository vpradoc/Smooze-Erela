const discord = require("discord.js");

module.exports = async (client) => {

  const status = [
    {
      name: `${client.users.cache.size} usuários!`,
    },
    {
      name: `${client.guilds.cache.size} servidores!`,
    },
  ];
  setInterval(() => {
    var randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setActivity(randomStatus.name);
  }, 10 * 1000);

  client.user.setStatus("idle");
}

