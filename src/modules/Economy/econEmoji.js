// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'econemoji',
    description: 'Sets a new Economy Emoji', 
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
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const prevConfig = client.bot_config.get('_1')
        const newConfig = {
            ...prevConfig,
            emoji: args[0]
        }
        client.bot_config.set('_1', newConfig)
        message.channel.send(basicEmbed(client, message, args, text, `Economy emoji changed`, `${args[0]}`, `*Set the mew economy emoji to:* ${args[0]} `))
    }
}