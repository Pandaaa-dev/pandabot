const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'Kick',
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
        message.mentions.users.map(user=> {
           const member = message.guild.member(user)

           //Checking if the user is kickable by the bot or not
           if(!member.kickable){
              const embed = errorEmbed(null, client, message, "I dont have permissions!", "I do not have the required permissions for this command! Please give me the following permissions:\n " +  "\`" +this.requiredPermissions.join('\` and \n \`') + "\`")
            message.channel.send(embed)
            return  
           }

           //Member is Kickable

           //Checking if the message author gave a reason
           let containsReason= false
           args.forEach(arg => {
               if(arg.startsWith("%")){
                   containsReason = true
               }
           })
           let reason = ' '

           if(containsReason){
                reason = args.join(" ").split("%").pop()
           }
            reason = reason + ` - by ${message.author.tag}`
           // kicking the person with or without the reason
           member.kick(reason).then((res, err) => {
               if(err) {
                   //If something wrong happens which probably wont but who knows life is fucked
                   message.send('Something Wrong happened...')
               } 
               //Sending the response to the appropriate channel 
               const embed = basicEmbed(client, message, args, text, this.name, "👢" , `<@${member.id}> was *kicked.* \n Reason: \`${reason}\``, this.giflinks)
               message.channel.send(embed)
           })
        })
    }
}