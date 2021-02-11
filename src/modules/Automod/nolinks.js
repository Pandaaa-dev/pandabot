// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nolinks',
    description: 'Sets a channel setting to delete every message that has links. Use this command on the channel where you want to set nolinks', 
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
    module: 'Automod',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
        if(client.noLinkChannels.get(message.channel.id)){
            connection.query(`DELETE FROM guild_config.no_links
            WHERE channelid = ${message.channel.id};
            `)
            client.noLinkChannels.delete(message.channel.id)
            return  message.channel.send(basicEmbed(client, message, args, text, "NoLinks turned off!", "👍" ,"NoLinks for this channel has been turned off!"))
        }
        client.noLinkChannels.set(message.channel.id, {
            channelid: message.channel.id,
            guildid: message.guild.id
        })
        connection.query(`INSERT INTO  s581_GUILD_CONFIG.no_links(channelid, guildid)
        VALUES(${message.channel.id.toString()}, ${message.guild.id.toString()});
`)
        return  message.channel.send(basicEmbed(client, message, args, text, "NoLinks turned on!", "👍" ,"NoLinks for this channel has been turned on!"))
}
}