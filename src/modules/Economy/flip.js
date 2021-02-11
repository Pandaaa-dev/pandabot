// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'flip',
    description: 'Makes a coinflip where you have a 50-50 chance of doubling your money.', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${flip}${this.name.toLowerCase()} <ammount>\``
        // const multiple = `\`${flip}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    module: 'Economy',
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const {emoji, dailyEcon} = client.bot_config.get('_1')
        const user  = client.economy.get(message.author.id)
        let points = 0
        if(!user){
            points = 0
        } else if(user){
            points= user.points
        }
        
        let number = args[0]
        if(isNaN(number) && number.toLowerCase() !='all' ) return
        if(number =='all'){
            number = points
        } else {
            number == +number
        }
        if(number > points) return
        points = points - number
        const roll = Math.random()
        console.log(roll)
        let multiple = ''
        if(roll <= 0.58){
            multiple = 0
        } else {
            multiple = 2
        }
   
        gainedPoints = number * multiple

        points = points + gainedPoints

        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(`You flipped ${number}${emoji} and got ${gainedPoints}${emoji}.`)
        client.economy.set(message.author.id, {
            userid: message.author.id,
            points: points
        })
        message.channel.send(embed)
    }
}