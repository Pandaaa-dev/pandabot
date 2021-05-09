// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')
const {OWNER} = require('../../../config.json')
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
        console.log(OWNER)
        console.log(OWNER.includes(message.author.id))
        if(message.guild.owner.id !== message.author.id && !OWNER.includes(message.author.id) ) return descEmbed('This is strictly a guild owner command.')
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

        message.channel.send(basicEmbed(client, message, args, text, `Sightseeing turned ${guildConfig.sightseeing === 1 ? " Off" : " On"}!`, guildConfig.sightseeing === 1 ? "❌" : "✔️",
            `Sightseeing has been turned ${guildConfig.sightseeing === 1 ? " Off" : " On"}. ${guildConfig.sightseeing === 1 ? "The bot will start tracking xp, economy and the foodhunt game here again!" : "The bot will not track any xp, economy, or the foodhunt game here anymore." } ` ))
        connection.query(`UPDATE customer_178208_guilddetails.guild_details
                        SET sightseeing = ${guildConfig.sightseeing === 1? 0 : 1}
                        WHERE guildid = ${message.guild.id}`)
    }
}