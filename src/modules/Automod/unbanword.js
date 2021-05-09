// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'unbanword',
    description: 'Unbans a word from the banned database', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <word>\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_CHANNELS',
    ], 
    isNSFW: false,
    minArgs: 1,
    module: 'Automod',
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
            const wordToDelete = client.banned_words.array().find(word => +word.guildid == message.guild.id && word.word == args[0] )
            //  const wordToDelete = wordToDeleteCol.first()     

            if(!wordToDelete){
                return message.channel.send(basicEmbed(client, message, args, text, `Cannot find word!`, `❌`, `Cannot find the specified word in the database` ))
            }
             client.banned_words.delete(wordToDelete.id)
             
            connection.query(`DELETE FROM ${"customer_178208_guilddetails.banned_words"}
                                     WHERE word = "${wordToDelete.word}"
                                     AND guildid = "${message.guild.id.toString()}"; `,(rej,res) => { 
                if(rej) console.log(rej)
            return message.channel.send(basicEmbed(client, message, args, text, `Unbanned Word!`, `✔️`, `**Unbanned word:** \`${args[0].toLowerCase()}\`` ))
            })
          
    }
}