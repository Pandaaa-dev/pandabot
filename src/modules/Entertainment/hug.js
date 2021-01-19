const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'Hug',
    description: 'A simple smooch to make your day better!', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name.toLowerCase()} <person>\``
        const multiple = `\`${prefix}${this.name.toLowerCase()} <person1> <person2>\``
        returnArray.push(single)
        returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 5,
    highValue: false, 
    emoji: "\`🤗\`",
    uniqueText: "hugs",
    giflinks: [ "https://i.pinimg.com/originals/aa/7d/bf/aa7dbf982985810bf8c60f7b6a1906be.gif",
                "https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif",
                "https://i.pinimg.com/originals/0a/16/52/0a1652de311806ce55820a7115993853.gif", 
                "https://media.tenor.com/images/b6d0903e0d54e05bb993f2eb78b39778/tenor.gif"
                ],
    async execute( message, args, text, client,connection){
        //Deleting the message
        message.delete()
        .then(msg => msg )
        .catch(error => console.log(error))
        const gifLink = this.giflinks[Math.floor(Math.random() * this.giflinks.length)]

        // Getting the appropriate Time      
        const d = new Date(); 
        const h = d.getUTCHours();
        const m = d.getUTCMinutes()

        //Embed Message
        const embed = new MessageEmbed()
        .setTitle(">> " + this.name  + " \`💕\`")
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setThumbnail(gifLink)
        .setDescription(this.emoji+ " <@!" + message.author.id + "> " +  this.uniqueText + ' ' +  (text) + ' ' + this.emoji);
        //Sending the response  
        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}