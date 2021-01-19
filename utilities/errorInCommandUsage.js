const {MessageEmbed} = require('discord.js')

const cmdErrorEmbed = (command, client, message, arr) => {
  console.log(arr)
    const text = arr.join( '    **OR** \n')
    const d = new Date(); 
    const h = d.getUTCHours();
    const m = d.getUTCMinutes()
    const embed = new MessageEmbed()
  .setTitle(">> Error"+" in using" +  ` ${client.guilds_config.get(message.guild.id).prefix}` + command.name)
  .setColor(0000000)
  .setDescription(text)
  .setFooter(`${message.guild.name} || ${client.user.username} || ${h}:${m} today(UTC) `, client.user.avatarURL());

  return embed
}

module.exports = cmdErrorEmbed