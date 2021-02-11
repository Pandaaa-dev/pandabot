// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'sue',
    description: 'Sue someone/something', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <person/thing to sue> <...reason>\`\n*(... means multiple words can be used here)*`
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
    giflinks:[ 'https://i.pinimg.com/originals/be/d2/6a/bed26a010a1dd2e1eb1e55b28744e561.gif',
    'https://media2.giphy.com/media/cn2mSB4LXlx9t0zN6C/giphy.gif',
    'https://media1.tenor.com/images/611caddeb799c6dd84bdde93c34806d4/tenor.gif?itemid=15013750'
        ],
    async execute( message, args, text, client){
        const sueEE = args[0]
        const reason = args.slice(1, Infinity).join(' ')
        
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Sue`, '💵', `${message.author} sues ${sueEE} for ${reason}`, this.giflinks))
    }
}