// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const huntShop = require('../../../utilities/JSON/huntingshop.json')
const resaleItems = require('../../../utilities/JSON/resaleItems.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'inv',
    description: 'Shows your Inventory', 
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
    module: 'FoodHunt',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))
        let huntingDetailsForUser = client.hunting_inv.get(message.author.id);
        const guild = client.guilds_config.get(message.guild.id)
        if(!huntingDetailsForUser || !huntingDetailsForUser.presentSword) return message.channel.send(descEmbed(`You dont have a sword! Buy a sword to begin your quest journey! Type ${guild.prefix}huntshop to know about the available swords.`))
        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle(`>> Inventory`)
        .setDescription(`Showing the inventory for ${message.author}:`)
        .setColor(Math.floor(Math.random()*16777215).toString(16))

        .addField('Present Sword \`⚔️\`', `*${huntingDetailsForUser.presentSword} (${huntingDetailsForUser.swordQuestNo} quest(s) left)*`)
        .addField('Present Potion\`🧪\`', `${huntingDetailsForUser.presentPotion == null? '*None*' : `*${huntingDetailsForUser.presentPotion}*`} ${huntingDetailsForUser.potionQuestNo == null? '': `*${huntingDetailsForUser.potionQuestNo} quest(s) left*` }`);

        const itemArr = Object.keys(huntingDetailsForUser)
        embed.addField('***Cheap*** \`🥫\`', 'Showing the cheap items:')
        itemArr.filter(keys => keys.startsWith('ch')).forEach(key => {
            const item = resaleItems.Cheap.find(item=> item.code.toLowerCase() === key.toLowerCase())
                    if(!item) return
                    if(huntingDetailsForUser[item.code] === null || huntingDetailsForUser[item.code] === 0 ) return
                    embed.addField(item.name, `\n${huntingDetailsForUser[item.code]}`, true)
        })
        embed.addField('***Rare***`💠\`', 'Showing the rare items:')
        itemArr.filter(keys => keys.startsWith('ra')).forEach(key => {
            const item = resaleItems.Rare.find(item=> item.code.toLowerCase() === key.toLowerCase())
                    if(!item) return
                    if(huntingDetailsForUser[item.code] === null || huntingDetailsForUser[item.code] === 0 ) return

                    embed.addField(item.name, `\n${huntingDetailsForUser[item.code]}`, true)
        })
        embed.addField('***Super Rare*** \`⚜️\`', 'Showing the super rare items:')
        itemArr.filter(keys => keys.startsWith('su')).forEach(key => {
            const item = resaleItems.superRare.find(item=> item.code.toLowerCase() === key.toLowerCase())
                    if(!item) return
                    if(huntingDetailsForUser[item.code] === null || huntingDetailsForUser[item.code] === 0 ) return
                    embed.addField(item.name, `\n${huntingDetailsForUser[item.code]}`, true)
        })
        message.channel.send(embed)
    }

}

// 