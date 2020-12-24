// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nopictures',
    description: 'Stops picture perms', 
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
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "set no picture for",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){

        if(args.length == 0){
            if(message.channel.type == "text" || message.channel.type == "news" || message.channel.type == "category" || message.channel.type == "store"){
                const roleArray = []
                message.guild.roles.cache.forEach(role => {
                if(message.guild.member(client.user.id).roles.highest.comparePositionTo(role.id) <= 0) return 
                console.log(role.name)
                const roleObj = {
                    id: role.id, 
                    deny: ['ATTACH_FILES', 'EMBED_LINKS']
                }
                roleArray.push(roleObj)
                
            })
            console.log(roleArray)
            message.channel.overwritePermissions(roleArray, ".nopictures enabled")
            message.channel.send(basicEmbed(client, message, args, text, "NoPictures set!", "👍" ,"No user with their highest role below me will be able to send pictures in this channel now."))
        }
        }
    
    }
}