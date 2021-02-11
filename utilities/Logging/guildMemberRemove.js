const loggingEmbed = require("../loggingEmbed")
module.exports= {
    once: false,
    async run(connection, client, guildMember){
        const guildid = guildMember.guild.id 
       const guildConfig = client.guilds_config.get(guildid)  
       if(!guildConfig || guildConfig.sightseeing === 1) return
       if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
       const guild = client.guilds.cache.get(guildid)
       if(!guild) return
       const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
       if(!loggingChannel ) return

       if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
       
       const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'MEMBER_KICK'})
       const requiredLog = AuditLog.entries.first()
       let kicked = ''
        if(!requiredLog){
            kicked = false
        }
         if(guildMember.id === requiredLog.target.id && Date.now() - requiredLog.createdTimestamp < 2500 ){
            kicked = true
        } else if(guildMember.id !== requiredLog.target.id){
             kicked = false
        }
        console.log(Date.now())
        console.log(requiredLog.createdTimestamp)
        console.log(Date.now() - requiredLog.createdTimestamp)
        
        if(kicked){
            await loggingChannel.send(loggingEmbed(client, 'Member Kicked', guild, `\`${requiredLog.target.tag} (${requiredLog.target.id})\` was **kicked** by ${requiredLog.executor} `))
        } else if(!kicked) {
            await loggingChannel.send(loggingEmbed(client, 'Member Left', guild, `\`${guildMember.user.tag} (${guildMember.id})\` left the server.`))
        }
       
      
    }

}