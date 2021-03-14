const loggingEmbed = require("../loggingEmbed")
const makeWelcomeCanvas = require('../welcomeCanvas')
const path = require('path')
// require('../../src/assets/2.png')
module.exports= {
    once: false,
    async run(connection, client, member){
            const guildConfig = client.guilds_config.get(member.guild.id);
            if(!guildConfig || guildConfig.sightseeing === 1) return
            if(guildConfig.nonewaccounts > 0 || guildConfig.nonewaccounts) {
                const memberAccountTimestamp =  member.user.createdTimestamp/(1000*60*60*24)
                const presentTimestamp = Date.now()/(1000*60*60*24)
                const accountAge = presentTimestamp - memberAccountTimestamp
                if(accountAge <= guildConfig.nonewaccounts){
                    member.kick("Account not older than the given age.")
                }
               if(client.muted_members.get(member.id)){
                   if(member.guild.roles.cache.find(role => role.id == guildConfig.muterole)){
                   member.roles.add(guildConfig.muterole)
               }
                }
            }
            
            if(guildConfig.generalrole){
                const role = member.guild.roles.cache.get(guildConfig.generalrole)
                if(!role) return
                member.roles.add(role)
            }

            
            const newPath = path.join(__dirname, '../../src/assets/2.png')
            if(guildConfig.welcomechannelid){
                const welcomeChannel = member.guild.channels.cache.find(c => c.id == guildConfig.welcomechannelid);
                if(welcomeChannel){
                    const attachment = await makeWelcomeCanvas(member, newPath)
            const message = `Hey ${member}! Welcome to ${member.guild.name}!`
                    // message.attachments.setFile(attachment, 'userfile.png')
                    welcomeChannel.send(message, {
                        files: [{
                            ...attachment
                        }]
                    })
                }
            }       
            if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
            const guild = client.guilds.cache.get(member.guild.id)
            const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
            if(!loggingChannel) return
            await loggingChannel.send(loggingEmbed(client, `Member Joined`, guild, `${member} just joined the server`))
    }

}