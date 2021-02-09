const loggingEmbed = require("../loggingEmbed")
const {Permissions} = require('discord.js')
const sentChanges = []
module.exports= {
    once: false,
    async run(connection, client, oldRole, role){
        const guild = role.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
        
        const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'ROLE_UPDATE'})
        const requiredLog = AuditLog.entries.first()
        if(requiredLog.target.name !== role.name) return
        if(!requiredLog) return
        if(Date.now() - requiredLog.createdTimestamp > 2500) return
      const otherChanges = []
      const changes = []
      const nothingChanged = false
      requiredLog.changes.forEach(change => {
          if(change.key.startsWith('permissions_new')){
            //   console.log(change.old.toArray())
            const oldPerms = new Permissions(+change.old).toArray()
            const newPerms = new Permissions(+change.new).toArray()
            const denied = oldPerms.filter(permString => !newPerms.includes(permString))
            const allowed = newPerms.filter(permString => !oldPerms.includes(permString))
            if(JSON.stringify(oldPerms) == JSON.stringify(newPerms)) {
                nothingChanged = true
            }
            if(denied.length > 0){
                const deniedObj = {NEW_DENIED: [...denied]}
                otherChanges.push(deniedObj)
            }
            if(allowed.length > 0){
                const allowedObj = {NEW_ALLOWED: [...allowed]}
                otherChanges.push(allowedObj)
            } 
            } else if(change.key.startsWith('permissions')) {
            } else {
                otherChanges.push(change)   

            }
    })

    if(oldRole.rawPosition !== role.rawPosition){
        otherChanges.push({newPosition: role.rawPosition})
    }
    if(nothingChanged) return
    const stringifiedUpdate = JSON.stringify(otherChanges)
    
     await loggingChannel.send(loggingEmbed(client, `Role Updated`, guild, `\`${role.name}(${role.id})\` was ***updated*** by ${requiredLog.executor}.\n\n*Changes:*\n*(If you see 'Undefined', it basically means nothing)*\n\`${stringifiedUpdate}\``))
    }

}