// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'pity',
    description: 'Pity someone/something', 
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
       ' https://media.tenor.com/images/26bebe73643db5dcd4f1b282736f10e1/tenor.gif',
        'https://media.tenor.com/images/3368a542ef94e3ecc0821585afa96a8a/tenor.gif',
        'https://media.tenor.com/images/19089cd2b4970740debff2cdfc43329a/tenor.gif',
        'https://i.gifer.com/origin/3c/3cd783943c2fdb0acc6f5c00e78efe30_w200.gif'
        
        
    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Pity`, '😔', `${message.author} pities ${text}`, this.giflinks))
    }
}