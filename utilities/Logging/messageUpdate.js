const loggingEmbed = require("../loggingEmbed")
module.exports= {
    event: 'messageUpdate',
    once: false,
    async run(connection, client, oldM, newM){
        if(newM.content === oldM.content) return
        if(oldM.author.id === client.user.id || oldM.author.bot) return
        const guild = newM.guild
        const isGuild = client.guilds.cache.get(guild.id)
        if(!isGuild) return 
        const guildConfig = client.guilds_config.get(guild.id)
        if(guildConfig.logging === 0 || !guildConfig.loggingchannelid) return
        const loggingChannel = guild.channels.cache.get(guildConfig.loggingchannelid)
        if(!loggingChannel) return
    console.log(newM.content === oldM.content)
    loggingChannel.send(loggingEmbed(client, `Message Edited`, guild, `Message of ${newM.author} was edited by ${newM.author}\n
                                                                    **Content:**\n${oldM.content}\n***To***\n${newM.content}\n`))
    }
}