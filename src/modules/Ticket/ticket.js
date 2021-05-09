// check these routes!
const { MessageEmbed } = require('discord.js')
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const { copyWithin } = require('../../../utilities/validPerms')

module.exports = {
    name: 'ticket',
    description: 'Creates a ticket', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false,
    module: 'Ticket',
 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
        const guildConfig = client.guilds_config.get(message.guild.id)
        if(guildConfig.ticketsystem == 0 || !guildConfig.ticketcategoryid) return

        let everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone');

        let lastTicketIdx = guildConfig.lastticket

        const usersHistory = client.tickets.filter(ticket => ticket.guildid == message.guild.id.toString() && ticket.userid == message.author.id.toString()).array()


        if(usersHistory.length >= 2){
            return message.channel.send(basicEmbed(client, message, args, text, `Too many tickets!`, `:O`, `Presently, you already have ${usersHistory.length} tickets in the server. End those to make a new one. `))
        }

        const ticketChannel = await message.guild.channels.create(`ticket-${lastTicketIdx + 1}`, {
        type: 'text',
        permissionOverwrites: [
            {
            id: everyoneRole.id,
            deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL']
            }
        ],
        parent: guildConfig.ticketcategoryid
        })

        ticketChannel.send(basicEmbed(client, message, args, text, `Ticket ${lastTicketIdx + 1} created`, ``, `**By:** ${message.author}\nPlease wait till the correspoinding officials tend to you. Thank you for your patience`))
        connection.query(`INSERT INTO customer_178208_guilddetails.tickets (guildid, channelid, userid)
                          VALUES(${message.guild.id.toString()}, ${ticketChannel.id.toString()}, ${message.author.id.toString()})`)

        connection.query(`UPDATE customer_178208_guilddetails.guild_details
                        SET lastticket = ${lastTicketIdx + 1}
                        WHERE guildid = ${message.guild.id}`)

        const presentTime = Date.now()

       await  client.tickets.set(ticketChannel.id, {
            id: presentTime,
            guildid: message.guild.id, 
            channelid:  ticketChannel.id, 
            userid: message.author.id
        })

        await client.guilds_config.set(message.guild.id, {
            ...guildConfig,
            lastticket: lastTicketIdx + 1 
        })
    await  message.channel.send(basicEmbed(client, message, args, text, `Ticket Created!`, '😃', `Hey ${message.author}, we made your ticket! Please visit ${ticketChannel}`))
        // console.log(client.ticke, 'HERE')
    }
}