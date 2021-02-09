// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'fight',
    description: 'Fight someone', 
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
        'https://media.tenor.com/images/5cdcbff8c5bce802d7b65baa711f12f4/tenor.gif',

        'https://i.pinimg.com/originals/68/52/6c/68526cd551d8630339770b2c9f05177d.gif',
        'https://media0.giphy.com/media/FL2VUieM4YNKU/giphy.gif',
        'https://media.tenor.com/images/1264daa1bcfea39fe882d0c0e5c7364b/tenor.gif'
        
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Fight`, '🥊', `${message.author} wants to fight with ${text}`, this.giflinks))
    }
}