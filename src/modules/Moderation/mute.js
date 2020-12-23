// check these routes!
const { GuildMember } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'mute',
    description: 'Mutes a user', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} 5m @person %reason\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} 5m @person1 @person2  %reason\` `
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 10,
    highValue: false, 
    emoji: null,
    uniqueText: "was muted by",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute(message, args, text, client){
        const duration = args.pop().toString().toLowerCase();

        const guildConfig = client.guilds_config.get(message.guild.id)
        const muteroleid = guildConfig.muterole;
        const prefix = guildConfig.prefix;
    }
}