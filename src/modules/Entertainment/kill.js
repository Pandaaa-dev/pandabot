// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'kill',
    description: 'Kill a user', 
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
        'https://media.tenor.com/images/29145d2d2903a529aebfb343722ce841/tenor.gif',
        'https://media1.tenor.com/images/fda15ad6760088bccc9579ef155fd5ca/tenor.gif?itemid=17872127',
        'https://media1.tenor.com/images/f5dbcc2670ec43aa5c1c6c255e8536cf/tenor.gif?itemid=17236025',
        'https://static.wikia.nocookie.net/akamegakill/images/0/0e/Esdeath_Killing_Intent.gif/revision/latest/top-crop/width/300/height/300?cb=20140819195334'
    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Kill`, '🔪', `${message.author} wants to kill ${text}`, this.giflinks))
    }
}
