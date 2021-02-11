// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'bonk',
    description: 'Bonk someone', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <...text>\`\n*(... means multiple words can be used here)*`
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
        'https://media1.tenor.com/images/5a4751a370ea2eddd6bcbb1cfe2db5f3/tenor.gif?itemid=15721630',
        'https://media1.tenor.com/images/c79b8ac68d7ccdcd7109724c911c2e3b/tenor.gif?itemid=15454732',
        'https://media.tenor.com/images/45d42e2cac7fa8c03d1a25a7020bbc66/tenor.gif'
                 ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Bonk`, '🦯', `${message.author} bonks ${text}`, this.giflinks))
    }
}