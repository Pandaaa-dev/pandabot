const {MessageEmbed} = require('discord.js'); 

const loggingEmbed = (client, title, guild, message) => {
    const newColor = Math.floor(Math.random()*16777215).toString(16);
    // const iconURL = message.guild.iconURL({format: 'png',    dynamic: true, size: 1024})
    const embed = new MessageEmbed()
    .setTitle(">> " +title)
    .setColor(newColor)
    .setDescription(message)
    .setTimestamp()
    .setFooter(`${guild.name} || ${client.user.username}`, guild.iconURL() );
    return embed
}

module.exports = loggingEmbed