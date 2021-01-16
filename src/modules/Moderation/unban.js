// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'unban',
    description: 'Unbans a person/ many people', 
    usage(prefix){
        const returnArray = []

        // Basic usage shown in an array 
        const single = `\`${prefix}${this.name.toLowerCase()}  <userID>\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} <userID1> <userID2>\` `
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            "BAN_MEMBERS"
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 10,
    highValue: false, 
    emoji: '😲',
    uniqueText: "was unbanned",
    giflinks: [ "https://media1.tenor.com/images/721179aba345ee8c355a92a4cc6a6a80/tenor.gif?itemid=16754845",
    "https://media1.tenor.com/images/ca7c3effa6f215014169409de9efa848/tenor.gif?itemid=18344417",
    "https://i.gifer.com/RcBm.gif",
    "https://i.imgur.com/104VR9D.gif"
    ],
    async execute( message, args, text, client,connection){
            message.delete()
        const bannedMembersCollection = await message.guild.fetchBans()

        //Going through All args
            args.forEach(arg => {
                if(bannedMembersCollection.has(arg)){
                    message.guild.members.unban(arg).then((res,rej) => {
                        if(rej){
                            console.log(rej)
                        }
                        const description = `User **unbanned**:  
                                            <@${arg}>`
                        const embed = basicEmbed(client, message, args, text, "Unban", this.emoji, description, this.giflinks)
                        message.channel.send(embed)
                        return
                    })
                
                  //IF the argument isnt an id in the guildBanlist  
                }else {
                    const embed = basicEmbed(client, message, args, text, "UserID unreachable!", this.emoji, "Could not find the user:\n <@" + arg + ">", this.giflinks)
                    message.channel.send(embed)
                }

            })

         
    }
}   