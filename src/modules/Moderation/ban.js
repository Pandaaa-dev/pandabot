// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'Ban',
    description: 'Bans a user or multiple users', 
    usage(prefix){
        const returnArray = []

        const single = `\`${prefix}${this.name.toLowerCase()}  @person <...reason>\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  <...reason>\`\n*(... means multiple words can be used here)*`
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [ "BAN_MEMBERS"], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: Infinity,
    module: 'Moderation',

    highValue: false, 
    emoji: null,
    uniqueText: "was banned by",
    giflinks: [ 
               "https://media1.tenor.com/images/acf6d9b7678964a6644642eaccb641ae/tenor.gif?itemid=5204236",
               "https://i.pinimg.com/originals/b3/90/d8/b390d894d375dedd545e64ae342b05f1.gif",
               "https://media1.tenor.com/images/b909e525194ec8edb6d370f5f01fcc64/tenor.gif?itemid=5140211",
               "https://image.myanimelist.net/ui/xUjg9eFRCjwANWb4t4P8QZZq5M6GQNuEuCZeTrYu9ZMMzi2iAraolpDIGftgi31iTFSccWZlkHBRC97UnEbrfdnM3U4Km9KT4h2DXGLVtF0"
    ],
    async execute( message, args, text, client,connection){
        const guildConfig = client.guilds_config.get(message.guild.id)
        if(!message.mentions.users.first()) return descEmbed('No users were mentioned...')
        message.delete()
        message.mentions.users.map(user=> {
           const member = message.guild.member(user)
            if(!member) return descEmbed('Member not found...')
           //Checking if the user is kickable by the bot or not
           if(!member.bannable){
              const embed = errorEmbed(null, client, message, "I dont have permissions!", "I do not have the required permissions for this command! Or, the members highest role is above mine! Please give me the following permissions:\n " +  "\`" +this.requiredPermissions.join('\` and \n \`') + "\`")
            message.channel.send(embed)
            return }

           //Member is Bannable
           args.shift()
           let reason = ''
          if(args.length > 0){
              reason = args.join(' ')
          } 

          
           // kicking the person with or without the reason
           member.ban({reason: reason}).then(async (res, err) => {
               if(err) {
                   //If something wrong happens which probably wont but who knows life is fucked
                   message.channel.send('Something Wrong happened...')
               } 
               
               //Sending the response to the appropriate channel 
               const embed = basicEmbed(client, message, args, text, this.name, "🚫" , `<@${member.id}> was *banned.* \n Reason: \`${reason}\``, this.giflinks)
               await message.channel.send(embed)

               if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return

               client.emit('customlog', message, `Ordered to *Ban*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Ban**\n*Target:* ${member.id}\n${reason?`*Reason:*${reason}`: ''}` )
           })
        })
    }
}