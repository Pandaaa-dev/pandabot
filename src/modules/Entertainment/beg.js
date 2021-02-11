// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'beg',
    description: 'Beg for something/someone', 
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
        'https://media.tenor.com/images/a173f1c95d81855afd10d51f3fa277ab/tenor.gif',
        'https://64.media.tumblr.com/c4856e25d7e12ed057541ca3a1753b0f/tumblr_pqjnah9kgo1th206io1_250.gifv',
        'https://media.tenor.com/images/6cba97389ba3ac706c0e40292ad59f3f/tenor.gif',
        'https://thumbs.gfycat.com/CalmDiscreteBison-size_restricted.gif'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Beg`, '🙏', `${message.author} begs for ${text}`, this.giflinks))
    }
}