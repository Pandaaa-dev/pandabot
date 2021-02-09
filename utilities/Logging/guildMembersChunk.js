const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'guildMembersChunk',
    once: false,
    async run(connection, client, members, guild, chunk){
        const actualGuild = members.first().guild
        if(!actualGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG', {checkAdmin: true})) return
        const guildConfig = client.guilds_config.get(actualGuild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
         const isGuild = client.guilds.cache.get(actualGuild.id)
         if(!isGuild) return
         const loggingChannel = actualGuild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
        const membersArray = []

        members.forEach(member => {
            const memberString = `${member.user.tag} (${member.id}) \n`
            membersArray.push(memberString)
        })
        const fullStringOfMembers = membersArray.join(' ')
        fullStringOfMembers.substr(fullStringOfMembers.lastIndexOf('\n'), 2 )
        
        await loggingChannel.send(loggingEmbed(client, `Possible raid`, actualGuild, `A lot of people joined the server who are from the **same** guild...
                                                                                    I *worry* for my master thats why I will show you some details of it.
                                                                                    **Guild:** ${guild.name} (${guild.id})
                                                                                    Member List:\n${fullStringOfMembers}`))

    }

}