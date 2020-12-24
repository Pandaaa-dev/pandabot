// check these routes!
const { GuildMember } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'mute',
    description: 'Mutes a user', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()} 5m @person %reason\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 2,
    maxArgs: 10,
    highValue: false, 
    emoji: null,
    uniqueText: "was muted by",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute(message, args, text, client){
        // const duration = args.pop().toString().toLowerCase();

        const guildConfig = client.guilds_config.get(message.guild.id)
        const muteroleid = guildConfig.muterole;
        const prefix = guildConfig.prefix;

        if(!muteroleid){
            return message.channel.send(basicEmbed(client, message, args, text, "No Mute Role!", "😲", 
            `You haven't set a mute role for this guild. Please look at the mute command for further information!`))
        }
    
        let  mutedMember = message.mentions.users.first()
        console.log(args.splice(0, 1))
         const argsWithoutMention = args

         if(!argsWithoutMention[0].endsWith('m') || argsWithoutMention[0].split('').length > 5 || argsWithoutMention[0].split('').length < 1 ){
           return message.channel.send(basicEmbed(client, message, args, text, "Wrong Usage!", "😲", 
            `The appropriate usage: \n \`${this.usage(prefix).join('\n')}\n`))
         }
         
         mutedMember = message.guild.member(mutedMember)

            const isAlreadyMuted = mutedMember.roles.cache.find(role => role.id == muteroleid );
         
         if(isAlreadyMuted){
            return message.channel.send(basicEmbed(client, message, args, text, "Already Muted", "😲", 
            `The user is already muted `))
         }

         let roleCount = 0
         const removedRoles = []
         
            mutedMember.roles.cache.forEach(role =>{ 
                if(role.name == "@everyone" || role.id == muteroleid) return
                roleCount++
            })     


        //     if(roleCount){
        //     await mutedMember.roles.cache.forEach(role => {
        //         if(role.name == "@everyone" || role.id == muteroleid) return
        //             console.log(role)
        //            removedRoles.push(role)
        //            mutedMember.roles.remove(role) 
        //     })
        // }

        mutedMember.roles.add(muteroleid)
        
         const tableName = "guild_config.muted_members"

        //  client.on('databaseInsert', async (tableName, valuekey1, valuekey2, valuekey3, value1, value2, value3) => {
         let date = new Date()

        const currtime = date.toISOString().slice(0, 19).replace('T', ' '); 
         
        console.log(currtime)
         if(argsWithoutMention[0].split('').length == 2 ){
            var expirydate = new Date();
            expirydate.setMinutes( expirydate.getMinutes() + +argsWithoutMention[0].split('')[0] );
           const dbdate = expirydate.toISOString().slice(0, 19).replace('T', ' ');
           
           client.emit("databaseInsert", 
           tableName,  
           "guildid",
            "userid",
            "currtime",
            "expiresin", 
             message.guild.id, 
             mutedMember.id,  
             "CURRENT_TIMESTAMP()",
                 `DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ${+argsWithoutMention[0].split('')[0]} MINUTE)`)

                 client.muted_members.set(mutedMember.id, {
                     guildid: mutedMember.guild.id,
                     userid: mutedMember.id,
                     currtime: currtime,
                    expirydate: dbdate
                 } )

             return  message.channel.send(basicEmbed(client, message, args, text,
             "Muted!", "😲", `<@${mutedMember.id}> was muted for ${+argsWithoutMention[0].split('')[0]} minutes! \n\n \` - By ${message.author.username}\``))
                 
         }
          if(argsWithoutMention[0].split('').length == 3 ){
              const number = +(argsWithoutMention[0].split('')[0] + +argsWithoutMention[0].split('')[1])
              console.log(number)
            
             client.emit("databaseInsert", 
              tableName, 
                 "guildid",
                  "userid",
                  "currtime",
                  "expiresin", 
                   message.guild.id, 
                   mutedMember.id,  
                   "CURRENT_TIMESTAMP()",
                  `DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ${number} MINUTE)`)
                  var expirydate = new Date();
                  expirydate.setMinutes( expirydate.getMinutes() + number );
                 const dbdate = expirydate.toISOString().slice(0, 19).replace('T', ' ');
                    client.muted_members.set(mutedMember.id, {
                        guildid: mutedMember.guild.id,
                        userid: mutedMember.id,
                        currtime: currtime,
                       expirydate: dbdate
                      } )
                      return  message.channel.send(basicEmbed(client, message, args, text,
                        "Muted!", "😲", `<@${mutedMember.id}> was muted for ${number} minutes! \n\n \` - By ${message.author.username}\``));

            } 

            if(argsWithoutMention[0].split('').length == 4 ){
                const number = +(argsWithoutMention[0].split('')[0] + argsWithoutMention[0].split('')[1] + argsWithoutMention[0].split('')[2])
                console.log(number)
               client.emit("databaseInsert", 
                tableName, 
                   "guildid",
                    "userid",
                    "currtime",
                    "expiresin", 
                     message.guild.id, 
                     mutedMember.id,  
                     "CURRENT_TIMESTAMP()",
                    `DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ${number} MINUTE)`)
                    
                    var expirydate = new Date();
                    expirydate.setMinutes( expirydate.getMinutes() + number );
                   const dbdate = expirydate.toISOString().slice(0, 19).replace('T', ' ');
                      client.muted_members.set(mutedMember.id, {
                          guildid: mutedMember.guild.id,
                          userid: mutedMember.id,
                          currtime: currtime,
                         expirydate: dbdate
                        } )
                    return  message.channel.send(basicEmbed(client, message, args, text,
                      "Muted!", "😲", `<@${mutedMember.id}> was muted for ${number} minutes! \n\n \` - By ${message.author.username}\``))
              } 
       
         
    }
}