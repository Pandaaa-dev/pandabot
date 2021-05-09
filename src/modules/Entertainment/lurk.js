const {MessageEmbed} = require('discord.js')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
module.exports = {
    name: 'lurk',
    description: 'Let your friends know youre lurking!', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name.toLowerCase()}`
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0  ,
    highValue: false,
    module: 'Entertainment',
 
    emoji: "\`😘\`",
    uniqueText: "pats",
        giflinks: ["https://c.tenor.com/NS3baHFaUP0AAAAj/project-refract-peek.gif",
                    "https://media.tenor.com/images/4490fa0e39fea59ee9eb5b370c669661/tenor.gif",
                    "https://64.media.tumblr.com/d914dfa9bd7d6cbf938b75bed9610769/tumblr_paiyt3D1pI1vktclqo1_400.gifv",
                    "https://media.tenor.com/images/c93f6b355513bf7c1b3c415a83323fcd/tenor.gif"
                    
                    ],
    async execute( message, args, text, client,connection){
        message.delete()
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
           message.channel.send(entertainmentEmbed(client, message, args, text, `Lurk`, '👀', `${message.author} lurks...`, this.giflinks))
    }
    
}