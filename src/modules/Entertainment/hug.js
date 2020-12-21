const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'hug',
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
        //Deleting the message
        message.delete()
        .then(msg => msg )
        .catch(error => console.log(error))

        // Getting the appropriate Time      
        const d = new Date(); 
        const h = d.getUTCHours();
        const m = d.getUTCMinutes()

        //Embed Message
        const embed = new MessageEmbed()
        .setTitle(">> Hug \`🎋\`")
        .setColor(0000000)
        .setDescription("\`🤗\`"+ " <@!" + message.author.id + ">" +  ' hugs' + ' ' +  ( text) + '!')
        .setFooter(`${message.guild.name} || ${client.user.username} || ${h}:${m} today(UTC) `, client.user.avatarURL());
        
  

        //Sending the response  
        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}