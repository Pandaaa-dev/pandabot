// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'simp',
    description: 'Simp for a user', 
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
        'https://i.pinimg.com/originals/81/fd/f2/81fdf219ef42c1508799f27c1e5589ed.gif',
        'https://media.tenor.com/images/5e86f561caad988705c9a5e546a912c6/tenor.gif',
        'https://thumbs.gfycat.com/PaleCreativeCatfish-small.gif',
        'https://media.tenor.com/images/166c102c138883ed19910cf117a5c9db/tenor.gif'
        ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Simp`, '😍', `${message.author} simps for ${text}`, this.giflinks))
    }
}