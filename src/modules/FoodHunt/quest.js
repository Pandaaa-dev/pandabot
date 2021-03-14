// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const huntShop = require('../../../utilities/JSON/huntingshop.json')
const resaleItems = require('../../../utilities/JSON/resaleItems.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'quest',
    description: 'Complete a quest', 
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
    cooldown: 6*3600000 ,
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        let huntingDetailsForUser = client.hunting_inv.get(message.author.id);
        const guild = client.guilds_config.get(message.guild.id)

        if(!huntingDetailsForUser || !huntingDetailsForUser.presentSword) return message.channel.send(descEmbed(`You dont have a sword! Buy a sword to begin your quest journey! Type \`${guild.prefix}huntshop\` to know about the available swords.`))
        const arr = []
        const sword = huntShop.Swords.find(sword => sword.name.toLowerCase().trim() === huntingDetailsForUser.presentSword.toLowerCase().trim())
        if(!sword) return message.channel.send(descEmbed('There was an error, please contact my failure of a dev because hes the reason im broken 😠'))
        const itemsPerQuest = sword.itemsPerQuest
        let arrayOfItems 
        let type
        for(i = 0; i< itemsPerQuest; i++){
            const roll = Math.floor(Math.random() * 100) + 1 
            if(roll < 3){
                type = 'Super Rare'
                 arrayOfItems = resaleItems.superRare
            }  else if(roll >= 3 && roll <=85) {
                type= 'Cheap'
                 arrayOfItems = resaleItems.Cheap
            } else {
                type= 'Rare'
                 arrayOfItems = resaleItems.Rare
            }

            const item = arrayOfItems[Math.floor(Math.random()*resaleItems.superRare.length)]
            
             const alreadyExists = arr.findIndex(thing => thing.name.toLowerCase() === item.name.toLowerCase())
             if(alreadyExists && alreadyExists !== -1){
                arr[alreadyExists].qty = arr[alreadyExists].qty + 1 
             } else if(alreadyExists === -1){
                 arr.push({
                     name: item.name,
                     code: item.code,
                     type: type,
                     qty: 1
                 })
             }
        }
        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('>> Quest \`🎯\`')
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setDescription('Hey hunter! Hope you had a good time on your quest! Anyways, these are what you got:')
        .setFooter(`Quest by ${message.author.tag}`)
        arr.forEach(item=> {
            let emoji
            if(item.type.toLowerCase() === 'cheap') {
                emoji = '🥫'
            } else if(item.type.toLowerCase() === 'rare'){
                emoji = "💠"
            } else if(item.type.toLowerCase() === 'super rare'){
                emoji = "⚜️"
            }
            embed.addField(item.name, `**${item.type} ${emoji}**\n${item.qty}`, true)
            huntingDetailsForUser[item.code] === null? 0 : huntingDetailsForUser[item.code]
            huntingDetailsForUser[item.code] = huntingDetailsForUser[item.code] + item.qty 
        })
        console.log(huntingDetailsForUser.swordQuestNo )
        if(huntingDetailsForUser.swordQuestNo - 1 <= 0) {
            huntingDetailsForUser.presentSword = null
            huntingDetailsForUser.swordQuestNo = null
            message.channel.send(basicEmbed(client, message, args, text, `R.I.P. Sword!`, '⚔️', `Your sword is no more! Unfortunately, it reached its limit and **broke**. We cannot let you go into the wild without a sword. Please buy a new one before you go for more quests!` ))
        } else {
            huntingDetailsForUser.swordQuestNo = huntingDetailsForUser.swordQuestNo - 1
        }
        if(huntingDetailsForUser.potionQuestNo - 1 <= 0 && huntingDetailsForUser.potionQuestNo !== null) {
            huntingDetailsForUser.presentPotion = null
            huntingDetailsForUser.potionQuestNo = null
            message.channel.send(basicEmbed(client, message, args, text, `Potion fully depleted!`, '🧪', `Your potion has been fully depleted! But another one to reap its benefits again!` ))
        } else {
            huntingDetailsForUser.potionQuestNo = huntingDetailsForUser.potionQuestNo - 1
        }
        client.hunting_inv.set(message.author.id, huntingDetailsForUser)
        message.channel.send(embed)
    }

}

// 