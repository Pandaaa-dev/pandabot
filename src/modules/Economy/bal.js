// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')

module.exports = {
name: 'bal',
description: 'Checks the balance', 
usage(prefix){
    const returnArray = []

    //Basic usage shown in an array 

    const single = `\`${prefix}${this.name.toLowerCase()}\``
    const multiple = `\`${prefix}${this.name.toLowerCase()} @person1\` `
    returnArray.push(single)
    returnArray.push(multiple)
    return returnArray
},
requiredPermissions: [
        //All the required permissions the user and the bot both needs
], 
isNSFW: false,
minArgs: 0,
maxArgs: 1,
highValue: false, 
module: 'Economy',
emoji: null,
uniqueText: "uniquetext",
giflinks: [ 
    // Gif links for the embed
],
async execute( message, args, text, client){
    message.delete()
    const emoji = client.bot_config.get('_1').emoji
    if(message.mentions.users.first()){
        const user  =client.economy.get(message.mentions.users.first().id)
        let points = 0
        if(!user){
                points = 0
        } else if(user){
                points= user.points
        }
        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(`${message.mentions.users.first()} has ${points}${emoji}`)
        message.channel.send(embed)
        if(!user){
            client.economy.set(message.mentions.users.first().id, {
                userid: message.mentions.users.first().id,
                points: points
            })
        }
    } else {
        const user  =client.economy.get(message.author.id)
        let points = 0
        if(!user){
                points = 0
        } else if(user){
                points= user.points
        }
        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(`${message.author} has ${points}${emoji}`)
        message.channel.send(embed)
        if(!user){
            client.economy.set(message.author.id, {
                userid: message.author.id,
                points: points
            })
        }
    }
}
}