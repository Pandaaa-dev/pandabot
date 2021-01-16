// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'nolinks',
    description: 'Sets a channel to have absolutely no links', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefixx}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client,connection){
        if(client.noLinkChannels.get(message.channel.id)){
            connection.query(`DELETE FROM guild_config.no_links
            WHERE channelid = ${message.channel.id};
            `)
            client.noLinkChannels.delete(message.channel.id)
            return  message.channel.send(basicEmbed(client, message, args, text, "NoLinks turned off!", "👍" ,"NoLinks for this channel has been turned off!"))
        }
        client.noLinkChannels.set(message.channel.id, {
            channelid: message.channel.id,
            guildid: message.guild.id
        })
        connection.query(`INSERT INTO guild_config.no_links(channelid, guildid)
        VALUES(${message.channel.id.toString()}, ${message.guild.id.toString()});
`)
        return  message.channel.send(basicEmbed(client, message, args, text, "NoLinks turned on!", "👍" ,"NoLinks for this channel has been turned on!"))
}
}