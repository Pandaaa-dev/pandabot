// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setwc',
    description: 'Sets the welcome channel', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
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
    uniqueText: "uniquetext",
    module: 'Automod',

    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
           const guildConfig = client.guilds_config.get(message.guild.id)

           if(guildConfig.welcomechannelid){
            const newConfig = {
                ...guildConfig, 
                welcomechannelid: null
            }
            client.guilds_config.set(message.guild.id, newConfig)

            connection.query(`UPDATE  customer_178208_guilddetails.guild_details
                              SET welcomechannelid = NULL
                                WHERE guildid = "${message.guild.id}";`)
            return message.channel.send(basicEmbed(client, message, args, text, `Welcome channel unset`, '😲', `Your previous welcome channel has been **unset.**\nIf you want to set a new one, use this command on the new welcome channel again.`))
           }
           if(!guildConfig.welcomechannelid){
            const newConfig = {
                ...guildConfig, 
                welcomechannelid: message.channel.id
            }
            client.guilds_config.set(message.guild.id, newConfig)

            connection.query(`UPDATE  customer_178208_guilddetails.guild_details
                              SET welcomechannelid = "${message.channel.id}"
                              WHERE guildid = "${message.guild.id}";`)
            return message.channel.send(basicEmbed(client, message, args, text, `Welcome channel set`, '😄', `This channel has been **set** as the new welcome channel. I will send my welcome messages for all the new members here!`))
           }

    }
}