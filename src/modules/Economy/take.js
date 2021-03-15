// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'take',
    description: 'Awards a user some xp', 
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
    owner: true,
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        const userToTakeFrom = message.mentions.users.first()
        const emoji = client.bot_config.get('_1').emoji
        if(!userToTakeFrom) return message.channel.send(basicEmbed(client, message, args, text, `You didnt mention anybody!`, `😡`, 'You need to mention somebody for this command to work!'))
        const amount = args[1]
        if(isNaN(amount)){
            return message.channel.send(basicEmbed(client, message, args, text, `Amount is not a number`, `😡`, 'Mention a proper amount you fucking degenrate of an owner.'))
        }
        const user  =client.economy.get(userToTakeFrom.id)
        let points = 0
        if(!user){
             points = 0
        } else if(user){
             points= user.points
        }
        points = points - Number(amount)
        if(points < 0) {
            points = 0
        }
        client.economy.set(userToTakeFrom.id, {
            userid: userToTakeFrom.id,
            points: points
        })
        const embed = new MessageEmbed()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setDescription(`${amount} ${emoji} was taken from ${userToTakeFrom}`);
        return message.channel.send(embed)
    }
}