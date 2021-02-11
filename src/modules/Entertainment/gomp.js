// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'gomp',
    description: 'Gomp someone', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <...text>\`\n*(... means multiple words can be used here)*`
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
        'https://media.tenor.com/images/925b99e9d502a69ff470a0418156b9e5/tenor.gif',
        'https://media.tenor.com/images/05de333b038141f6b8208c7ce8f8613c/tenor.gif'
        
          ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Gomp`, '🍴', `${message.author} gomps on ${text}`, this.giflinks))
    }
}