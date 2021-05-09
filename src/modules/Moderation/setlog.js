// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setlogger',
    description: 'Toggles the logging for the guild', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
        'ADMINISTRATOR',
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    cooldown: 60*60,
    module: 'Moderation',

    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
        let newLogging = ''
            const guildConfig = client.guilds_config.get(message.guild.id);
            if(guildConfig.logging === 1){
                newLogging = 0
            } else if(guildConfig.logging ===0) {
                newLogging = 1
            }
            client.guilds_config.set(message.guild.id, {
                ...guildConfig,
                logging: newLogging
            })
            connection.query(`UPDATE  customer_178208_guilddetails.guild_details
                            SET logging = ${newLogging}
                            WHERE guildid = "${message.guild.id}";`)
            await message.channel.send(basicEmbed(client, message, args, text, `Logging ${newLogging === 0? 'Unset': 'Set'}!`, '😃', `Logging has been turned ${newLogging ===0? 'off': 'on'} for this server! ${newLogging ===1? `Please select a channel to start logging by typing \`${guildConfig.prefix}setlogchannel\` in the channel you want the bot to keep logs in.`: ''}`))
    }
}