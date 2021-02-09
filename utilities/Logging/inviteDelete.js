const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, invite){
        const guild = invite.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        
        
       if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
       
       const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'INVITE_DELETE'})
       const requiredLog = AuditLog.entries.first()
    
       if(!requiredLog) return
       if(Date.now() - requiredLog.createdTimestamp > 5000) return

       loggingChannel.send(loggingEmbed(client, `Invite Deleted`, guild, `Invite with the code \`${invite.code}\`was **deleted.**\n**For**: ${invite.channel}\n**By**: ${requiredLog.executor} `)) 
    }

}