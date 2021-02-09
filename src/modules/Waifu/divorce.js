// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'divorce',
    description: 'desc', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`prefix${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`prefix${this.name.toLowerCase()} @person1 @person2  %reason\` `
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
    module: 'Waifu',

    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
           const botConfig = client.bot_config.get('_1')
           const mentionedPerson = message.mentions.users.first()
           let requiredWaifu = mentionedPerson
           if(!mentionedPerson) {
               return message.channel.send(descEmbed(`You didn't mention a user`));
           }
           const waifuDetails = client.waifu.get(requiredWaifu.id)
           if(!waifuDetails) return message.channel.send(descEmbed(`Could not find waifu`));
           if(waifuDetails.husbandu !== message.author.id) return message.channel.send(descEmbed(`You are not the husbandu of the waifu you mentioned`))
 
            //For husbandu
            const husbandu  = client.economy.get(waifuDetails.husbandu)
            let husbanduPoints = 0
            if(!husbandu){
                husbanduPoints = 0
            } else if(husbandu){
                husbanduPoints = husbandu.points
            }
            const amountToBeAdded = Math.floor(waifuDetails.amount/2)
            client.economy.set(waifuDetails.husbandu, {
                userid: waifuDetails.husbandu,
                points: husbanduPoints + amountToBeAdded
            })

            // For Waifu
            const waifu  = client.economy.get(waifuDetails.waifu)
            let waifuPoints = 0
            if(!waifu){
                waifuPoints = 0
            } else if(waifu){
                waifuPoints = waifu.points
            }
            client.economy.set(waifuDetails.waifu, {
                userid: waifuDetails.waifu,
                points: waifuPoints + amountToBeAdded
            })
            
            client.waifu.delete(requiredWaifu.id);
            return message.channel.send(basicEmbed(client, message, args, text, `Waifu Divorced!`, ':D', `${message.author} divorced ${requiredWaifu}!\nYou are a free person now ${message.author.username}! Maybe dont go too overboard with the freedom :wink:. Also, you and your ***ex-waifu*** were gifted ${amountToBeAdded}${botConfig.emoji} for the money you spent on your waifu after working hard to earn it!.`))

    }
}