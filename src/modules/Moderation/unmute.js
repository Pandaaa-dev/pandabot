// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'unmute',
    description: 'Unmutes a muted person', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} @person\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
      'MUTE_MEMBERS',
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "was unmuted",
    module: 'Moderation',

    giflinks: [ 
        
    ],
    async execute( message, args, text, client,connection){
          const guild_config = client.guilds_config.get(message.guild.id);
          if(!client.muted_members || client.muted_members.array().length < 1) return
             console.log(guild_config);
            if(!guild_config.muterole){
                return message.channel.send(basicEmbed(client, message, args, text, "No Mute Role!", "😲", 
                `You haven't set a mute role for this guild. Please look at the mute command for further information!`))
            }
          const personToUnmute = message.mentions.users.first();
          if(!personToUnmute){
            return  message.channel.send(basicEmbed(client, message, args, text,
                "No mentions!", "😲", `You didn't mention anybody to unmute!` ))
          }
          const mentionedMemberToUnmute = message.guild.member(personToUnmute);

         const hasMuteRole = mentionedMemberToUnmute.roles.cache.filter(role => role.id == guild_config.muterole);
          if(!hasMuteRole){
            return  message.channel.send(basicEmbed(client, message, args, text,
                "Member doesn't have muted role!", "😲", `The member you are trying to unmute doesnt have a mute role!` ))
          }

          const searchToUnmute = client.muted_members.find(member => member.userid == personToUnmute.id && member.guildid == message.guild.id)
          if(!searchToUnmute) return 

          client.muted_members.delete(searchToUnmute.id)
          mentionedMemberToUnmute.roles.remove(hasMuteRole)

          connection.query(`DELETE FROM customer_178208_guilddetails.muted_members WHERE userid = ${personToUnmute.id} AND guildid = ${message.guild.id}`, (rej, res)=> {
            if(rej) console.log(rej)
            console.log(res, "Done")
        })


          if(guild_config.logging === 0 || !guild_config.loggingchannelid) return
          client.emit('customlog', message, `Ordered to *Unmute*`, guildConfig.loggingchannelid,  `*Order by:* ${message.author}\n*Type:* **Unmute**\n*Target:* ${personToUnmute}` )

    }
}