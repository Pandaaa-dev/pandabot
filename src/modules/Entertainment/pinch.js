// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'pinch',
    description: 'Pinch a user', 
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
    maxArgs: Infinity,
    highValue: false, 
    module: 'Entertainment',

    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        'https://media.tenor.com/images/51f4d76c09ba90f630672e3b8491e691/tenor.gif',
        'https://i.pinimg.com/originals/55/d3/10/55d310ef9bde839a46d9bb27c60cd602.gif',
        'https://i.imgur.com/gXco1TN.gif',
        'https://media4.giphy.com/media/kGW3MAYxskZUyMVNfl/giphy.gif'

        ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Pinch`, '🤏', `${message.author} pinches ${text}`, this.giflinks))
    }
}