const {MessageEmbed} = require('discord.js')

const errorEmbed = (command, client, message, title, description) => {
    // const text = arr.join( '    **OR** \n')
    const d = new Date(); 
    const h = d.getUTCHours();
    const m = d.getUTCMinutes()
    const embed = new MessageEmbed()
  .setTitle(title)
  .setColor(0000000)
  .setDescription(description)
  .setFooter(`${message.guild.name} || ${client.user.username} || ${h}:${m} today(UTC) `, client.user.avatarURL());

  return embed
}

module.exports = errorEmbed