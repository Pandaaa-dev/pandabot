// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'sinfo',
    description: 'Shows some information about the server', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    module: 'Utility',

    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const guild = message.guild
        const iconURL = message.guild.iconURL({format: 'png',    dynamic: true, size: 1024})
        const embed = new MessageEmbed()
            .setThumbnail(guild.iconURL({format: 'png'}))
            .setTitle(guild.name)
            .setFooter(`${message.guild.name} || ${client.user.username}`, iconURL )
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setTimestamp()
            .addFields([
                {name: 'Owner', value: `${guild.owner.user.tag}`},
                {name: 'Members', value: `${guild.memberCount}`, inline: true}, 
                {name: 'Channels', value: `${guild.channels.cache.array().length}`, inline: true}, 
                {name: 'Roles', value: `${guild.roles.cache.array().length}`, inline: true}, 
                {name: 'Creation Date', value: `${guild.createdAt.toLocaleDateString()}`}, 
                {name: 'Region', value: `${guild.region}`, inline: true}, 
                {name: 'Boost Level', value: `${guild.premiumTier}`, inline: true}, 
                
            ]);
            if(guild.partnered) embed.addField('Level',`${guild.premiumTier}`, true) 
            
        message.channel.send(embed)
            
    }
}