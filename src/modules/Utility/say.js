// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Says the command in the embed', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: Infinity,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
           const clientAsMember = message.guild.member(client.user.id)
        message.delete()
        if(!message.channel.permissionsFor(clientAsMember).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
           return message.channel.send(basicEmbed(client, message, args, text, `Missing Permissions!`, `>:(`, `**Missing Permissions:**\n \`SEND__MESSAGES\`\N\`EMBED__LINKS\``))
        }
        // message.channel.send(basicEmbed(client, message, args, text, ))
        const embed = new MessageEmbed()
            .setDescription(text)
            .setTimestamp()
            .setColor(Math.floor(Math.random()*16777215).toString(16));
        message.channel.send(embed)
    }
}