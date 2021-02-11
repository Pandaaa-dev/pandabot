// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'ping',
    description: 'Shows the ping', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        // const multiple = `\`${ping}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
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
    module: 'Utility',
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
         message.channel.send(basicEmbed(client, message, args, text, `Ping!`, '🏓', `**Latency for the bot is** \`${Date.now() - message.createdTimestamp}\`. \n **Server latency is** \`${client.ws.ping}\` \n\n *Requested by ${message.author.username}*`))
    }
}