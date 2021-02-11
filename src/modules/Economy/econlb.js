// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const arraySort = require('array-sort')
const {MessageEmbed} = require('discord.js')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'econlb',
    description: 'Shows the economy leaderboard', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`prefix${this.name.toLowerCase()}\``
        // const multiple = `\`prefix${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    module: 'Economy',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        const botConfig = client.bot_config.get('_1')
         if(!client.economy) return descEmbed(`Couldn't find any economy data...`)
         const econArray = arraySort(client.economy.array(), 'points', {reverse: true}) ;
         if(econArray.length == 0) return message.channel.send(descEmbed('Couldnt find any economy data...')) 
         const embed = new MessageEmbed()
         .setTitle('>> **Economy Rankings** \`▶️\`')
         .setDescription('Listing the ranking for economy on a **global** level:')
         .setColor(Math.floor(Math.random()*16777215).toString(16))
         .setFooter('Stay Safe! || Pandabot ||', client.user.avatarURL({format: 'png'}))
         .setTimestamp();
         let i = 1
         econArray.forEach(econ => {
             if(i >= 25) return
             if(econ.points == 0) return
             if(econ.userid === client.user.id) return
             let user = client.users.cache.get(econ.userid)
             if(!user){
                 user = econ.userid
             } else {
                 user = user.tag
             }
             embed.addField(user, econ.points + botConfig.emoji, true)
             i++
         })
         message.channel.send(embed)
    }
}