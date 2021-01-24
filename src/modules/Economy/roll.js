// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'roll',
    description: 'Kindof like a lottery idk shutup', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
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
        const roll = Math.floor(Math.random()*1000)
        console.log(roll)
        let multiple = ''
        if(roll >=0 && roll <300){
            multiple = 0
        }
        if(roll >=300 && roll <600){
            multiple = 1
        } 
        if(roll >= 600 && roll < 850){
            multiple = 2 
        } if(roll >= 850 && roll < 990){
            multiple = 4
        } if(roll >= 990 && roll <= 1000){
            multiple = 10
        }
        gainedPoints = number * multiple

        points = points + gainedPoints

        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(`You rolled ${number}${emoji}. You got ${gainedPoints}${emoji}`)
        client.economy.set(message.author.id, {
            userid: message.author.id,
            points: points
        })
        message.channel.send(embed)
    }

}