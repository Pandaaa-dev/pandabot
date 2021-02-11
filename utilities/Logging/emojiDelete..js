const loggingEmbed = require("../loggingEmbed")

module.exports= {
    event: 'emojiDelete',
    once: false,
    async run(connection, client, emoji){
        
        const guildid = emoji.guild.id 
        const guildConfig = client.guilds_config.get(guildid)  
        if(!guildConfig || guildConfig.sightseeing === 1) return
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const guild = client.guilds.cache.get(guildid)
        if(!guild) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        
        if(!loggingChannel) return

        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
        
        const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'EMOJI_DELETE'})
        const requiredLog = AuditLog.entries.first()
        const member = guild.member(requiredLog.executor)
        await loggingChannel.send(loggingEmbed(client, `Emoji Deleted`, guild, `${emoji} was deleted by ${member}`))
    }

}