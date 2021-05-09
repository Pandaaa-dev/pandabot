// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setnewprefix',
    description: 'Sets the prefix for the guild', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} <prefix>\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_GUILD',
    ], 
    isNSFW: false,
    minArgs: 1,
    module: 'Moderation',

    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "set new prefix: ",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
         const guildConfig = client.guilds_config.get(message.guild.id)
         const newPrefix = args[0];
         const newConfig = {
             ...guildConfig,
             prefix: newPrefix
         }
         client.guilds_config.set(message.guild.id, newConfig)
         connection.query(`UPDATE ${"customer_178208_guilddetails.guild_details"}
         SET ${"prefix"} = "${newPrefix}"
         WHERE ${"guildid"} = "${message.guild.id}";
         `, (rej, res) => {
             if(rej) console.log(rej)    

         })
         console.log(client.guilds_config.get(message.guild.id))
        
         message.channel.send(basicEmbed(client, message, args, text, "Prefix Changed!", 
         "👍", `Prefix changed to: ${newPrefix}`))

    }
}