// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')

module.exports = {
    name: 'appreciate',
    description: 'Appreciate a person/something', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <...text>\`\n*(<...text> means it can be anything and any number of words)*`
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
        "https://media1.tenor.com/images/8d635babe2f8aba8b3b7d8d5c1cf314f/tenor.gif?itemid=9415540",
        "https://media1.tenor.com/images/b65b3c7afec3e1eeb93a358471ca04b1/tenor.gif?itemid=7536738",
        "https://media.tenor.com/images/993e52b01a633f9c44868340d92243fe/tenor.gif",
        "https://media1.tenor.com/images/98529b250a7e0f243668a2c98b5fb725/tenor.gif?itemid=15960920"   
    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Appreciate`, '😊', `${message.author} appreciates ${text}`, this.giflinks))
    }
}