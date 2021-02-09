// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'close',
    description: 'Closes a ticket', 
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
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    emoji: null,
    module: 'Ticket',

    // cooldown: 600,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
         const channeltoDelete =  client.tickets.find(ticket => ticket.guildid == message.guild.id.toString() && ticket.channelid == message.channel.id.toString() && ticket.userid == message.author.id)

         const actualChannel = await message.guild.channels.cache.find(channel => channel.id == channeltoDelete.channelid)

         if(!actualChannel) return
         if(!channeltoDelete){
             return message.channel.send(basicEmbed(client, message,args, text, `Incorrect Config`, '-.-', `You are either not the person that made this ticket or youre trying to close the wrong channel.`))
         }
         if(!actualChannel.deletable){
            return message.channel.send(basicEmbed(client, message,args, text, `Missing Permissions!`, '-.-', `I **dont** have the permission:\n\`MANAGE_CHANNELS\` `))
         }
         
         connection.query(`DELETE FROM guild_config.tickets 
                        WHERE (guildid = "${message.guild.id}" 
                        AND channelid = "${message.channel.id}" 
                        AND userid = "${message.author.id}");`)

         await client.tickets.delete(channeltoDelete.id)
         await message.channel.delete()
    }
}