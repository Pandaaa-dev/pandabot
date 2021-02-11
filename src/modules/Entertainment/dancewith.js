// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'dancewith',
    description: 'Dance with someone/something', 
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
       ' https://thumbs.gfycat.com/AllFantasticKiwi-small.gif',
'https://i.pinimg.com/originals/1a/13/c1/1a13c111736f868f9abab76e8ac9009d.gif',

'https://media1.tenor.com/images/d1089af1c36914169d7af1038e86383f/tenor.gif?itemid=15289835',
'https://pngimage.net/wp-content/uploads/2019/05/anime-dancing-gif-png-2.gif'

         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Dance`, '💃', `${message.author} wants to dance with ${text}`, this.giflinks))
    }
}