// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'pruneghosts',
    description: 'Prunes members with no messages', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'ADMINISTRATOR'
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
           const guild = message.guild

           guild.members.cache.forEach(mem => {
               const lastMessage = mem.lastMessageID
               console.log(lastMessage, mem.user.username)
                if(!lastMessage){
                    console.log(mem.user.username)
                }
            //    if(!lastMessage){
            //        const dmChannel = mem.createDM()
            //        dmChannel(basicEmbed(client, member, args, text, `You have been kicked!`, 'D:', `From: ${guild.name}\nFor: Inactivity(You had 0 messages in the server)\nBy: ${message.author.tag}`))
            //        dmChannel.delete()
            //        mem.kick()
            //    }
           })
    }
}