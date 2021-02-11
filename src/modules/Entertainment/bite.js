// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'bite',
    description: 'Bite something/someone', 
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
        'https://i.gifer.com/4BRL.gif',
        'https://toxicmuffin.files.wordpress.com/2013/04/tumblr_mkzqyghtsm1r0rp7xo1_400.gif',
        'https://i.pinimg.com/originals/c4/ff/31/c4ff310ed4399ebe2c85ffc52ad5eeab.gif',
        'https://media3.giphy.com/media/LO9Y9hKLupIwko9IVd/200.gif'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Bite`, '🦷', `${message.author} bites ${text}`, this.giflinks))
    }
}