// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const huntShop = require('../../../utilities/JSON/huntingshop.json')
const descEmbed = require('../../../utilities/onlyDescEmbed')
module.exports = {
    name: 'buy',
    description: 'Buy things from the huntshop', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <sword/potion name>\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
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
    module: 'FoodHunt',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
       const item = args.join(' ').trim();
       const user  = client.economy.get(message.author.id)
       let huntingDetailsForUser = client.hunting_inv.get(message.author.id);
        if(!huntingDetailsForUser){
            huntingDetailsForUser = {
                userid: message.author.id, 
                presentSword: null, 
                swordQuestNo:null,
                presentPotion:null,
                potionQuestNo:null,
                ch1a:null,ch2b:null,ch3c:null,ch4d:null, ch5e:null,ch6f:null,ch7g:null,
                ra1a:null,ra2b:null,ra3c:null,ra4d:null,ra5e:null,ra6f:null,ra7g:null,
                su1a:null, su2b:null,su3c:null,su4d:null,su5e:null,su6f:null,su7g:null
            }
        }
       let points = 0
       if(!user){
           points = 0
       } else if(user){
           points= user.points
       }
       const isSword = huntShop.Swords.find(sword => sword.name.toLowerCase() === item.toLowerCase())
       if(isSword) {
        if(huntingDetailsForUser.presentSword) return message.channel.send(descEmbed('You already are using a sword! You have to finish using that! Dont abandon your sword oh foolish warrior!'))
           if(points < isSword.Price) return message.channel.send(descEmbed(`You do not have enough!`))
            points = points - isSword.Price;
        huntingDetailsForUser.presentSword = isSword.name
        huntingDetailsForUser.swordQuestNo = isSword.questNumber
        message.channel.send(basicEmbed(client, message, args, text, `Bought a Sword `, '⚔️', `Hey ${message.author}, you have successfully bought the **${isSword.name}** sword! It will be in use from now!`))

       } else {
           const isPotion = huntShop.Potions.find(potion => potion.name.toLowerCase() === item.toLowerCase())
           if(huntingDetailsForUser.presentPotion) return message.channel.send(descEmbed('You cannot own more than one potions at a time!'))
           if(!isPotion) return message.channel.send(descEmbed('Could not find item...'))
           if(points < isPotion.price) return message.channel.send(descEmbed(`You do not have enough!`))
        points = points - isPotion.price
        huntingDetailsForUser.presentPotion = isPotion.name
        huntingDetailsForUser.potionQuestNo = isPotion.questNumber
        message.channel.send(basicEmbed(client, message, args, text, ` Bought a Potion `, '🧪', `Hey ${message.author}, you have successfully bought the **${isPotion.name}** potion! It will be in use from now!`))
       }
       client.hunting_inv.set(message.author.id, huntingDetailsForUser)
       client.economy.set(message.author.id, {
        userid: message.author.id,
        points: points
    })
    }

}

