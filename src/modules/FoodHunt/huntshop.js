// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const huntShop = require('../../../utilities/JSON/huntingshop.json')
module.exports = {
    name: 'huntshop',
    description: 'Shows you the hunting shop items available for you to use.', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
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
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    module: 'FoodHunt',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const emoji = client.bot_config.get('_1').emoji
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))

        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setDescription(`Welcome to the Pandaa Hunting shop! You can find Swords and Potions here to help with your future endeavours. Fear not warrior! The right sword will find you!\n*Type\`${client.guilds_config.get(message.guild.id).prefix}buy <sword/potion name>\` to buy*`)
        .setTitle('>> Hunting Shop')
        .addField('***__Swords__*** ⚔️', 'Your quests are filled with heinous monsters! But fear not! The right sword will always help you defeat any monster at ease! Buy your sword and go on your quests warrior!', false)
        huntShop.Swords.forEach(sword=> {
            embed.addField(`${sword.name} ${sword.emoji}`, `${sword.Price} ${emoji}\n*Lifetime:* ***${sword.questNumber}*** **quest(s))**\n*Per Quest:* ***${sword.itemsPerQuest}*** **items**\n`, true)
        })
        embed.addField('***__Potions__*** 🧪', 'You can never be *too prepared.* Buy all the potions you need in order to complete your battles gracefully without a scratch!')
        huntShop.Potions.forEach(potion => {
            embed.addField(`${potion.name} 🧪`, `${potion.price} ${emoji}\n${potion.description}\n*Lifetime:* ***${potion.questNumber}*** **quest(s)**`, true )
        })
        message.channel.send(embed)
    }

}

// 