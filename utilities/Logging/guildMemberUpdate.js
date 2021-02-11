const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'guildMemberUpdate',
    once: false,
    async run(connection, client, oldMember, newMember){
        const actualGuild = newMember.guild
        const guildConfig = client.guilds_config.get(actualGuild.id)
        if(!guildConfig || guildConfig.sightseeing === 1) return
        if(!guildConfig) return
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
         const isGuild = client.guilds.cache.get(actualGuild.id)
         if(!isGuild) return
         const loggingChannel = actualGuild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return

        if(!actualGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return 

        const MEMBER_AuditLogs = await isGuild.fetchAuditLogs({type: 'MEMBER_UPDATE', limit: 1})
        const MEMBER_ROLE_AuditLogs = await isGuild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE', limit: 1})
        let MEMBER_requiredLogs = MEMBER_AuditLogs.entries.first()
        let  MEMBER_ROLE_requiredLogs = MEMBER_ROLE_AuditLogs.entries.first()

        if(Date.now() - MEMBER_requiredLogs.createdTimestamp > 2500 || MEMBER_requiredLogs.target.id !== newMember.id ){
            MEMBER_requiredLogs = null
        }
        if(Date.now() - MEMBER_ROLE_requiredLogs.createdTimestamp > 2500 || MEMBER_ROLE_requiredLogs.target.id !== newMember.id ){
            MEMBER_ROLE_requiredLogs = null
        }
        const changes = []
        let user = ''
        if(MEMBER_ROLE_requiredLogs){
            changes.push(...MEMBER_ROLE_requiredLogs.changes)
            user = MEMBER_ROLE_requiredLogs.executor || 'Someone'
        } 
        if(MEMBER_requiredLogs){
            changes.push(...MEMBER_requiredLogs.changes)
            user =MEMBER_requiredLogs.executor || 'Someone'
        }
        const changeStringArr = []
        changes.forEach(change => {
            if(change.key == '$add'){
                change.key = 'addRole'
           }
           if(change.key == '$remove') {
               change.key = 'removeRole'
            }
            
            changeStringArr.push(change)

        })
        if(changeStringArr.length < 1) return
        await loggingChannel.send(loggingEmbed(client, `Member Update`, actualGuild, `${newMember} was *updated* By ${user.tag}\n\n***Changes:***\n*(If you see 'Undefined', it basically means nothing)*\n\n\`${JSON.stringify(changeStringArr)}\``))
    }

}