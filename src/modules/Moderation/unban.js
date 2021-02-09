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
    module: 'Moderation',

    uniqueText: "was unbanned",
    giflinks: [ 
        //Gif links if any  
    ],
    async execute( message, args, text, client,connection){
            message.delete()
        const bannedMembersCollection = await message.guild.fetchBans()
        const guildConfig = client.guilds_config.get(message.guild.id)

        //Going through All args
            args.forEach(arg => {
                if(bannedMembersCollection.has(arg)){
                    message.guild.members.unban(arg).then(async (res,rej) => {
                        if(rej){
                            console.log(rej)
                        }
                        const description = `User **unbanned**:  
                                            <@${arg}>`
                        const embed = basicEmbed(client, message, args, text, "Unban", this.emoji, description, this.giflinks)
                        await message.channel.send(embed)
                        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
                        client.emit('customlog', message, `Ordered to *Unban*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Unban**\n*Target:* ${arg}` )

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