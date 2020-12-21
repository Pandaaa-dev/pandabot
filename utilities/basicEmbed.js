const {MessageEmbed} = require('discord.js'); 

const basicEmbed = (client, message, args, text, title, color=00000000, desc, footer) => {
    const d = new Date(); 
    const h = d.getUTCHours();
    const m = d.getUTCMinutes()
    const embed = new MessageEmbed()
    .setTitle(tile)
    .setColor(color)
    .setDescription(desc)
    .setFooter(`${message.guild.name} || ${client.user.username} || ${h}:${m} today(UTC) `, client.user.avatarURL());
    return embed
}

module.exports = basicEmbed