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
    module: 'Automod',


    uniqueText: "set nonewaccounts",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
        const guild = message.guild
        const guildconfig = client.guilds_config.get(guild.id)
        connection.query(`UPDATE ${"guild_config.guild_details"}
        SET ${"nonewaccounts"} = ${+args[0]}
        WHERE ${"guildid"} = "${message.guild.id}";
        `,)
        const newConfig = {
            ...guildconfig,
            nonewaccounts: +args[0]
        }
        client.guilds_config.set(guild.id, newConfig)
        console.log( client.guilds_config.get(guild.id))
    }
}