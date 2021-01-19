// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const deleteMsg = require('../../../utilities/deleteMsg')
module.exports = {
    name: 'setavatar',
    description: 'Sets the pfp for the bot', 
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
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    owner: true,
    emoji: null,
    uniqueText: "ok",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        const clientAsMember = message.guild.member(client.user.id)
        if(!message.channel.permissionsFor(clientAsMember).has('ATTACH_FILES')){
            return message.channel.send(basicEmbed(client,message, args, text, `Missing Permissions!`, `D:`, `I need permission to attach files in this channel!`))
        } 
        if(args[0].startsWith('https://')){
            const newColor = Math.floor(Math.random()*16777215).toString(16)
            message.delete()
            client.user.setAvatar(args[0]).then(res => {
                console.log(res)
                const embed = new MessageEmbed()
                .setTitle(">> New avatar set!" )
                .setColor(newColor)
                .setDescription(`New Avatar set to: `)
                .setImage(args[0])
                message.channel.send(embed)
            }).catch(e => {
                if( e.code == 50035){
                  return  message.channel.send(basicEmbed(client,message,args,text,`Changing Avatar too fast!`, 'D:', 'You are changing avatars too fast! Please try again later.'))
                }
            })
        } else {
            return  message.channel.send(basicEmbed(client,message,args,text,`Wrong Url!`, 'D:', 'Please copy the image link and not the link itself. Also, we do not support images from \'http://\'(unprotected) sites! '))
        }
    }
}