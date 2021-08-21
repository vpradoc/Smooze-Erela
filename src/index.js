const { Client, Collection } = require("discord.js");
const klaw = require("klaw");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const c = require("colors");
const Emojis = require("./utils/Emojis");
class Main extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
  }

  login(token) {
    token = process.env.TOKEN;
    return super.login(token);
  }

  load(commandPath, commandName) {
    const props = new (require(`${commandPath}/${commandName}`))(this);
    props.location = commandPath;
    if (props.init) {
      props.init(this);
    }
    this.commands.set(props.name, props);
    props.aliases.forEach((aliases) => {
      this.aliases.set(aliases, props.name);
    });
    return false;
  }
}

const dbIndex = require("./database/index.js");
dbIndex.start();

const client = new Main({
  intents: 32767,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  shardCount: 2,
});

const clientID = "bb423c23d4084466bd32b10974b2fe83";
const clientSecret = "59d1dee435f74bb4abce8bd9eba08d9f";

client.music = new Manager({
  nodes: require("./client/Nodes"),
  autoPlay: true,
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
  plugins: [
    new Spotify({
      playlistLimit: undefined,
      albumLimit: undefined,
      clientID,
      clientSecret,
    }),
  ],
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const guild = newState.guild;
  const user = newState.member;
  const player = client.music.players.get(guild.id);

  if (
    !newState.channelID &&
    user.id !== client.user.id &&
    player &&
    player.voiceChannel === oldState.channelID
  ) {
    if (oldState.channel.members.filter((c) => !c.user.bot).size === 0) {
      player.pause(true);

      client.channels.cache
        .get(player.textChannel)
        .send(
          `${Emojis.Microfone} |  Vou sair do canal em **2 minutos** caso fique sozinho!`
        );

      setTimeout(() => {
        if (!player) return;

        if (oldState.channel.members.filter((c) => !c.user.bot).size > 0)
          return;

        player.destroy();

        return client.channels.cache
          .get(player.textChannel)
          .send(`${Emojis.Fone} |  Saí do canal!`);
      }, 2 * 60000);
    }
  } else if (
    newState.channel &&
    newState.channel.members.filter((c) => !c.user.bot).size === 1 &&
    player &&
    player.voiceChannel === newState.channelID
  ) {
    player.pause(false);
  }
});

const onLoad = async () => {
  klaw("src/commands").on("data", (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response) return;
  });

  const eventFiles = await readdir("./src/client/listeningIn/");
  eventFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    const event = new (require(`./client/listeningIn/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./client/listeningIn/${file}`)];
  });
  console.log(c.blue(`[🤖] Eventos do BOT foram iniciados!`));

  const lavaEvents = await readdir(`./src/client/lavaEvents`);
  lavaEvents.forEach((file) => {
    const eventName = file.split(".")[0];
    const event = new (require(`./client/lavaEvents/${file}`))(client);
    client.music.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./client/lavaEvents/${file}`)];
  });
  console.log(c.blue(`[🎧] Eventos do LAVALINK foram iniciados!`));

  const errorEvents = await readdir(`./src/client/errorEvents`);
  errorEvents.forEach((file) => {
    const eventName = file.split(".")[0];
    const event = new (require(`./client/errorEvents/${file}`))(client);
    process.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./client/errorEvents/${file}`)];
  });
  console.log(c.blue(`[💀] Eventos para ERRO foram iniciados!`));

  client.login();
};

onLoad();
