// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'invlink',
    description: 'Generates an invite link', 
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
    uniqueText: "ugh",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
           const Link =  await client.generateInvite({permissions: ['CREATE_INSTANT_INVITE',
           'KICK_MEMBERS',
           'BAN_MEMBERS',
           'ADMINISTRATOR',
           'MANAGE_CHANNELS',
           'MANAGE_GUILD',
           'ADD_REACTIONS',
           'VIEW_AUDIT_LOG',
           'VIEW_CHANNEL',
           'SEND_MESSAGES',
           'SEND_TTS_MESSAGES',
           'MANAGE_MESSAGES',
           'EMBED_LINKS',
           'ATTACH_FILES',
           'READ_MESSAGE_HISTORY',
           'MENTION_EVERYONE',
           'USE_EXTERNAL_EMOJIS',
           'VIEW_GUILD_INSIGHTS',
           'CONNECT',
           'SPEAK',
           'MUTE_MEMBERS',
           'DEAFEN_MEMBERS',
           'MOVE_MEMBERS',
           'USE_VAD',
           'CHANGE_NICKNAME',
           'MANAGE_NICKNAMES',
           'MANAGE_ROLES',
           'MANAGE_WEBHOOKS',
           'MANAGE_EMOJIS'], 
        maxAge: 3600,
        maxUsers: 15,})

        return  message.channel.send(basicEmbed(client, message, args, text, 'Invite Me!', `😍`, `Invite me with this [link](${Link}) `))
    }
}