// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nopictures',
    description: 'Deletes every message that contains a picture if set in a channel', 
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
    uniqueText: "set no picture for",
    module: 'Automod',


    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
        console.log(message.channel.id)
        if(args.length == 0){
            if(client.noPictureChannels.get(message.channel.id)){
                message.channel.send(basicEmbed(client, message, args, text, "NoPictures turned off!", "👍" ,"NoPictures for this channel has been turned off!"))
                client.noPictureChannels.delete(message.channel.id)
                 connection.query(`DELETE FROM  s581_GUILD_CONFIG.no_pictures
                                   WHERE channelid = ${message.channel.id};`)
                return
            }

            connection.query(`INSERT INTO  s581_GUILD_CONFIG.no_pictures(channelid, guildid)
            VALUES(${message.channel.id}, ${message.guild.id});`)

            client.noPictureChannels.set(message.channel.id, {
                channelid: message.channel.id,
                guildid: message.guild.id
            })
            message.channel.send(basicEmbed(client, message, args, text, "NoPictures set!", "👍" ,"No user with their highest role below me will be able to send pictures in this channel now."))
            }
        }   
}