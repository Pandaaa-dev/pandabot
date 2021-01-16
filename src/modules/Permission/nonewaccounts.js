// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nonewaccounts',
    description: 'Kicks all new accounts below selected time', 
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
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "set nonewaccounts",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
        const guild = message.guild
        const guildconfig = client.guilds_config.get(guild.id)
        client.emit('databaseUpdate', "guild_config.guild_details", "guildid", guild.id, "nonewaccounts", +args[0])
        const newConfig = {
            ...guildconfig,
            nonewaccounts: +args[0]
        }
        client.guilds_config.set(guild.id, newConfig)
    }
}