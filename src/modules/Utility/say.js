// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const isJson = async(text) => {
    try {
        JSON.parse(text)
        
    } catch(e){
        return false
    }
    return true
}
module.exports = {
    name: 'say',
    description: 'Says the command in the embed', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <...text>\`\n*(... means multiple words can be used here)*`
        const multiple = `\`${prefix}${this.name.toLowerCase()} <embedJson>\`\n*(You can find embed visualizers on the internet anywhere)*`
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_MESSAGES',
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: Infinity,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    module: 'Utility',
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
           const clientAsMember = message.guild.member(client.user.id)
        message.delete()
        if(!message.channel.permissionsFor(clientAsMember).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
           return message.channel.send(basicEmbed(client, message, args, text, `Missing Permissions!`, `😠`, `**Missing Permissions:**\n \`SEND__MESSAGES\`\N\`EMBED__LINKS\``))
        }
        const isjson = await isJson(text);
        if(isjson){
            message.channel.send({embed: JSON.parse(text)})
        }else {
            message.channel.send(text)
        }
        
    //    message.channel.send()
    }
}

