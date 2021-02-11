// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'stare',
    description: 'Stare at someone/something', 
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
    giflinks:[ 
        'https://thumbs.gfycat.com/ElasticNegligibleBadger-max-1mb.gif',
        'https://media3.giphy.com/media/l1J9HBDbYyUXilcju/source.gif',
        'https://thumbs.gfycat.com/InsecureAgedGemsbok-size_restricted.gif',
        'https://i.pinimg.com/originals/37/fe/bf/37febf6435398514f19cd99b0be5c393.gif'
        
          ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Stare`, '👀', `${message.author} is staring at ${text}`, this.giflinks))
    }
}