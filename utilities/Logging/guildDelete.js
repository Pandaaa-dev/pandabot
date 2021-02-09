const loggingEmbed = require("../loggingEmbed")

module.exports= {
    event: 'guildDelete',
    once: false,
    async run(connection, client, guild){

        if(client.guilds_config){
            client.guilds_config.delete(guild.id)

        }
    if(client.banned_words){
        if(client.banned_words.array().length > 0){
            const banWordsToDelete = client.banned_words.filter(chan => chan.guildid == guild.id)
            console.log(banWordsToDelete, 'BANNED WORDS')
            banned_words.array().forEach(word => {
                client.banned_words.delete(word.id)
            })
        }
    }
 
    console.log(client.noPictureChannels)
    if(client.noPicturesChannels){
        if(client.noPictureChannels.array().length > 0){
        const noPicturesToDelete = client.noPicturesChannels.filter(chan => chan.guildid == guild.id)
        console.log(noPicturesToDelete )
            noPicturesToDelete.forEach(nopic => {
                client.noPictureChannels.delete(nopic.channelid)
            })
        }
    }
    console.log(client.onlyPictureChannels)
    if(client.onlyPictureChannels){
        if(client.onlyPictureChannels.array().lenghth > 0) {
            const onlyPicturesToDelete = client.onlyPicturesChannels.filter(chan => chan.guildid == guild.id)
            console.log(onlyPicturesToDelete, 'only PCITURES')
            onlyPicturesToDelete.forEach(onlypic => {
                client.onlyPictureChannels.delete(onlypic.channelid)
            })
            
        }
    }

    
    if(client.noLinkChannels){
        if(client.noLinkChannels.array().length > 0){

            const noLinkToDelete = client.noLinkChannels.filter(chan => chan.guildid == guild.id)
            console.log(noLinkToDelete, 'NOLINKS')
            noLinkToDelete.forEach(nolink => {
                client.noLinkChannels.delete(nolink.channelid)
            })
        }
    }

    //    const  cooldownsToDelete = client.cooldown.filter(chan => chan.guildid == guild.id)
    //    console.log(cooldownsToDelete)
    if(client.muted_members){
        if(client.muted_members.array().length > 0){

            const mutedRecordsToDelete = client.muted_members.filter(muted => muted.guildid == guild.id)
            console.log(mutedRecordsToDelete, 'MUTES')
            mutedRecordsToDelete.forEach(mute => {
                client.muted_members.delete(mute.userid)
            })
        }
    }
    if(client.tickets){
        if(client.muted_members.array().length > 0){

            const ticketRecordsToDelete = client.tickets.filter(muted => muted.guildid == guild.id)
            console.log(mutedRecordsToDelete)
            mutedRecordsToDelete.forEach(ticket => {
                client.tickets.delete(ticket.channelid)
            })
        }
    }
    if(client.xpTimestamps){
       client.xpTimestamps.delete(guild.id)
    }

    connection.query(`DELETE FROM banned_words
                     WHERE guildid = ${message.guild.id}`)
  
    connection.query(`DELETE FROM guild_details
                     WHERE guildid = ${message.guild.id}`)
  
    connection.query(`DELETE FROM muted_members
                     WHERE guildid = ${message.guild.id}`)
  
    connection.query(`DELETE FROM no_links
                     WHERE guildid = ${message.guild.id}`)

    connection.query(`DELETE FROM no_pictures
                     WHERE guildid = ${message.guild.id}`)
                     
    connection.query(`DELETE FROM tickets
                     WHERE guildid = ${message.guild.id}`)

    }

}