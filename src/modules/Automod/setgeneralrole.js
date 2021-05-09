// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')

module.exports = {
    name: 'setgeneralrole',
    description: 'Sets the general role for a guild', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} @role\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} nothing\`(If you want to stop it)`
        returnArray.push(single)
        returnArray.push(multiple)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
           'ADMINISTRATOR'
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    module: 'Automod',
    cooldown: 60*5,
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
        let whatToSet
          const guildConfig = client.guilds_config.get(message.guild.id);
        if(!guildConfig) return
        const role = message.mentions.roles.first()
        if(!role){
            if(args[0].toLowerCase() === 'nothing' ){
                whatToSet = null
            } else {
                return message.channel.send(descEmbed('You did not mention a role'))
            }
        } else {
            whatToSet = role.id
        }
        
        client.guilds_config.set(message.guild.id, {
            ...guildConfig,
            generalrole: role.id
        })
        connection.query(`UPDATE customer_178208_guilddetails.guild_details
                        SET generalrole = ${whatToSet}
                        WHERE guildid = ${message.guild.id}`)
        message.channel.send(basicEmbed(client, message, args, text, `General role set!`, '👍', `Set the general role to ${role? role : 'nothing' }. ${role? 'I will add this role to every member that joins now!' : ''}`))
    }
}