const loggingEmbed = require("../loggingEmbed")

module.exports= {
    event: 'customlog',
    once: false,
    async run(connection, client, message, title, channelid, string){
        const guild = message.guild
        const loggingChannel =  guild.channels.cache.get(channelid)
        if(!loggingChannel) return
      await loggingChannel.send(loggingEmbed(client, title, guild, string))
    }

}