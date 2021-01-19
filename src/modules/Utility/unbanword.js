// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'unbanword',
    description: 'Unbans a word', 
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
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
           message.delete()
           const wordToDeleteCol = client.banned_words.filter(word => {
               if(+word.guildid == message.guild.id && word.word == args[0]){ return word}
            })
            const wordToDelete = wordToDeleteCol.first()            
            if(!wordToDelete){
                return message.channel.send(basicEmbed(client, message, args, text, `Cannot find word!`, `D:`, `Cannot find the specified word in the database` ))

            }
            connection.query(`DELETE FROM ${"guild_config.banned_words"}
                                          WHERE id = ${wordToDelete.id};
            `,(rej,res) => { 
              console.log(client.banned_words.delete(wordToDelete.id), 'DELETED')  
                if(rej) console.log(rej)
                console.log(res)
            return message.channel.send(basicEmbed(client, message, args, text, `Unbanned Word!`, `:D`, `**Unbanned word:** \`${args[0]}\`` ))
            })
          
    }
}