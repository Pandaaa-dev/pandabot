// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'roll',
    description: 'A lottery where you can win big by betting your currency', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <amount>\``
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
    module: 'Economy',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const {emoji, dailyEcon} = client.bot_config.get('_1')
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))

        const user  = client.economy.get(message.author.id)
        let points = 0
        if(!user){
            points = 0
        } else if(user){
            points= user.points
        }
        if(points >= 500000) return message.channel.send(descEmbed('You already have max amount of ' + emoji + '!'))
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
        if(roll >=0 && roll <425){
            multiple = 0
        }
        if(roll >=425 && roll <680){
            multiple = 1
        } 
        if(roll >= 680 && roll < 985){
            multiple = 2 
        } if(roll >= 985 && roll < 995){
            multiple = 3.5
        } if(roll >= 995 && roll <= 1000){
            multiple = 4
        }
        gainedPoints = Math.floor(number * multiple) 

        points = points + gainedPoints
        if(points >= 500000) {
            points = 500000
        } 
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