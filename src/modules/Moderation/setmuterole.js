// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setmuterole',
    description: 'Sets the mute role', 
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
    uniqueText: "Set the mute role to ",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
         const guildConfig =  client.guilds_config.get(message.guild.id)

         const newRole = message.mentions.roles.first()
        const newGuildConfig = {
            ...guildConfig,
            muterole : newRole.id
        }
        client.emit('databaseUpdate',"guild_config.guild_details", "guildid", message.guild.id, "muterole", newRole.id  )
        client.guilds_config.set(message.guild.id, newGuildConfig)
        console.log(client.guilds_config.get(message.guild.id).muterole)
        message.channel.send(basicEmbed(client, message, args, text, "Mute Role Changed!","👍", `${this.uniqueText} <@${newRole.id}>` ))
        
    }
}