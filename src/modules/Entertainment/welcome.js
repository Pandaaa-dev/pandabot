// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'welcome',
    description: 'Welcome someone', 
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
    giflinks:[ 'https://i.pinimg.com/originals/b9/6f/06/b96f06f81933f49b6d24577017eb4edd.gif',
    'https://media.tenor.com/images/33ee3367675a99d39888a7ad273e0291/tenor.gif',
    'https://i.gifer.com/Q71.gif',
    'https://media.tenor.com/images/4b9b18c7aae49b108354a22a0cb615fc/tenor.gif'
        ],
    async execute( message, args, text, client){
        const thing = args[0]
        const place = args.slice(1, Infinity).join(' ')
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Welcome`, '👋', `${message.author} welcomes ${thing} to ${place}`, this.giflinks))
    }
}