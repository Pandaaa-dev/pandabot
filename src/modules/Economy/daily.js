// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const array = []
module.exports = {
    name: 'daily',
    description: 'Gives people something every x hours', 
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
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    cooldown: 'econdaily',
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const botConfig = client.bot_config.get('_1')
        const userObj = array.find(ar => ar.userid == message.author.id)

        //cooldown

            if(userObj){
                let index = array.findIndex(arr => arr.userid == userObj.userid && arr.timestamp == userObj.timestamp)
                array.splice(array.indexOf(index), 1)
            }

            console.log(Date.now()/360000)
            const {emoji, dailyEcon} = client.bot_config.get('_1')
            let userPoints = ''
            const xpObject = client.economy.get(message.author.id)
            if(!xpObject){
                userPoints = 0
            } else {
                userPoints = xpObject.points
            }
            userPoints = userPoints + dailyEcon
            const embed = new MessageEmbed()
                    .setColor(Math.floor(Math.random()*16777215).toString(16))
                    .setDescription(`You have taken your daily and increased by ${dailyEcon}${emoji}. Your balance is ${userPoints}${emoji}`)
            client.economy.set(message.author.id, {
                userid: message.author.id,
                points: userPoints
            })
            array.push({
                userid: message.author.id,
                timestamp: Date.now()
            })
            message.channel.send(embed)
        

        }
}