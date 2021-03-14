// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const gifts = require('../../../utilities/JSON/gifts.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'gift',
    description: 'Gift a person something', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  @person <item>\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 2,
    maxArgs: 2,
    highValue: false, 
    emoji: null,
    module: 'Economy',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const giftableItems = Object.keys(gifts)
        // console.log(giftableItems
        message.delete()
        if(!message.mentions.users.first()) return message.channel.send(descEmbed("You didn't mention a user!"))
        if(message.mentions.users.first().id === message.author.id) return message.channel.send(descEmbed('Stop giving yourself gifts. You need friends to survive you know...'))
        const item = args[1];
        const isItemAvailable = giftableItems.find(gift => gift.toLowerCase() === item.toLowerCase())
        if(!isItemAvailable) return message.channel.send(descEmbed('Could not find item...'))
        const price = gifts[isItemAvailable].price
        const user  = client.economy.get(message.author.id)
        let points = 0
        if(!user){
            points = 0
        } else if(user){
            points = user.points
        }
       if(points < price) return message.channel.send(descEmbed('You do not have enough!'))
       
       points = points - price

       client.economy.set(message.author.id, {
           userid: message.author.id, 
           points: points
       })
       
       const existingInv = client.gift_inv.get(message.mentions.users.first().id)
       const requiredObj = {
        userid: message.mentions.users.first().id,
        Apple: existingInv? existingInv.Apple : 0,
        Rose: existingInv? existingInv.Rose :0,
        Chocolate: existingInv? existingInv.Chocolate : 0,
        Dog: existingInv? existingInv.Dog : 0,
        Cat: existingInv? existingInv.Cat : 0,
        Tiger: existingInv? existingInv.Tiger : 0,
        PS5: existingInv? existingInv.PS5 : 0,
        Laptop: existingInv? existingInv.Laptop : 0,
        Car: existingInv? existingInv.Car : 0,
        House: existingInv? existingInv.House : 0,
        Airplane: existingInv? existingInv.Airplane: 0,
        Dragon: existingInv? existingInv.Dragon: 0,
        World: existingInv? existingInv.World: 0,
        Moon: existingInv? existingInv.Moon: 0,
        Comet: existingInv? existingInv.Comet: 0,
        Love: existingInv? existingInv.Love: 0
    }

    requiredObj[isItemAvailable] = requiredObj[isItemAvailable] + 1 

       client.gift_inv.set(message.mentions.users.first().id, requiredObj)
    message.channel.send(basicEmbed(client, message, args, text, `Gift`, '🎁', `${message.author} gifted ${message.mentions.users.first()} a/an ${isItemAvailable}! \`${gifts[isItemAvailable].emoji}\``))
    }
}