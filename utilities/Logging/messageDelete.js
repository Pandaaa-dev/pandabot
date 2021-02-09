const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'messageDelete',
    once: false,
    async run(connection, client, message){
        // MESSAGE_DELETE
        // console.log('MESSAGE_DELETE 1')
        if(client.tickets.get(message.channel.id)) return
        const guild = message.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        // console.log('MESSAGE_DELETE 2')
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        // console.log('MESSAGE_DELETE 3')
        
        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
        // console.log('MESSAGE_DELETE 4')
        

        // console.log('MESSAGE_DELETE 5')
        let embed
      if(message.embeds.length > 0){
        embed = message.embeds[0].description
      }


      await loggingChannel.send(loggingEmbed(client, `Message Deleted`, guild, `Message of ${message.author} in ${message.channel} was ***deleted***\n
                                                                                **Content:**\n${embed ? `${embed}` : message.content}`))
        
    }

}