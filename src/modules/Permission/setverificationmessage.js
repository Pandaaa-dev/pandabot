// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setverificationmessage',
    description: 'sets the verification message', 
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
    maxArgs: 255,
    highValue: false, 
    emoji: null,
    uniqueText: "no",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        // const splitString = text.split('%')
        // console.log(splitString)

        // const index = splitString.indexOf("server__name")

        // splitString[index] = message.guild.name

        // console.log(splitString.join(' '))

        client.emit('setVerificationMessageDB', message.guild.id,  text);
        const prevValue = client.guilds_config.get(message.guild.id);
        client.guilds_config.set(message.guild.id, {
            ...prevValue, 
            verificationmessage: text
        })
        // console.log(client.guilds_config.get(message.guild.id))
        return message.channel.send(basicEmbed(client, message, args, text, "Set new Verification Message!", "👍", `Set new verification message to:\n ${text}`))

    }
}