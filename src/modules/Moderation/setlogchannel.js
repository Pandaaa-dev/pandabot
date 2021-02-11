// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setlogchannel',
    description: 'Sets the logging channel', 
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

    uniqueText: "",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
                const guildConfig = client.guilds_config.get(message.guild.id);
                if(guildConfig.logging === 0) return message.channel.send(basicEmbed(client, message, args, text, `Loging isn't on!`, `😠`, `Please turn on logging by \`${guildConfig.prefix}setlogger\` before trying to set the logging channel`))
                client.guilds_config.set(message.guild.id, {
                    ...guildConfig,
                    loggingchannelid: message.channel.id
                })
                connection.query(`UPDATE  s581_GUILD_CONFIG.guild_details
                                SET loggingchannelid = '${message.channel.id}'
                                WHERE guildid = "${message.guild.id}";`)
                await message.channel.send(basicEmbed(client, message, args, text, `Logging Channel Set!`, '😃', `This channel has been set as the new logging channel.`))
        }
    
}