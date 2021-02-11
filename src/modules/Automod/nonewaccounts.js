// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nonewaccounts',
    description: 'On every member joins, it will kick the users that have an account age below the specified date.', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <number of days>\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_GUILD',
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
        connection.query(`UPDATE ${"s581_GUILD_CONFIG.guild_details"}
        SET ${"nonewaccounts"} = ${+args[0]}
        WHERE ${"guildid"} = "${message.guild.id}";
        `,)
        const newConfig = {
            ...guildconfig,
            nonewaccounts: +args[0]
        }
        
        client.guilds_config.set(guild.id, newConfig)
        await message.channel.send(basicEmbed(client, message, args, text, `Acount Age Validation Set`, '👍', `I will be kicking every user whose account age is below than ${args[0]} from now!`))
    }
}