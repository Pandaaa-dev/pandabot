const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, guild, user){
        const guildConfig = client.guilds_config.get(guild.id)

        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
         const isGuild = client.guilds.cache.get(guild.id)
         if(!isGuild) return
         const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return

        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return

        const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'MEMBER_BAN_REMOVE'})

        const requiredLog = AuditLog.entries.first()
        const member = guild.member(requiredLog.executor)
        await loggingChannel.send(loggingEmbed(client, `User Unbanned`, guild, `User with id \`${user.id}\` or \`${user.tag}\` was unbanned by ${member? member: 'Someone'}`))

      
    }

}