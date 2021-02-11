// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'yell',
    description: 'Yell at someone/something', 
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
        'https://media.tenor.com/images/5d95d35aa4321d9d143ce83d3de81741/tenor.gif', 
        'https://media.tenor.com/images/b07017c1bec2c5ef9e243d20427125c4/tenor.gif', 
        'https://media.tenor.com/images/a8f1de53b2b50a54ff330a807a4588eb/tenor.gif',        
        'https://static.wikia.nocookie.net/c856575f-1f76-41cd-ad94-9136b4525e9f'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Yell`, '📢', `${message.author} yells at ${text}`, this.giflinks))
    }
}