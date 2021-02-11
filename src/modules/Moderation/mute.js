// check these routes!
const { GuildMember } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'mute',
    description: 'Mutes a user', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} 5m @person\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
    ], 
    isNSFW: false,
    minArgs: 2,
    maxArgs: 10,
    highValue: false, 
    module: 'Moderation',

    emoji: null,
    uniqueText: "was muted by",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute(message, args, text, client,connection){
        // const duration = args.pop().toString().toLowerCase();

        const guildConfig = client.guilds_config.get(message.guild.id)
        const muteroleid = guildConfig.muterole;
        const prefix = guildConfig.prefix;

        if(!muteroleid){
            return message.channel.send(basicEmbed(client, message, args, text, "No Mute Role!", "😲", 
            `You haven't set a mute role for this guild. Please look at the mute command for further information!`))
        }
    
        let  mutedMember = message.mentions.users.first()
        if(!mutedMember) return descEmbed('You did not mention a member...')
        const clientAsMember = message.guild.member(client.user.id)
        message.delete()
        if(!message.channel.permissionsFor(clientAsMember).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
           return message.channel.send(basicEmbed(client, message, args, text, `Missing Permissions!`, `😠`, `**Missing Permissions:**\n \`SEND__MESSAGES\`\N\`EMBED__LINKS\``))
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
                    return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `😠`, `Please check the usage: \n ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                \n **Acceptable times:** \n *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`)) }
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
                const present = Date.now().toString()
                const expiresin = (Date.now() + (time*timeMupltiple)).toString()

                const muterole = message.guild.roles.cache.get(muteroleid)

                if(!muterole) return descEmbed('Couldnt find a mute role!')

                mutedMember = message.guild.member(mutedMember)
                if(!mutedMember) return descEmbed('Coudln\'t find member...')
                const isAlreadyMuted = mutedMember.roles.cache.find(role => role.id == muteroleid );

                if(isAlreadyMuted) return descEmbed('User already muted!')


            client.muted_members.set(Date.now().toString(), {
                guildid: message.guild.id,
                userid: mutedMember.id,
                currtime: present,
                expiresin: expiresin
            })

            mutedMember.roles.add(muterole)

            connection.query(`INSERT INTO s581_GUILD_CONFIG.muted_members(guildid, userid, currtime, expiresin)
                VALUES(${message.guild.id}, ${mutedMember.id}, ${present}, ${expiresin});`)
           
                message.channel.send(basicEmbed(client, message, args, text, `Muted!`, `🤫`, `${mutedMember} was muted by ${message.author}\n**Duration:** ${time}${denoter}`))
            
            if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return

            client.emit('customlog', message, `Ordered to *Mute*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Mute**\n*Target:* ${mutedMember}\n*Duration*: ${time}${denoter}` )
            
            } else {
                return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `😠`, `Please check the usage: \n ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                \n **Acceptable times:** \n *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`))
            }
            
    }
}