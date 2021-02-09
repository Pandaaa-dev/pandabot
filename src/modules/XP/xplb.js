// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')
const arraySort = require('array-sort')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'xplb',
    description: 'Shows you the xp Leaderboard', 
    usage(prefix){
        const returnArray = []

        // Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        returnArray.push(single)

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
    module: 'XP',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        if(!client.xp_level) return message.channel.send(descEmbed('Couldnt find any xp data...')) 
        const xpArray = arraySort(client.xp_level.array(), 'points', {reverse: true}) ;
        if(xpArray.length == 0) return message.channel.send(descEmbed('Couldnt find any xp data...')) 
        const embed = new MessageEmbed()
            .setTitle('>> **XP Rankings**  \`🔼\`')
            .setDescription('Listing the ranking for xp on a **global** level...')
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter('Stay Safe! || Pandabot ||', client.user.avatarURL({format: 'png'}))

            .setTimestamp();
        console.log(xpArray.length)
    let i = 1
    xpArray.forEach(xp => {
        if(i >= 25) return
        if(xp.userid === client.user.id) return
        let user = client.users.cache.get(xp.userid)
        if(!user){
            user = xp.userid
        } else {
            user = user.tag
        }
        embed.addField(user, xp.points + ` XP`, true)
        i++
    })
    message.channel.send(embed)

    }
}