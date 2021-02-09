// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'prune',
    description: 'Deletes all messages', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [ 'MANAGE_MESSAGES'
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    module: 'Moderation',

    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const guildConfig = client.guilds_config.get(message.guild.id)
        if(isNaN(args[0])) return
        if (+args[0] < 0) return
        if(message.channel.permissionsFor(message.guild.member(client.user)).has('MANAGE_MESSAGES')){
            const numberOfMessages = +args[0]
            const iterations = Math.floor(+args[0]/100)
            if(iterations == 0){
              await   message.channel.bulkDelete(+args[0], true)
            } else if(iterations > 0) {
                for(i =0; i < iterations; i++){
                   await  message.channel.bulkDelete(100, true)
                }
            const remaining = (+args[0]/100 - Math.floor(+args[0]/100).toFixed(2)) * 100
                if(remaining > 0){
                    await message.channel.bulkDelete(Math.floor(remaining), true)
                }
            }
            if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return

            client.emit('customlog', message, `Ordered to *Prune*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Prune**\n*Target:* ${message.channel}\n*Number of Messages:*: ${args[0]}` )
            
        if(message.channel.id == guildConfig.loggingchannelid){
            if(message.guild.owner.id !== message.author.id){
                client.emit('customlog', message, `SECURITY RISK`, guildConfig.loggingchannelid,  `${message.author} just deleted ${args[0]} number of messages from the logging channel. This message is being sent as a safety precaution` )
            }
        }

        }
    }
}   