// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'punish',
    description: 'Punishes a person by taking away view-channel permission for all channels', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  @person 5m\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'BAN_MEMBERS', 'KICK_MEMBERS',
    ], 
    isNSFW: false,
    minArgs: 2,
    maxArgs: 2,
    highValue: false, 
    module: 'Moderation',

    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
           const personToPunish = message.mentions.users.first()
           const guildConfig = client.guilds_config.get(message.guild.id)

           if(!personToPunish){
               return message.channel.send(basicEmbed(client, message, args, text, `No users mentioned!`, `😠`, `You did not mention any user!`))
           }
           const guild = message.guild

           if(args[1].endsWith('m') ||
           args[1].endsWith('h') ||
           args[1].endsWith('d')) {

              let denoter = ''
               let timeMupltiple = 0
               const newArgs = [...args]
               const fulltime = newArgs.splice(-1,1)[0].split('')
               fulltime.splice(-1, 1)

              let time =  fulltime.join('')

            const extraText = newArgs.splice(3, Infinity).join(' ')
            
             console.log(args[1])
             if(args[1].endsWith('m')){
                 
                 timeMupltiple = 60000

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

             if(isNaN(time)){
                return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `😠`, `Please check the usage: ${this.usage(client.guilds_config.get(guild.id).prefix).join(' \n')}
                Acceptable times: *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`))
               
             }
                guild.channels.cache.forEach(async c => {
                    if(((c.type == 'text' || c.type == 'voice') && c.viewable)){
                        c.createOverwrite(personToPunish, {
                            VIEW_CHANNEL: false
                        }).then(async channel => {
                            
                        }).catch(e => console.log(e))
                    }
                })
                message.channel.send(basicEmbed(client, message, args, text, `Punishment`, `😲`, `${personToPunish} has been ***punished***\nFor:${time}${denoter}\nBy:${message.author}`))
                const dmChannel = await personToPunish.createDM()
                            await dmChannel.send(basicEmbed(client, message, args, text, `You have been punished!`, `D:`, `You have been punished on ${guild.name}!\nFor: ${time}${denoter}\nBy:${message.author.tag}`))
                            dmChannel.delete()
                setTimeout(() => {
                    guild.channels.cache.forEach(c => {
                        if(((c.type == 'text' || c.type == 'voice') && c.viewable)){
                            c.createOverwrite(personToPunish, {
                                VIEW_CHANNEL: null
                            }).then(channel => {

                            }).catch(e => console.log(e))
                        }
                    })
                },(time * timeMupltiple), [guild, personToPunish]);
                if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return

                client.emit('customlog', message, `Ordered to *Punish*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Punish**\n*Target:* ${personToPunish}\n*Duration:* ${time + ` ${denoter}`}` )

        }

    }
}