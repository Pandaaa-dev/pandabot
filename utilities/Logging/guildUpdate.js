const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, oldGuild, newGuild){
        const actualGuild = newGuild
        const guildConfig = client.guilds_config.get(newGuild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
         const isGuild = client.guilds.cache.get(actualGuild.id)
         if(!isGuild) return
         const loggingChannel = actualGuild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return

        if(!actualGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return 

        const AuditLogs = await actualGuild.fetchAuditLogs({limit: 1, type: 'GUILD_UPDATE'})
        const requiredLog = AuditLogs.entries.first()
        if(!requiredLog) return
        if(Date.now() - requiredLog.createdTimestamp > 2500) return
        const changesStringArr = []
        requiredLog.changes.forEach(change => {
            const string = `\`${change.key}:\` *From* \`${change.old == undefined? 'nothing': change.old}\` *to* \`${change.new == undefined? 'nothing': change.new}\``
            changesStringArr.push(string)
        })
        const changeString = changesStringArr.join(' \n')
        changeString.substr(changeString.lastIndexOf('\n', 2))
        await loggingChannel.send(loggingEmbed(client, `Guild Update`, actualGuild, `The guild was **updated** by ${requiredLog.executor}.\n\n${changeString}`))
    }

}