// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')
const {MessageEmbed} = require('discord.js') 
module.exports = {
    name: 'waifuinfo',
    description: 'Shows waifu info for a user', 
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
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    module: 'Waifu',

    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        let user = message.author

        if(message.mentions.users.first()) {
            user = message.mentions.first()
        }

        const isAlreadyWaifu = client.waifu.get(user.id)
        const userWaifus = client.waifu.filter(waifus => waifus.husbandu === user.id)
        console.log(userWaifus)
        if(!isAlreadyWaifu && userWaifus.length < 1) return message.channel.send(descEmbed(`Couldn't find anything in our database.`))
        let husbandu = 'Nobody'
        if(isAlreadyWaifu){
             husbandu = client.users.cache.get(isAlreadyWaifu.husbandu).tag || '(' + isAlreadyWaifu.husbandu + ')'
        }
        let waifuList = 'No Waifus'
        let waifuLength = 0
        if(userWaifus && userWaifus.array().length > 0){
            waifuArray =  [] 
            userWaifus.array().forEach(waifu => {
                let eachWaifu = client.users.cache.get(waifu.waifu).tag

                if(!eachWaifu){
                    eachWaifu = waifu.waifu
                }
                waifuArray.push(eachWaifu)
            })
            waifuList = waifuArray.join(' \n')
            waifuLength = userWaifus.array().length
        }
        // userWaifus.length === undefined? 0 : userWaifus.length
        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL({format: 'png'}))
            .addFields([
                {name: 'Name', value: `${user.username || 'Someone'}`},
                {name: 'Waifus', value: `**${waifuLength}/5**`}, 
                {name: 'Husbandu', value: `${husbandu}`, inline: true}, 
                {name: 'Worth', value: `${isAlreadyWaifu? `At least ${isAlreadyWaifu.amount + (isAlreadyWaifu.amount * 0.20)}` : '500'}`, inline: true}, 
                {name: 'Waifu List', value: `${waifuList}`}, 
            ]);
        await message.channel.send(embed)

    }
}