const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'Kick',
    description: 'A simple hug to make your day better!', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name} <person>\``
        const multiple = `\`${prefix}${this.name} <person1> <person2>\``
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 5,
    highValue: false, 
    async execute( message, args, text, client){
        
    }
}