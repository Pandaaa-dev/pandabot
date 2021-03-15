// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'award',
    description: 'Awards a user some currency', 
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
    uniqueText: "uniquetext",
    module: 'Economy',
    owner: true,
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        const userToAward = message.mentions.users.first()
        const emoji = client.bot_config.get('_1').emoji
        if(!userToAward) return message.channel.send(basicEmbed(client, message, args, text, `You didnt mention anybody!`, `😡\"`, 'You need to mention somebody for this command to work idiot owner!'))
        const amount = args[1]
        if(isNaN(amount)){
            return message.channel.send(basicEmbed(client, message, args, text, `Amount is not a number`, `😡"`, 'Mention a proper amount you fucking degenrate of an owner.'))
        }
        const user  =client.economy.get(userToAward.id)
        let points = 0
        if(!user){
             points = 0
        } else if(user){
             points= user.points
        }
        points = points + Number(amount)
        client.economy.set(userToAward.id, {
            userid: userToAward.id,
            points: points
        })
        const embed = new MessageEmbed()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setDescription(`${userToAward} was awarded ${amount} ${emoji}`);
        return message.channel.send(embed)
    }
}