    // check these routes!
    const basicEmbed = require('../../../utilities/basicEmbed')
    const descEmbed = require('../../../utilities/onlyDescEmbed')
    const errorEmbed = require('../../../utilities/errorEmbed')
    
const connection = require('../../db/db')
    
    module.exports = {
        name: 'claim',
        description: 'Proposes to a user', 
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
        minArgs: 2,
        maxArgs: 2,
        highValue: false, 
        emoji: null,
        module: 'Waifu',

        cooldown: 60*10,
        uniqueText: "",
        giflinks: [ 
            // Gif links for the embed
        ],
        async execute( message, args, text, client){
            if(isNaN(+args[1])) return message.channel.send(descEmbed('User a proper number.'))
            
            const userEcon = client.economy.get(message.author.id)
            if(!userEcon || userEcon.points < (+args[1])) return message.channel.send(descEmbed(`Sorry! You do not have enough. Work hard and obtain all the money in the world for your waifus! We believe in **you**!`))
            
            const requiredUser = message.mentions.users.first();
            const botConfig = client.bot_config.get('_1')
            let personToClaim = requiredUser
            if(!personToClaim) return
            if(personToClaim.id === message.author.id) return message.channel.send(descEmbed(`You love tourself a bit too much dont ya...`))
            if(client.waifu){
                const howManyClaims = client.waifu.array().filter(waifu => waifu.husbandu == message.author.id)
                if(howManyClaims){
                if(howManyClaims.length == 5){
                    return message.channel.send(descEmbed(`Youre quite the player eh? :open_mouth:. Anyways, we dont let people with 5 waifus claim more :sweat_smile:. Please divorce someone or give them more love!`))
                }}
            }

            const amount = args[1]
            if (+amount < 500) {
                return message.channel.send(descEmbed(`Minimum amount to claim a waifu is 500${botConfig.emoji}.`))
            }

            const isAlreadyWaifu2 = client.waifu.get(personToClaim.id)
            if(isAlreadyWaifu2 && isAlreadyWaifu2.husbandu === message.author.id) return message.channel.send(descEmbed('You already have this waifu'))

            // console.log((isAlreadyWaifu2.amount + (isAlreadyWaifu2.amount*0.15)))

// If the waifu is claimed and the required amount is NOT met
            // console.log((+amount >= (isAlreadyWaifu2.amount + (isAlreadyWaifu2.amount*0.15))))
            if(isAlreadyWaifu2 && (+amount < (isAlreadyWaifu2.amount + (isAlreadyWaifu2.amount*0.15))) ){
                return message.channel.send(basicEmbed(client, message, args, text, `Already Claimed!`, 'D:', `The person youre trying to claim already has been claimed!\n*(A wise man once said cheating on a person should be punishable by death. Wait no, we like that.)*\n\n**By**: <@${isAlreadyWaifu2.husbandu}>\n**For**: ${isAlreadyWaifu2.amount}\n\n*If you still wanna claim this waifu, you will need to pay more than ${isAlreadyWaifu2.amount} and 15% more :wink:*\n*(A wise man also said everything is buyable. We like that too.)*`))
            }


            let decision = false 
            const question = await message.channel.send(basicEmbed(client, message, args, text, `Claim Request!`, `:D`, `Hey ${personToClaim}, ${message.author} wants to claim you for ***${+args[1]}${botConfig.emoji}***\n\n**Do you accept?**\n
                                                                                                                        *(The results will be shown in a minute. If the mentioned possibly waifu-to-be doesnt respond within **one minute**, this message will be deleted)*`))
            question.react('✔️');
            question.react('❌');
        
            const filter = (reaction, user) => (reaction.emoji.name === '✔️' || reaction.emoji.name === '❌' );
            const reactions = await question.awaitReactions(filter, {
                    time: 60000,
            })
            question.delete()
            if(reactions.array().length > 0){
              const checkMarks = reactions.find(reaction => reaction._emoji.name === '✔️')
              if(!checkMarks) return 
                const didTheySayYes = checkMarks.users.cache.get(personToClaim.id)
                if(didTheySayYes) decision = true
            }

            if(!decision) return message.channel.send(basicEmbed(client, message, args, text, `Not this time...`, ':<', 'Sorry but the person you want to make your waifu has somebody else in mind... Happens to the best of us. Dont worry the next person wil definitely say yes!'))
           
            const isAlreadyWaifu = client.waifu.get(personToClaim.id)
            
            if(isAlreadyWaifu && isAlreadyWaifu.husbandu === message.author.id) return message.channel.send(descEmbed('You already have this waifu'))
            // If the waifu is claimed and the required amount is NOT met
                        if(isAlreadyWaifu && (+amount < (isAlreadyWaifu.amount + (isAlreadyWaifu.amount*0.15))) ){
                            return message.channel.send(basicEmbed(client, message, args, text, `Already Claimed!`, 'D:', `The person youre trying to claim already has been claimed!\n*A wise man once said cheating on a person should be punishable by death. Wait no, we say that too.*\n\n**By**: <@${isAlreadyWaifu.husbandu}>\n**For*: ${isAlreadyWaifu.amount}\n*If you still wanna claim this waifu, you will need to pay more than ${isAlreadyWaifu.amount} and 15% more ;)\n*A wise man also said everything is buyable. We say that too.`))
                        }

           // If the waifu is claimed and the required amount is met
              if(isAlreadyWaifu && (+amount >= (isAlreadyWaifu.amount + (isAlreadyWaifu.amount*0.15)))) {
                const amountToBeAdded = Math.round(isAlreadyWaifu.amount/3)

                // For Waifu
                const waifu  = client.economy.get(isAlreadyWaifu.waifu)
                let waifuPoints = 0
                if(!waifu){
                    waifuPoints = 0
                } else if(waifu){
                    waifuPoints = waifu.points
                }
                client.economy.set(isAlreadyWaifu.waifu, {
                    userid: isAlreadyWaifu.waifu,
                    points: waifuPoints + amountToBeAdded
                })

                //For husbandu
                const husbandu  = client.economy.get(isAlreadyWaifu.husbandu)
                let husbanduPoints = 0
                if(!husbandu){
                    husbanduPoints = 0
                } else if(husbandu){
                    husbanduPoints = husbandu.points
                }
                client.economy.set(isAlreadyWaifu.husbandu, {
                    userid: isAlreadyWaifu.husbandu,
                    points: husbanduPoints + amountToBeAdded
                })

                // For user 
                const user  = client.economy.get(message.author.id)
                let userPoints = 0
                if(!user){
                    userPoints = 0
                } else if(user){
                    userPoints = user.points
                }
                client.economy.set(message.author.id, {
                    userid: message.author.id,
                    points: (userPoints - (+args[1])) + amountToBeAdded
                })

                await client.waifu.delete(personToClaim.id)

                await client.waifu.set(personToClaim.id, {
                    waifu: personToClaim.id,
                    husbandu: message.author.id,
                    amount: +args[1],
                    divorceCount: 0
                })

               return message.channel.send(basicEmbed(client, message, args, text, `Waifu **Claimed**`, ':D', `Your new waifu has been claimed! ${personToClaim} is yours now! May your love go all the way!\nYou also got ${amountToBeAdded} ${botConfig.emoji} as a blessing from the previous husbandu *(the waifu and the husbandu also got that amount).* Protect your waifu at all costs!`))
            }

        //If waifu is not claimed
            if(!isAlreadyWaifu){
                const husbandu  = client.economy.get(message.author.id)
                let husbanduPoints = 0
                if(!husbandu){
                    husbanduPoints = 0
                } else if(husbandu){
                    husbanduPoints = husbandu.points
                }
                client.economy.set(message.author.id, {
                    userid: message.author.id,
                    points: (husbanduPoints - (+args[1]))
                })

                await client.waifu.set(personToClaim.id, {
                    waifu: personToClaim.id,
                    husbandu: message.author.id,
                    amount: +args[1],
                    divorceCount: 0
                })
            message.channel.send(basicEmbed(client, message, args, text, `Waifu **Claimed**`, ':D', `Your new waifu has been claimed! ${personToClaim} is yours now! May your love go all the way! Protect your waifu at all costs!`))
            }
        }
    }