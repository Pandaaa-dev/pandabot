const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'Pat',
    description: 'A simple pat to make your day better!', 
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
    emoji: "\`😘\`",
    uniqueText: "pats",
        giflinks: [ "https://media1.tenor.com/images/1c6d18b4c3ad62542bd1baf95449ead7/tenor.gif?itemid=12304753",
                    "https://i.pinimg.com/originals/c2/34/cd/c234cdcb3af7bed21ccbba2293470b8c.gif",
                    "https://media2.giphy.com/media/N0CIxcyPLputW/giphy.gif",
                    "https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936"
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
        .setColor(0000000)
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