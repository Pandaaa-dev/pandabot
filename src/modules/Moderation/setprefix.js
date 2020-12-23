// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setprefix',
    description: 'Sets the prefix', 
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
    uniqueText: "set new prefix: ",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
         const guildConfig = client.guilds_config.get(message.guild.id)
         const newPrefix = args[0];
         const newConfig = {
             ...guildConfig,
             prefix: newPrefix
         }
         client.guilds_config.set(message.guild.id, newConfig)
         client.emit("databaseUpdate", "guild_config.guild_details", "guildid", message.guild.id, "prefix", newPrefix )
         console.log(client.guilds_config.get(message.guild.id))
        
         message.channel.send(basicEmbed(client, message, args, text, "Prefix Changed!", 
         "👍", `Prefix changed to: ${newPrefix}`))

    }
}