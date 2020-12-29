// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'onlypictures',
    description: 'sets a channel to only have pictures', 
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
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "sets only pictures",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
            if(client.onlyPictureChannels.get(message.channel.id)){
                client.emit('deleteOnlyPicturesChannelDB', message.channel.id)
                client.onlyPictureChannels.delete(message.channel.id)
                return  message.channel.send(basicEmbed(client, message, args, text, "OnlyPictures turned off!", "👍" ,"OnlyPictures for this channel has been turned off!"))
            }
            client.onlyPictureChannels.set(message.channel.id, {
                channelid: message.channel.id,
                guildid: message.guild.id
            })
            client.emit('setOnlyPicturesChannelDB', message.channel.id.toString(), message.guild.id.toString())
            return  message.channel.send(basicEmbed(client, message, args, text, "OnlyPictures turned on!", "👍" ,"OnlyPictures for this channel has been turned on!"))
    }
}