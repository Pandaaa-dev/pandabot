// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const {OWNER} = require('../../../config.json')
const arraySort = require('array-sort')
module.exports = {
    name: 'guilds',
    description: 'Shows all the servers the bot is currently in', 
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
    owner: true,
    uniqueText: "uniquetext",
    giflinks: [ 

    ],
    async execute( message, args, text, client){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
        const guildConfig = client.guilds_config.get(message.guild.id)

        const guildsConfig = []

        client.guilds.cache.forEach(guild => {
            guildsConfig.push({name: guild.name, ownerTag: guild.owner.user.tag, members: guild.members.cache.array().length})
        })
        console.log(guildsConfig)
        const embed  = new MessageEmbed()
        const sortedConfig = arraySort(guildsConfig, 'members', {reverse: true})
        embed.setTitle('>> Guild Leaderboard \`📝\`')
        embed.setColor(Math.floor(Math.random()*16777215).toString(16))
        embed.setTimestamp()
        if(sortedConfig.length < 25){
            sortedConfig.forEach(guild => {
                embed.addField(guild.name, `**${guild.members}** *members -- ${guild.ownerTag}*`)
            })
            return message.channel.send(embed)
        }
        if(sortedConfig.length > 25) {
            const times = Math.floor(sortedConfig.length/25);
            for (i = 0; i > times; i++) {
                const loopEmbedConfig= sortedConfig.slice(i + 25*i, 25*i)
                if(i == times - 1){
                 loopEmbedConfig= sortedConfig.slice(i + 25*i, Infinity)
                }
                loopEmbedConfig.forEach(guild => {
                    embed.addField(guild.name, `**${guild.members}** *members -- ${guild.ownerTag}*`)
                })
                    await message.channel.send(embed)
              }
        }
        

    }
}