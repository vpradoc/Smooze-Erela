const discord = require("discord.js");

module.exports = async (client) => {

  const status = [
    {
      name: `👤 Usuários: ${client.users.cache.size} `,
      type: "WATCHING"
    },
    {
      name: `🏠 Servidores: ${client.guilds.cache.size}`,
      type: "PLAYING"
    },
  ];

  client.user.setStatus("idle")

  function setMsg() {
    var randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setActivity(randomStatus.name);
  }

  client.user.setStatus("idle")

};
