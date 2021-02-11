// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const {MessageEmbed} = require('discord.js')
const {OWNER} = require('../../../config.json')
module.exports = {
    name: 'owner',
    description: 'Shows some details about the owner of the bot', 
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
        const guildConfig = client.guilds_config.get(message.guild.id)
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`**Hello!**`)
            .setDescription(`Hey! I'm the dude that made the bot. Yeah i know it ain't that special shushhh. Anyways, i just wanted to say **thank you** for using the bot! I've worked very hard on this bot so it's very cool when I see people use it. I tear up man ok qwq.
                            \n*quietly sobs for a bit*\n
                            **Anyways,** besides the thank you, If you could, **help** me too! Come to the support server by typing \`${guildConfig.prefix}supportserver\` and come down to chat with me and we could discuss how to make the bot better for **you**. All my work is **for you** so if you dont like it, I wont like it either. TIA!
                            -Your friend *(I dont have many...)*\n` + ' Omi')
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter(message.guild.name + ` ||`, message.guild.iconURL({format: 'png'}))
        message.channel.send(embed)
    }
}