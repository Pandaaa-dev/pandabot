// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'remind',
    description: 'Reminds a person/Server', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} me <time> <remindingStuff(sentence/word)>\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} server <time> <remindingStuff(sentence/word)>\``
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 3,
    maxArgs: Infinity,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const clientAsMember = message.guild.member(client.user.id)
        message.delete()
        if(!message.channel.permissionsFor(clientAsMember).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
           return message.channel.send(basicEmbed(client, message, args, text, `Missing Permissions!`, `>:(`, `**Missing Permissions:**\n \`SEND__MESSAGES\`\N\`EMBED__LINKS\``))
        }

       if(args[1].endsWith('m') ||
          args[1].endsWith('h') ||
          args[1].endsWith('d')) {

                let denoter = ''
                let timeMupltiple = 0
                const array = args[1].split('')
                array.splice(-1,1)
                let time = array.join('')
                if(isNaN(time)){
                    return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `>:(`, `Please check the usage: \n ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                \n **Acceptable times:** \n *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`))            }
                const extraText = args.splice(2, Infinity).join(' ')
                if(args[1].endsWith('m')){
                    timeMupltiple = 60000
                    console.log(time)
                    denoter = ' minute(s)'
                } else if(args[1].endsWith('h')){
                    if(time > 168){
                        time = 168
                    }
                    timeMupltiple = 3600000 
                    denoter = ' hour(s)'
                } else if(args[1].endsWith('d')) {
                    if(time > 7){
                        time = 7
                    }
                    timeMupltiple = 86400000 
                    denoter = ' day(s)'
                }

                const typeOfReminder = args[0].toLowerCase()



                message.channel.send(basicEmbed(client, message, args, text, `Reminder Set`, `⏰`, `Reminder set for <@${message.author.id}>\n**Reason**: ${extraText}\n**Set**: For ${time}${denoter}`))
                if(typeOfReminder == 'me'){
                    setTimeout(async () => {
                        const dmChannel = await message.author.createDM();
                        dmChannel.send(basicEmbed(client, message, args, text, `Reminder`, `⏰`, `**Reminder notification:** \n**Reason**: ${extraText}\n**Set:** ${time}${denoter} ago `))
                    }, time * timeMupltiple, [message]);
                    return
                }
                if(typeOfReminder == 'server'){
                    setTimeout(() => {
                    return   message.channel.send(basicEmbed(client, message, args, text, `Reminder`, `⏰`, `**Reminder notification:** \nFor: <@${message.author.id}>\n**Reason**: ${extraText} \n**Set:** ${time}${denoter} ago `))
                    }, time * timeMupltiple, [message]);
                    return
                }
                    return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `>:(`, `Please check the usage: \n ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                    \n **Acceptable times:** \n *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`));            
        
            }
    }
}