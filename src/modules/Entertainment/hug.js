const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'hug',
    description: 'A simple hug to make your day better!', 
    maxArgs: 'infinite',
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 1,
    async execute( message){
        const embed = new MessageEmbed()

        .setTitle("Hug Command!")

        .setColor(0000000)

        .setDescription(message.author.username + ' hugs');

        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}