const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'Kiss',
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
    module: 'Entertainment',

    emoji: "\`😘\`",
    uniqueText: "blows a kiss to",
    giflinks: [ "https://media1.tenor.com/images/b6dbb9c1a1804380291e48992c10b88b/tenor.gif?itemid=5150642", 
                "https://media0.giphy.com/media/psnhZeXcQgbU292n5z/giphy.gif", 
                "https://i.pinimg.com/originals/65/19/e8/6519e870af23780241a17e90ca91306d.gif",
                "https://media1.tenor.com/images/54b4357dc2a9f066a89f4843fa16352d/tenor.gif?itemid=7298386"
            ],
    async execute( message, args, text, client,connection){
        //Deleting the message
        message.delete()
        .then(msg => msg )
        .catch(error => console.log(error))

        // Getting the appropriate Time      
        const d = new Date(); 
        const h = d.getUTCHours();
        const m = d.getUTCMinutes()
        const gifLink = this.giflinks[Math.floor(Math.random() * this.giflinks.length)]

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