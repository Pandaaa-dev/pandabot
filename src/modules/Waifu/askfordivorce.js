// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'askfordivorce',
    description: 'Divorces a member', 
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
    uniqueText: "uniquetext",
    module: 'Waifu',

    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const personAsWaifu = await client.waifu.get(message.author.id)
        if(!personAsWaifu) return message.channel.send(descEmbed(`You are not a waifu.`))
        const emoji = client.bot_config.get('_1').emoji
        if(personAsWaifu.divorceCount === 3 ){
            let newHusbanduPoints = 0
            let newWaifuPoints = 0
            const waifuEcon = client.economy.get(message.author.id)
            let waifuPoints = 0
            if(!waifuEcon){
                waifuPoints = 0
            } else if(waifuEcon){
                waifuPoints = waifuEcon.points
            }
            const husbanduEcon = client.economy.get(personAsWaifu.husbandu)
            let husbanduPoints = 0
            if(!husbanduEcon){
                husbanduPoints = 0
            } else if(husbanduEcon){
                husbanduPoints = husbanduEcon.points
            }
            if(husbanduEcon){
                newHusbanduPoints = Math.floor(husbanduPoints*0.8)
                newWaifuPoints =  Math.floor(husbanduPoints*0.2) 

                await client.economy.set(personAsWaifu.husbandu, {
                    userid: personAsWaifu.husbandu,
                    points: newHusbanduPoints
                })

               await client.economy.set(message.author.id, {
                    userid: message.author.id,
                    points: waifuPoints + newWaifuPoints
                })
            }
           await  client.waifu.delete(message.author.id);
          return   message.channel.send(basicEmbed(client, message, args, text, `You are free!`, ':D', `You have been freed from the shackles of <@${personAsWaifu.husbandu}>!
                                                                                                You can have a new husbandu if you want know. We hope your new husbandu doesnt treat you the way your previous did! ${ newWaifuPoints !== 0? `Also, we compensated your husbandu for ${newWaifuPoints}${emoji} since he didn't give you a divorce :<.` : ''}
                                                                                                \n**Live Long, Prosper and Love**`))
        }
        if(personAsWaifu.divorceCount < 3){
            client.waifu.set(message.author.id, {
                ...personAsWaifu,
                divorceCount: personAsWaifu.divorceCount + 1
            })

            return   message.channel.send(basicEmbed(client, message, args, text, `Divorce filed!`, ':D', `Hey <@${personAsWaifu.husbandu}>, ${message.author} wants a **divorce** from you!
                                                                                                If you dont divorce your waifu and your waifu asks for divorce ${3 - personAsWaifu.divorceCount} more times, We will forcibly divorce you and penalize you(The husbandu) 20% of his ${emoji}.
                                                                                                Think fast buddy :)`))
        }
    }
}