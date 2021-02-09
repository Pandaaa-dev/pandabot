// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'slap',
    description: 'Slap a user', 
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
        'https://media.tenor.com/images/9a2c17416b01df4363c05702a489425b/tenor.gif',
        'https://media1.giphy.com/media/lSDqu7IbMqMiQvCjjN/giphy.gif',
        'https://media1.giphy.com/media/KHWsnPDIpF2JgoeJ3v/source.gif',
        'http://images6.fanpop.com/image/photos/33100000/Bitch-SLAP-anime-33145487-530-434.gif'
        ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Slap`, '👋', `${message.author} slaps ${text}`, this.giflinks))
    }
}