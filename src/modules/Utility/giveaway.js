// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const getRandom = require('../../../utilities/getRandom')
module.exports = {
    name: 'giveaway',
    description: 'Makes a giveaway', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <time> <@channelid> <numberOfWinners> <prize> \``
        // const multiple = `Acceptable times: *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 4,
    maxArgs: 15,
    module: 'Utility',
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

       if(args[0].endsWith('m') ||
          args[0].endsWith('h') ||
          args[0].endsWith('d')) {

            const channelToSend = message.mentions.channels.first()

            if(!channelToSend) {
                 return message.channel.send(basicEmbed(client, message, args, text, `No channels`, `>:(`, `No channel specified!*`))
            }
            if(isNaN(args[2])){
                return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `>:(`, `Please check the usage: ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                Acceptable times: *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`))            }
            const numberOfWinners = args[2]
            console.log(numberOfWinners)
             let denoter = ''
              let timeMupltiple = 0
              const array = args[0].split('')
              array.splice(-1,1)
              let time = array.join('')
            const extraText = args.splice(3, Infinity).join(' ')
            if(args[0].endsWith('m')){
                
                timeMupltiple = 60000
                console.log(time)
                denoter = ' minute(s)'
            } else if(args[0].endsWith('h')){
                if(time > 168){
                    time = 168
                }
                timeMupltiple = 3600000 
                denoter = ' hour(s)'
            } else if(args[0].endsWith('d')) {
                if(time > 7){
                    time = 7
                }
                timeMupltiple = 86400000 
                denoter = ' day(s)'
            }
            
            const iconURL = message.guild.iconURL({format: 'png',    dynamic: true, size: 1024})
            const embed = new MessageEmbed() 
            .setTitle(">> " +"Giveaway" + ` \`🎉\``)
            .setDescription(`***Hosted by:*** <@${message.author.id}>
                            ***Time:*** *${time}${denoter}*
                            ***Prize:*** *${extraText}*`)
            .setTimestamp()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter(`${message.guild.name} || ${client.user.username}`, iconURL );
           const giveAwayMessage = await channelToSend.send(embed)

            giveAwayMessage.react(`🎉`)
            const rn = Date.now()
            const filter = (reaction, user) => reaction.emoji.name === '🎉' && user.bot == false && user.id != client.user.id;   
            const collector = giveAwayMessage.createReactionCollector(filter, { time: time * timeMupltiple, dispose: true });
            collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
            collector.on('end', collected => {
                let winners = []
                let result = []
                collected.map(u => {
                 u.users.cache.map(u => {
                     if(u.id == client.user.id) return
                     result.push(u.id)
                 })
                 winners = getRandom(result, numberOfWinners)
                 console.log(u.count)
                 console.log(winners)
                })
                const winnerString = '<@' + winners.join('> \n <@') + '>'
                winnerString.substring(winnerString.lastIndexOf('<@'))
                giveAwayMessage.channel.send(basicEmbed(client, message, args, text, `Winner(s)`, `\`🎉\``, `The **Winners** for the giveaway hosted by <@${message.author.id}> with a prize of *${extraText}* are: \n${winnerString}`))
                console.log(`Collected ${collected.count} items, took ${Date.now()- rn}ms`)
            });
      
        } else {
                return message.channel.send(basicEmbed(client, message, args, text, `Not the correct way!`, `>:(`, `Please check the usage: ${this.usage(client.guilds_config.get(message.guild.id).prefix).join(' \n')}
                Acceptable times: *<number>m* (minute), *<number>h* (hour), *<number>d (days)\n *Max day = **7** *`))
            }

    }
}  