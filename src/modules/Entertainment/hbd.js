// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'hbd',
    description: 'Wish someone a happy birthday', 
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
    maxArgs: Infinity,
    highValue: false, 
    module: 'Entertainment',

    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        'https://media3.giphy.com/media/KdC9XVrVYOVu6zZiMH/giphy.gif',
        'https://www.quoteswishesmsg.com/wp-content/uploads/2019/09/original_1.gif',
        'http://www.happybirthdaypics.org/wp-content/uploads/2017/12/Happy-Birthday-Cat-Image.gif',
       'https://birthdaycake24.com/uploads/worigin/2019/10/29/birthday-gif5db83c5a86e02_62a1f6b87b5f3a789a88ae423be83bc4.gif'
    ],        
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Birthday Wish`, '🎂', `${message.author} wishes ${text} a happy birthday!`, this.giflinks))
    }
}
