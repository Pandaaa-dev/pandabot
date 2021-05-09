// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const descEmbed = require('../../../utilities/onlyDescEmbed')

const array = []
module.exports = {
    name: 'daily',
    description: 'Gives people some economy points every few hours', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    module: 'Economy',
    highValue: false, 
    emoji: null,
    cooldown: 'econdaily',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const botConfig = client.bot_config.get('_1')
        if(client.guilds_config.get(message.guild.id).sightseeing === 1) return message.channel.send(descEmbed('This server is in sightseeing mode! The owner must turn it off first'))
        const userObj = array.find(ar => ar.userid == message.author.id)

            const {emoji, dailyEcon} = client.bot_config.get('_1')
            let userPoints = ''
            const xpObject = client.economy.get(message.author.id)
            if(!xpObject){
                userPoints = 0
            } else {
                userPoints = xpObject.points
            }
            userPoints = userPoints + dailyEcon
             if(userPoints >= 500000) return message.channel.send(descEmbed('You already have max amount of ' + emoji + '!'))
            const embed = new MessageEmbed()
                    .setColor(Math.floor(Math.random()*16777215).toString(16))
                    .setDescription(`You have taken your daily and increased by ${dailyEcon}${emoji}. Your balance is ${userPoints}${emoji}`)
            client.economy.set(message.author.id, {
                userid: message.author.id,
                points: userPoints
            })

            message.channel.send(embed)
        

        }
}