// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')

module.exports = {
    name: 'setverificationchannel',
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
    uniqueText: "sets the current channel as verification channel",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const prevConfig = client.guilds_config.get(message.guild.id)
            if(client.guilds_config.get(message.guild.id).verificationchannelid){
                client.emit('updateVerificationChannelToNullDB', message.guild.id)
                const newConfig = {
                    ...prevConfig,
                    verificationchannelid: null
                }
                client.guilds_config.set(message.guild.id, newConfig)
                return  message.channel.send(basicEmbed(client, message, args, text, "Verification turned off!", "👍" ,"Verification for this server has been turned off!"))
            }
            client.guilds_config.set(message.guild.id, {
                ...prevConfig, 
                verificationchannelid: message.channel.id
            })
            client.emit('setNewVerificationChannelDB', message.channel.id.toString(), message.guild.id.toString())
            return  message.channel.send(basicEmbed(client, message, args, text, "Verification turned on!", "👍" ,"Verification for this server has been turned on on this channel!"))
    }
}