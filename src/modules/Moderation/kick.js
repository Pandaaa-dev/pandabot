const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'kick',
    description: 'A simple smooch to make your day better!', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: ['KICK_MEMBERS'], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 10,
    module: 'Moderation',

    highValue: true, 
    emoji: null,
    uniqueText: "was kicked by",
    giflinks: [ "https://media.tenor.com/images/8989a6ee6d64bf7a40e1e734f08bf488/tenor.gif",
                "https://i.pinimg.com/originals/9e/2c/d7/9e2cd795ae1333b9ea0078204b4ed009.gif",
                "https://media.tenor.com/images/51e2ba00b6246dbfbbd97a2f38c8307c/tenor.gif",
                "https://i.kym-cdn.com/photos/images/newsfeed/001/054/543/c22.gif"
                ],
    async execute( message, args, text, client,connection){
        message.delete()
        const guildConfig = client.guilds_config.get(message.guild.id)
        const member = message.mentions.users.first()
        if(!member) return descEmbed('You did not mention anybody...')
        const guildMember = message.guild.member(member)
        if(!guildMember) return descEmbed('Could not find guild member...')
        console.log(guildMember.kickable)
        if(!guildMember.kickable){
            const embed = errorEmbed(null, client, message, "I dont have permissions!", "I do not have the required permissions for this command! Or, the member is not Kickable. Please give me the following permissions:\n " +  "\`" +this.requiredPermissions.join('\` and \n \`') + "\`")
            return message.channel.send(embed)
        }

           //Member is Kickable
            args.shift()
            let reason = ''
           if(args.length > 0){
               reason = args.join(' ')
           } 

            reason = reason + `\` - by ${message.author.tag}\``

        //    kicking the person with or without the reason
           
        guildMember.kick(reason).then( async (res, err) => {
               if(err) {
                   //If something wrong happens which probably wont but who knows life is fucked
                   message.send('Something Wrong happened...')
               } 
               //Sending the response to the appropriate channel 
               const embed = basicEmbed(client, message, args, text, this.name, "👢" , `<@${member.id}> was *kicked.* \n Reason: \`${reason}\``, this.giflinks)
              await message.channel.send(embed)
               
               if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return

               client.emit('customlog', message, `Ordered to *Kick*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Kick**\n*Target:* ${member}\n${reason?`*Reason:*${reason}`: ''}` )
           })
    
    }
}

// (connection, client, message, title, channelid, string)