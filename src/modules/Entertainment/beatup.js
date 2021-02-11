// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'beatup',
    description: 'Beat someone/something up', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <...text>\`\n*(... means multiple words can be used here)*`
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
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
    giflinks:[ 
        'https://fantasyandanime.files.wordpress.com/2014/07/dlpqbhn.gif',
        'https://media.tenor.com/images/a913f5b7e0059ebd8fe4df3efe65e92b/tenor.gif',
        'https://i.pinimg.com/originals/01/3d/d0/013dd0d7302cdbf8e1e6547fe76c06ed.gif',
        'https://pa1.narvii.com/6209/698aa067e91fc638d887130ba4758e5f3aa3159c_hq.gif'
         ],
    async execute( message, args, text, client){
 
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Beat up`, '🥊', `${message.author} wants to beat up ${text}`, this.giflinks))
    }
}