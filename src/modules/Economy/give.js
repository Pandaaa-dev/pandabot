// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'give',
    description: 'Gives economy points to a user', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  @person <amount>\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
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

        if(!message.mentions.users.first()) return
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))
        const {emoji, dailyEcon} = client.bot_config.get('_1')
        const user  = client.economy.get(message.author.id)
        let points = 0
        if(!user){
            points = 0
        } else if(user){
            points = user.points
        }

        let number = args[1]
        if(isNaN(number) && number.toLowerCase() !='all' ) return
        if(number =='all'){
            number = points
        } else {
            number = +number
        }
        if(number > points) return

        points = points - number 
        const userTOGive = message.mentions.users.first().id

        const userToGiveCurr  = client.economy.get(userTOGive)

        let userToGivePoints = 0
        if(!userToGiveCurr){
            userToGivePoints = 0
        } else if(userToGiveCurr){
            userToGivePoints= userToGiveCurr.points
        }
         const newUserPoints = userToGivePoints + number 
        if(newUserPoints >= 500000) return message.channel.send(descEmbed('Sorry, user cannot have more than 500000 ' + emoji ))
      
        client.economy.set(message.author.id, {
            userid: message.author.id,
            points: points
        })
        
        client.economy.set(userTOGive, {
            userid: userTOGive,
            points: newUserPoints

        })
        const embed = new MessageEmbed()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setDescription(`${message.author} gave ${message.mentions.users.first()} ${number}${emoji}`)

        message.channel.send(embed)
    }
}