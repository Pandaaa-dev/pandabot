// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'av',
    description: 'Shows the avatar of a person ', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  @person\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    module: 'Utility',

    uniqueText: "uniquetext",
    giflinks: [ 

    ],
    async execute( message, args, text, client){
        const mentionedUser = await message.mentions.users.first()
        if(!mentionedUser) return
        const clientAsMember = message.guild.member(client.user.id)
        if(!message.channel.permissionsFor(clientAsMember).has('ATTACH_FILES')){
            return message.channel.send(basicEmbed(client,message, args, text, `Missing Permissions!`, `😠`, `I need permission to attach files in this channel!`))
        } 
        const url = mentionedUser.displayAvatarURL({format: 'png',
                                                    dynamic: true,
                                                    size: 1024  
                                                })
        message.delete()
        const newColor = Math.floor(Math.random()*16777215).toString(16)
        const embed = new MessageEmbed()
        .setTitle(`>>  Avatar for ${mentionedUser.username}` )
        .setColor(newColor)
        // .setDescription(`New Avatar set to: `)
        .setImage(url)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`)
        message.channel.send(embed)
    }
}