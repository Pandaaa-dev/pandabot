// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'punch',
    description: 'Punch Someone', 
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
    giflinks: [ 
        "https://i.pinimg.com/originals/d7/c3/0e/d7c30e46a937aaade4d7bc20eb09339b.gif",
        "https://i.pinimg.com/originals/8d/50/60/8d50607e59db86b5afcc21304194ba57.gif",
        "https://i.pinimg.com/originals/8d/50/60/8d50607e59db86b5afcc21304194ba57.gif",
        "https://i.pinimg.com/originals/f3/ec/8c/f3ec8c256cb22279c14bfdc48c92e5ab.gif"
    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Punch`, '👊', `${message.author} punches ${text}`, this.giflinks))
    }
}
