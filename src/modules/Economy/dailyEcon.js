// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'dailyecon',
    description: 'Sets the daily economy number', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <number> \``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
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
    module: 'Economy',
    owner: true,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const prevConfig = client.bot_config.get('_1')
        const newConfig = {
            ...prevConfig,
            dailyEcon: +args[0]
        }
        client.bot_config.set('_1', newConfig)
        message.channel.send(basicEmbed(client, message, args, text, `Set new Daily`, `😊`, `Set new daily economy upgrade value to ${+args[0]}`))
    }
}