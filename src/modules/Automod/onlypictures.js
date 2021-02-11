// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'onlypictures',
    description: 'Deletes every incoming message that doesnt have an attachment in a channel, if set in the channel', 
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


    uniqueText: "sets only pictures",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
            if(client.onlyPictureChannels.get(message.channel.id)){
                // client.emit('deleteOnlyPicturesChannelDB', message.channel.id)
                connection.query(`DELETE FROM  s581_GUILD_CONFIG.only_pictures
                WHERE channelid = ${message.channel.id};
                 `)
                client.onlyPictureChannels.delete(message.channel.id)
                return  message.channel.send(basicEmbed(client, message, args, text, "OnlyPictures turned off!", "👍" ,"OnlyPictures for this channel has been turned off!"))
            }
            client.onlyPictureChannels.set(message.channel.id, {
                channelid: message.channel.id,
                guildid: message.guild.id
            })
            // client.emit('setOnlyPicturesChannelDB', message.channel.id.toString(), message.guild.id.toString())
            connection.query(`INSERT INTO  s581_GUILD_CONFIG.only_pictures(channelid, guildid)
            VALUES(${message.channel.id.toString()}, ${message.guild.id.toString()});
`)
            return  message.channel.send(basicEmbed(client, message, args, text, "OnlyPictures turned on!", "👍" ,"OnlyPictures for this channel has been turned on!"))
    }
}