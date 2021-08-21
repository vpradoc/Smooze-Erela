
const Command = require('../../structures/Command')
const Emojis = require('../../utils/Emojis')
const ClientEmbed = require('../../structures/ClientEmbed')

module.exports = class FindGuild extends Command {
    constructor(client) {
        super(client)
        this.client = client
        
    this.name = "findguild";
    this.category = "Owner";
    this.description = "Comando para que eu encontre um servidor apartir do nome/id";
    this.usage = "findguild";

    this.enabled = true;
    this.guild = true;
    }

    async run (message, args, prefix, author) {
        let owners = ["680943469228982357", "600804786492932101"];
        if (!owners.some((x) => x == message.author.id)) return;

        let guild 

        if(args[0] === "id") {
            guild = this.client.guilds.cache.get(args[1])
            
            const owner = this.client.users.cache.get(guild.ownerID)

            const Embed = new ClientEmbed(author)
            .setTitle(`Informações do servidor informado:`)
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setDescription(`${Emojis.Bussola}**  Nome:** ${guild.name}\n${Emojis.Id}**  ID:** \`${guild.id}\`\n${Emojis.Coroa}**  Dono:** ${owner.tag}\n${Emojis.Id}**  Owner ID:** \`${guild.ownerID}\`\n${Emojis.Bust}**  Membros:** ${guild.memberCount}`)

            message.reply({embeds: [Embed]})

        }
        if(args[0] === "name") {
            const name1 = args[1]
            guild = this.client.guilds.cache.find(x => x.name === name1)
            
            const owner = this.client.users.cache.get(guild.ownerID)

            const Embed = new ClientEmbed(author)
            .setTitle(`Informações do servidor informado:`)
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setDescription(`${Emojis.Bussola}**  Nome:** ${guild.name}\n${Emojis.Id}**  ID:** \`${guild.id}\`\n${Emojis.Coroa}**  Dono:** ${owner.tag}\n${Emojis.Id}**  Owner ID:** \`${guild.ownerID}\`\n${Emojis.Bust}**  Membros:** ${guild.memberCount}`)

            message.reply({embeds: [Embed]})

        }
    }
}