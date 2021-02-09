// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'uinfo',
    description: 'Shows a users info', 
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
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    module: 'Utility',

    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        let user = {}
        const iconURL = message.guild.iconURL({format: 'png',    dynamic: true, size: 1024})

        const mentionedUser = message.mentions.users.first()
        if(!mentionedUser){
            user = message.author
        } else {
            user = mentionedUser
        }
        const guildMember = message.guild.member(user)
        const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL({format: 'png'}))
        .setTitle(user.tag)
        .setFooter(`${message.guild.name} || ${client.user.username}`, iconURL )
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setTimestamp()
        .addFields([
            {name: 'Nickname', value: `${guildMember.nickname? guildMember.nickname : user.username}`}, 
            {name: 'Account Creation Date', value: `${user.createdAt.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })} ${user.createdAt.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}`}, 
            {name: `Joined At`, value: `${guildMember.joinedAt.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })} ${guildMember.joinedAt.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}`},
            {name: 'Highest Role', value: guildMember.roles.highest.name == '@everyone'? 'everyone': guildMember.roles.highest.name },
            {name: 'Roles', value: `${guildMember.roles.cache.array().length}`, inline: true },
            {name: 'Premium', value: `${guildMember.premiumSinceTimestamp? 'true' : 'false'}`, inline: true}
        ]);

        message.channel.send(embed)

    }
}