const weather = require('weather-js');

const Discord = require('discord.js');

exports.run =  async (client, message, args) => {

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Por favor, coloque um local!')

        if(result === undefined || result.length === 0) return message.channel.send('Localização inválida!');

        var current = result[0].current;
        var location = result[0].location;

       
        
        const weatherinfo = new Discord.MessageEmbed()
        .setTitle(`:map:  Clima em \`${current.observationpoint}\``)
        .setThumbnail(current.imageURL)
        .setColor(current.temperature < 20 ? '#00BFFF' : process.env.EMBED_COLOR)
        .addField('<:marcador:852537673511600138> Fuso Horário:', `${location.timezone}`, true)
        .addField('☁️ Sensação Térmica:', `${current.feelslike}°`, true)
        .addField('🌡️ Unidade de Medida:', 'C', true)
        .addField('💦 Umidade do Ar:', `${current.humidity}%`, true)
        .addField('<:termometro:852534998430253126> Temperatura:', `${current.temperature}°`, true)
        .addField('🌪️ Ventos:', current.winddisplay.replace("East", "Leste", "West", "Oeste", "North", "Norte", "South", "Sul"), true)
        .setFooter(
            `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true })
          );


        message.channel.send(weatherinfo)
        })        
    }

exports.help = {
    name:"clima",
    aliases:["weather"],
    description: "Comando para saber informações do clima de uma cidade!",
    usage: "<prefix>clima",
    category: "Information"
}