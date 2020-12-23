const {MessageEmbed} = require('discord.js'); 

const basicEmbed = (client, message, args, text, title, titleEmoji,  desc,  thumbnailArr=null,  color=00000000,) => {
    const d = new Date(); 
    const h = d.getUTCHours();
    const m = d.getUTCMinutes()
    const embed = new MessageEmbed()
    .setTitle(">> " +title + ` \`${titleEmoji}\``)
    .setColor(color)
    .setDescription(desc)
    .setThumbnail(thumbnailArr != null? thumbnailArr[Math.floor(Math.random() * thumbnailArr.length)] : null);
    // .setFooter(`${message.guild.name} || ${client.user.username} || ${h}:${m} today(UTC) `, client.user.avatarURL());
    return embed
}

module.exports = basicEmbed