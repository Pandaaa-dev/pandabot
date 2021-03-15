// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const gifts = require('../../../utilities/JSON/gifts.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'giftshop',
    description: 'See the items in the giftshop', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

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
    module: 'Economy',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))
        const giftableItems = Object.keys(gifts)
        const emoji = client.bot_config.get('_1').emoji 
        const embed = new MessageEmbed()
       .setColor(Math.floor(Math.random()*16777215).toString(16))
       .setTitle('**>>** **Gift Shop**')
        .setDescription(`Welcome to the PandaBot gift shop! Give your dear friends the gifts they deserve! Your friends care for you and cherish you so much. Show them your love by giving them gifts from your favorite bot! See usage in help!\n\n*All the prices are in ${emoji}*\n\n`)
        .setTimestamp()
        giftableItems.forEach(giftables => {  
            embed.addField(` ***${giftables}*** ${gifts[giftables].emoji}`,`${gifts[giftables].price}`, true)
        })
        message.channel.send(embed)
    }
}