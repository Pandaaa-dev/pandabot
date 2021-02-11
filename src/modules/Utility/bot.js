// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const {OWNER} = require('../../../config.json')
module.exports = {
    name: 'bot',
    description: 'Shows some details about the bot', 
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
    emoji: null,
    module: 'Utility',
    uniqueText: "uniquetext",
    giflinks: [ 

    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`***${client.user.username}***`)
            .setDescription(`${client.user.username} is a bot that provides you with basically everything you need to run a server. **Automod, Entertainment, Games, XP, Economy, Logging** and **much more!** Thank you for trying this bot out! If you want to give any suggestions, please dm the owner \`😃\``)
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .addFields([
                {name: 'Servers', value: client.guilds.cache.array().length, inline:true},
                {name: 'Users', value: client.users.cache.array().length, inline:true},
                {name: 'Uptime', value: (client.uptime/3600000).toFixed(1) + ' hour(s)'},
                {name: 'OwnerID', value: client.users.cache.get(OWNER[0]).tag},
                {name: 'Commands', value: client.commands.array().length}
            ])
            .setFooter(message.guild.name + ` ||`, message.guild.iconURL({format: 'png'}))
            .setThumbnail(client.user.displayAvatarURL({format: 'png'}));

        message.channel.send(embed)
    }
}