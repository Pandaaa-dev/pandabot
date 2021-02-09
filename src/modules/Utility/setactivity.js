// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setactivity',
    description: 'Sets the activity for the bot', 
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
    minArgs: 2,
    maxArgs: 10,
    highValue: false, 
    emoji: null,
    module: 'Utility',
    owner: true,
    uniqueText: "uniquetext",
    giflinks: [ 
    ],
    async execute( message, args, text, client){
        message.delete()
        args[0] = args[0].toLowerCase()
        if(args[0]== 'playing' || args[0]== 'streaming' || args[0]== 'listening' || args[0]== 'watching' ){
            const activityType = args.shift()
            const restArgs = args.join(' ')
            client.user.setActivity(restArgs, {type : activityType.toUpperCase()}).then(res => {
                return  message.channel.send(basicEmbed(client,message,args,text,`Set Activity!`, ':D', `Set Activity to: \n${activityType} ${restArgs}`))

            })
        }
    }
}