const loggingEmbed = require("../loggingEmbed")

module.exports= {
    event: 'channelCreate',
    once: false,
    async run(connection, client, channel){
        if(!channel.guild) return 
       const guildid = channel.guild.id 
       const guildConfig = client.guilds_config.get(guildid)  
       if(!guildConfig) return
       if(guildConfig.sightseeing === 1) return
       if(guildConfig.muterole){
        const role =  channel.guild.roles.cache.find(role => role.id === guildConfig.muterole)
        if(!role) return 
       await  channel.createOverwrite(role,  {
           SEND_MESSAGES: false,
           EMBED_LINKS:false,
           ATTACH_FILES:false,
           ADD_REACTIONS:false
       }, 'Set Mute Role')
      }
       if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
       const guild = client.guilds.cache.get(guildid)
       if(!guild) return
       const newChannel = guild.channels.cache.get(channel.id)
       const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
       if(!loggingChannel || !newChannel ) return
       if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})){
           return await  loggingChannel.send(loggingEmbed(client, `New Channel Created`, guild, `${newChannel} was created by ${requiredLog? guildMember || 'someone' : 'someone'}`))
       }

       const AuditLog = await guild.fetchAuditLogs({limit: 1, type: 'CHANNEL_CREATE'})

       const requiredLog = AuditLog.entries.first()
       const guildMember = guild.member(requiredLog.executor)
       await  loggingChannel.send(loggingEmbed(client, `New Channel Created`, guild, `${newChannel} was created by ${requiredLog? guildMember || 'someone' : 'someone'}`))
    //   client, title, guild, message,
       if(guildConfig.muterole){
         const role =  channel.guild.roles.cache.find(role => role.id === guildConfig.muterole)
         if(!role) return 
        await  channel.createOverwrite(role,  {
            SEND_MESSAGES: false,
            EMBED_LINKS:false,
            ATTACH_FILES:false,
            ADD_REACTIONS:false
        }, 'Set Mute Role')
       }
    }
}