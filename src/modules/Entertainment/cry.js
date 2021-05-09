// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'cry',
    description: 'cry', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}`
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
        'https://media.tenor.com/images/19089cd2b4970740debff2cdfc43329a/tenor.gif',

        'https://i.pinimg.com/originals/b4/b1/64/b4b1640525ecadfa1030e6096f3ec842.gif',

        'https://data.whicdn.com/images/334708049/original.gif',        
        'https://media.tenor.com/images/7e623e17dd8c776aee5e0c3e0e9534c9/tenor.gif'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Cry`, '😭', `${message.author} is crying...`, this.giflinks))
    }
}