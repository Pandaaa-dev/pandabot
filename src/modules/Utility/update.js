const {MessageEmbed} = require('discord.js')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'update',
    description: 'Shows you recent updates about the bot', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name.toLowerCase()}`
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0  ,
    highValue: false,
    module: 'Utility',
 
    emoji: "\`😘\`",
    uniqueText: "pats",
        giflinks: [
                    ],
    async execute( message, args, text, client,connection){
           const prefix = client.guilds_config.get(message.guild.id).prefix
      const embed = new MessageEmbed()
      .setTitle(`**Pandaa Update 1.1.1**`)
      .setDescription(`Just added \`drink\`, \`cry\`, \`punch\`, \`summon\`, \`lurker\` commands. Hope you guys like it :) (You can check it from help) `)
      .setFooter('Update || April 23, 2021')
      .setColor(Math.floor(Math.random()*16777215).toString(16));
      message.channel.send(embed)
    }
    
}