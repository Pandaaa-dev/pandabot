const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, role){
        const guild = role.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
       
        const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'ROLE_CREATE'})
        const requiredLog = AuditLog.entries.first()
        if(!requiredLog) return
        if(Date.now() - requiredLog.createdTimestamp > 2500) return
       await  loggingChannel.send(loggingEmbed(client, `New Role`, guild, `${requiredLog.target.name} was created by ${requiredLog.executor}`))
    }

}