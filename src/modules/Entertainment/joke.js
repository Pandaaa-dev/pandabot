// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
module.exports = {
    name: 'joke',
    description: 'Returns a joke', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${joke}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${joke}${this.name.toLowerCase()} @person1 @person2  %reason\` `
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
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
    }
}