const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'roleDelete',
    once: false,
    async run(connection, client, role){
        console.log('bruh')
        const guild = role.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
        console.log('2')
        const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'ROLE_DELETE'})
        const requiredLog = AuditLog.entries.first()
        if(!requiredLog) return
        console.log('3')
        if(Date.now() - requiredLog.createdTimestamp > 2500) return
        console.log('4')
        if(requiredLog.target.id !== role.id) return
        console.log('5')

      await loggingChannel.send(loggingEmbed(client, `Role Deleted`, guild, `\`${role.name}(${role.id})\` was ***deleted*** by ${requiredLog.executor}`))
        

    }

}