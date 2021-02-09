// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setname',
    description: 'Sets the name for the bot', 
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
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 5,
    highValue: false, 
    module: 'Utility',

    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
            message.delete()
            const clientAsMember = message.guild.member(client.user.id)
            clientAsMember.setNickname(text, 'Command').then(res => {
                return  message.channel.send(basicEmbed(client,message,args,text,`Nickname Changed`, 'D:', `**Nickname changed to:** *${text}*`))
            }).catch(e => {
                console.log(e)
            })
    }
}