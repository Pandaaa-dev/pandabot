// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'throw',
    description: 'Throw someone', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <...text>\`\n*(... means multiple words can be used here)*`
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
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
        'https://i.pinimg.com/originals/fa/8d/60/fa8d60e6dded250ce14fd1d0014e7d97.gif',
        'https://media.tenor.com/images/6ffcbf6631c351a9d691ad09679dec26/tenor.gif',
        'https://media4.giphy.com/media/DvMHwFYLVHlZe/200.gif',
        'https://media1.tenor.com/images/6547ca81b4ea271aac027ee1fb1f978d/tenor.gif?itemid=5348889'
          ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Throw`, '💢', `${message.author} throws ${text}`, this.giflinks))
    }
}