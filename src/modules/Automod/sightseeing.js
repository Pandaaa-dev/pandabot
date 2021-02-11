// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'sightseeing',
    description: 'Turns off all automoderation, logging, xp counting', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_CHANNELS',
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    module: 'Automod',


    uniqueText: "sets only pictures",
    giflinks: [ 
    ],
    async execute( message, args, text, client,connection){
        if(message.guild.owner.id !== message.author.id) return descEmbed('This is strictly a guild owner command.')
        const guildConfig = client.guilds_config.get(message.guild.id)
        if(!guildConfig) return
        if(guildConfig.sightseeing === 1){
            client.guilds_config.set(message.guild.id, {
                ...guildConfig,
                sightseeing: 0
            })
        } else if(guildConfig.sightseeing === 0){
            client.guilds_config.set(message.guild.id, {
                ...guildConfig,
                sightseeing: 1
            })
        }
        connection.query(`UPDATE TABLE s581_GUILD_CONFIG.guild_details
                        SET sightseeing = ${guildConfig.sightseeing == 1? 0 : 1}
                        WHERE guildid = ${message.guild.id}`)
    }
}