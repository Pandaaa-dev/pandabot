// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'econint',
    description: 'Changes the economy interval', 
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
    module: 'Economy',
    owner: true,
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        
            const prevConfig = client.bot_config.get('_1')
            const newConfig = {
                ...prevConfig,
                econInterval: +args[0]
            }
            client.bot_config.set('_1', newConfig)
            message.channel.send(basicEmbed(client, message, args, text, `Economy interval changed`, `${args[0]}`, `*Set the mew economy interval to:* ${args[0]} hours(s) `))
 
    }
}