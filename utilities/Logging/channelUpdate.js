const {Permissions} = require('discord.js')
const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'channelUpdate',
    once: false,
    async run(connection, client, oldChannel, newChannel){
      if(!oldChannel.guild) return 
      const guildid = oldChannel.guild.id 
      const guildConfig = client.guilds_config.get(guildid)  
      if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
      const guild = client.guilds.cache.get(guildid)
      if(!guild) return
      // const newChannel = guild.channels.cache.get(channel.id)
      const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
      if(!loggingChannel) return
      if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return

      if(oldChannel.rawPosition !== newChannel.rawPosition){
        await loggingChannel.send(loggingEmbed(client, `Channel Updated`, guild, `Position for ${newChannel} was updated from ${oldChannel.rawPosition} to ${newChannel.rawPosition}`))

      }
      const auditLog = await guild.fetchAuditLogs({limit: 1, type: null})
      const requiredLog = auditLog.entries.first()
      
      if(Date.now() - requiredLog.createdTimestamp > 500) return
      
      if(requiredLog.action == 'CHANNEL_UPDATE'){
      const changes = requiredLog.changes
    
      if(requiredLog.target.id !== newChannel.id)  return 
      if(oldChannel.rawPosition !== newChannel.rawPosition){
        await loggingChannel.send(loggingEmbed(client, `Channel Updated`, guild, `Position for ${newChannel} was updated from ${oldChannel.rawPosition} to ${newChannel.rawPosition}`))

      }
      let requiredStringArray = [`***The changes in ${newChannel} by ${requiredLog? requiredLog.executor|| 'Someone': 'someone'} are:*** \n\n`]
      changes.forEach(change => {
        const string = `\`${change.key}:\` **from** \`${change.old==undefined? 'nothing': change.old}\` **to** \`${change.new == undefined? 'nothing': change.new}\` \n`
        if(typeof(change.old) === Object){
          change.old = JSON.stringify(change.old)
        }
        if(typeof(change.new) === Object){
          change.new = JSON.stringify(change.new)
        }
        requiredStringArray.push(string)
      })
      const finalString = requiredStringArray.join(' ')
      finalString.substr(finalString.lastIndexOf('\n'), 2)
      return await loggingChannel.send(loggingEmbed(client, `Channel Updated`, guild, finalString))
      }


      else if(requiredLog.action == 'CHANNEL_OVERWRITE_CREATE'){

        return  loggingChannel.send(loggingEmbed(client, `Channel Overwrites **Created**`, guild, `***Channel Overwrites in ${requiredLog.target} for ${requiredLog.extra} were **created** by ${requiredLog.executor}***`))
      } 
      
      
      else if(requiredLog.action == 'CHANNEL_OVERWRITE_UPDATE') {
        const newChanges = {}
        requiredLog.changes.forEach(change => {
          if(!change.key.endsWith('_new')){
            if(change.old === change.new) return
            if(change.key === 'allow'){
              const oldPerms = new Permissions(change.old).toArray()
              const newPerms = new Permissions(change.new).toArray()
              const allowed = newPerms.filter(permString => !oldPerms.includes(permString))
              if(allowed.length <1) return
              // const object = {ALLOWED: allowed}
              newChanges['ALLOWED'] = allowed
            }
            if(change.key === 'deny') {
              const oldPerms = new Permissions(change.old).toArray()
              const newPerms = new Permissions(change.new).toArray()
              const denied= newPerms.filter(permString => !oldPerms.includes(permString))
              if(denied.length < 1) return
              const object = {DENIED: denied}
              // newChanges.push(object)
              newChanges['DENIED'] = denied
            }
          }
        })
        if(Object.keys(newChanges).length < 1) return
        const changeString = JSON.stringify(newChanges)
       return  loggingChannel.send(loggingEmbed(client, `Channel Overwrites **Updated**`, guild, `***Channel Overwrites in ${requiredLog.target} for ${requiredLog.extra} were **updated** by ${requiredLog.executor}***
                                                                                                                  **Changes:**\n\`${changeString}\`` ))
      } 
      
      
      else if(requiredLog.action == 'CHANNEL_OVERWRITE_DELETE') {

        loggingChannel.send(loggingEmbed(client, `Channel Overwrite *Deleted*`, guild, `Channel Overwrites in ${requiredLog.target} for ${requiredLog.extra} were deleted by ${requiredLog.executor}`))

       }
    }

}