const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'channelDelete',
    once: false,
    async run(connection, client, channel){
    if(!channel.guild) return 
       const guildid = channel.guild.id 
       const guildConfig = client.guilds_config.get(guildid)  
       if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
       const guild = client.guilds.cache.get(guildid)
       if(!guild) return
       const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
       if(!loggingChannel ) return
       if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
       
       const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'CHANNEL_DELETE'})
        
    const channeltoDeleteTICKET =  await client.tickets.get(channel.id)
    
       if(channeltoDeleteTICKET){
        connection.query(`DELETE FROM guild_config.tickets 
                       WHERE (guildid = "${channel.guild.id}" 
                      AND channelid = "${channel.id}");`)
           }
       const requiredLog = AuditLog.entries.first()
        const guildMember = guild.member(requiredLog.executor)
        await  loggingChannel.send(loggingEmbed(client, `Channel Deleted`, guild, `#${channel.name} was deleted by ${requiredLog? guildMember || 'someone' : 'someone'}`))
       
    }

}