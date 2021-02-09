// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'cheer',
    description: 'cheer at someone', 
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
    giflinks:[ 
        'https://media.tenor.com/images/3fcc1b897b5dccb2a5edda6fb0d78e59/tenor.gif', 
        'https://media.tenor.com/images/72a585a0fb17fb250c34e98524d6c6ef/tenor.gif', 
        'https://media.tenor.com/images/07fc5609a386f05853cc5e36d1efb25b/tenor.gif',        
        'https://media.tenor.com/images/07fc5609a386f05853cc5e36d1efb25b/tenor.gif'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Cheer`, '🎉', `${message.author} cheers for ${text}`, this.giflinks))
    }
}