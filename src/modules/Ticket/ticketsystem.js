// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'ticketsystem',
    description: 'Turns on the ticketing system for the server', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
           'ADMINISTRATOR'
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
            const guildConfig = client.guilds_config.get(message.guild.id)

            console.log(guildConfig)
            
            let ticketSystem = ''
 
                
                console.log(ticketSystem)
                
            if(guildConfig.ticketsystem == 0 && !guildConfig.ticketcategoryid){
                ticketSystem = 1 
                message.channel.send(basicEmbed(client, message, args, text, `Set ticket system`, ':D', `Setting up the ticket system for this server!`))
                const categoryChannel = await message.guild.channels.create(
                     'Tickets',
                     {
                        type: 'category',
                        topic: 'A channel for handling all the topics for the server'
                    }
                )
    
                connection.query(`UPDATE guild_config.guild_details
                SET ticketsystem = ${ticketSystem},
                    ticketcategoryid = "${categoryChannel.id}"
                WHERE guildid = "${message.guild.id}";`, (res, rej) => {
                if(rej) console.log(rej)
                console.log(res)
                })
                client.guilds_config.set(message.guild.id.toString(), {
                    ...guildConfig,
                    ticketsystem: ticketSystem,
                    ticketcategoryid: categoryChannel.id.toString()
     
                })
                return
            }else if(guildConfig.ticketsystem == 1){
                ticketSystem = 0
                message.channel.send(basicEmbed(client, message, args, text, `Shutting down ticket system!`, ':D', `Shutting down the ticket system for this server! You can delete the category channel made by the bot if the bot made any.`))
                connection.query(`UPDATE guild_config.guild_details
                SET ticketsystem = 0,
                    ticketcategoryid = null
                WHERE guildid = "${message.guild.id}";`, (res, rej) => {
                if(rej) console.log(rej)
                console.log(res)
                })
                client.guilds_config.set(message.guild.id.toString(), {
                    ...guildConfig,
                    ticketsystem: 0,
                    ticketcategoryid: null
                })
            }
    }
}