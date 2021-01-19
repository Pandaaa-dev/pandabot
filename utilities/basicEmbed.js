const {MessageEmbed} = require('discord.js'); 

const basicEmbed = (client, message, args, text, title, titleEmoji,  desc,  thumbnailArr=null,  color=00000000,) => {
    const newColor = Math.floor(Math.random()*16777215).toString(16);
    const iconURL = message.guild.iconURL({format: 'png',    dynamic: true, size: 1024})
    const embed = new MessageEmbed()
    .setTitle(">> " +title + ` \`${titleEmoji}\``)
    .setColor(newColor)
    .setDescription(desc)
    .setThumbnail(thumbnailArr != null? thumbnailArr[Math.floor(Math.random() * thumbnailArr.length)] : null)
    .setTimestamp()
    .setFooter(`${message.guild.name} || ${client.user.username}`, iconURL );
    return embed
}

module.exports = basicEmbed