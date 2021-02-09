const {MessageEmbed} = require('discord.js')

const errorEmbed = (command, client, message, title, description) => {
    const d = new Date(); 
    const h = d.getUTCHours();
    const m = d.getUTCMinutes()
    const embed = new MessageEmbed()
  .setTitle(title)
  .setColor('#FF0000')
  .setDescription(description)
  .setTimestamp()
  .setFooter(`${message.guild.name} || ${client.user.username}`, client.user.avatarURL());

  return embed
}

module.exports = errorEmbed