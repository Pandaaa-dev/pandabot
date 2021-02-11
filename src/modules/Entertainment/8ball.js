// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: '8ball',
    description: '8 ball command', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <...question>\`\n*(...question means it doesnt necessarily need to be one word. You can add as many words to ask your desired question here>)*`
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: Infinity,
    highValue: false, 
    module: 'Entertainment',
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
            //Real logic mf
        const possibilities = ['Yes.', 'No.', 'Absolutely not.', 'Absolutely', "Sorry but aint no chance in hell honey.", "Possibly...", "Perhaps...?", "Idk dude i just work here part-time" ]

        const fullMessage = `
        Question by <@${message.author.id}>:
        ${text}
        
        Answer:\n${possibilities[Math.floor(Math.random() * possibilities.length)]}
        `
        message.channel.send(basicEmbed(client, message, args, text, '8 Ball Special!', `🎱`, fullMessage))
    }
}