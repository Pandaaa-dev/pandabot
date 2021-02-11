const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, invite){
        const guild = invite.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(!guildConfig || guildConfig.sightseeing === 1) return
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        
        
       if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
       
       const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'INVITE_CREATE'})
       const requiredLog = AuditLog.entries.first()
    
       if(!requiredLog) return
       if(Date.now() - requiredLog.createdTimestamp > 5000) return

       loggingChannel.send(loggingEmbed(client, `Invite Created`, guild, `Invite was created with the code \`${invite.code}\`\n**For**: ${invite.channel}\n**By**: ${requiredLog.executor} `)) 
    }
}