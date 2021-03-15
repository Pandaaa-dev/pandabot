// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const huntShop = require('../../../utilities/JSON/huntingshop.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
const resaleItems = require("../../../utilities/JSON/resaleItems.json")
module.exports = {
    name: 'sell',
    description: 'Sell things from your huntshop inventory', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} all (to sell everything you have)\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} <numberOfItems> <item>\` `
        returnArray.push(single)
        returnArray.push(multiple)
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
    module: 'FoodHunt',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))
        let huntingDetailsForUser = client.hunting_inv.get(message.author.id);
        const {emoji, dailyEcon} = client.bot_config.get('_1')
        const guild = client.guilds_config.get(message.guild.id)
        if(!huntingDetailsForUser) return message.channel.send(descEmbed('You do not have any data about your past endeavours in our database. Please contact the owner if thers a confusion'))
        let grandTotal = 0
        const user  =client.economy.get(message.author.id)
        let points = 0
        if(!user){
                points = 0
        } else if(user){
                points= user.points
        }
        if(args.length === 1){
            if(args[0].toLowerCase() !== 'all') return message.channel.send(descEmbed('Improper usage, please check usage again.'))
            Object.keys(huntingDetailsForUser).forEach(hItem => {
                if(hItem.startsWith('ch')){
                  const item = resaleItems.Cheap.find(food => food.code.toLowerCase() === hItem.toLowerCase())
                  grandTotal = grandTotal + (item.price * huntingDetailsForUser[hItem])
                  huntingDetailsForUser[hItem] = 0
                }
                if(hItem.startsWith('ra')){
                  const item = resaleItems.Rare.find(food => food.code.toLowerCase() === hItem.toLowerCase())
                  grandTotal = grandTotal + (item.price * huntingDetailsForUser[hItem])
                  huntingDetailsForUser[hItem] = 0  
                }
                if(hItem.startsWith('su')){
                  const item = resaleItems.superRare.find(food => food.code.toLowerCase() === hItem.toLowerCase())
                  grandTotal = grandTotal + (item.price * huntingDetailsForUser[hItem])
                  huntingDetailsForUser[hItem] = 0
                }
            })
            message.channel.send(basicEmbed(client, message, args, text, `Sold`, '💰', `You just sold everything you own for ${grandTotal} ${emoji}!`))
        } else if(args.length > 1) {
            if(isNaN(args[0])){
                return message.channel.send(descEmbed('You did not provide a number. The correct usage is:\n' + `${this.usage(guild.prefix).join('\n')}`))
            }
            const numberOfItem = args[0]
            const item = args.splice(1, Infinity).join(' ').trim()
            console.log(item)
            let requiredItem = null
            const isItemPresent = Object.keys(resaleItems).filter(type => {
              const objFound =  resaleItems[type].find(thing => {
                  if(requiredItem) return
                    if(thing.name.toLowerCase() === item.toLowerCase()) {
                        requiredItem = thing
                    }
                })
                if(objFound) return 
            })
            if(!requiredItem) return message.channel.send(descEmbed('Could not find the item...'))
            const authorHas = huntingDetailsForUser[requiredItem.code]
            if(numberOfItem > authorHas) return message.channel.send(descEmbed(`You do not have that many ${requiredItem.name}`))
            if(numberOfItem < 0) return 
            huntingDetailsForUser[requiredItem.code] = huntingDetailsForUser[requiredItem.code] - numberOfItem
            grandTotal = grandTotal +  numberOfItem * requiredItem.price 
            message.channel.send(basicEmbed(client, message, args, text, `Sold`, '💰', `You just sold ${numberOfItem} ${requiredItem.name}(s) for ${grandTotal} ${emoji}!`))
        }
        points = points + grandTotal        
        client.economy.set(message.author.id, {
            userid: message.author.id,
            points: points
        })
        client.hunting_inv.set(message.author.id, huntingDetailsForUser)
    }

}

