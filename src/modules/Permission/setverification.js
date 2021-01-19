// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'setverification',
    description: 'desc', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`prefix${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`prefix${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0  ,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){        
        const oldConfig = client.guilds_config.get(message.channel.guild.id)
        if(client.guilds_config.get(message.channel.guild.id).verification == 1){
            connection.query(`UPDATE ${"guild_config.guild_details"}
            SET ${"verification"} = ${0}
            WHERE ${"guildid"} = "${message.guild.id}";
            `,)

            const newConfig = {
                ...oldConfig,
                verification: 0
            }
            client.guilds_config.set(message.channel.guild.id, newConfig)
            return message.channel.send(basicEmbed(client, message, args, text, 'Verification turned off!', `😲`, 'Verification for this server has been turned off!' ))
        } 
        if(!client.guilds_config.get(message.channel.guild.id).verificationchannelid){
            return message.channel.send(basicEmbed(client, message, args, text, 'No Verification channel found!', `😲`, `Verification for this server isn\'t possible if you havent set up a verification channel. \n \`${oldConfig.prefix}setverificationchannel <@channelid>\` `  ))
        }
        
        connection.query(`UPDATE ${"guild_config.guild_details"}
        SET ${"verification"} = ${1}
        WHERE ${"guildid"} = "${message.guild.id}";
        `,)
        
        const newConfig = {
            ...oldConfig,
            verification: 1
        }
        client.guilds_config.set(message.guild.id, newConfig)
        return message.channel.send(basicEmbed(client, message, args, text, 'Verification turned on!', `😲`, 'Verification for this server has been turned on in the selected channel!!' ))
    }
}