const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'Cuddle',
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
    uniqueText: "cuddles with",
    giflinks: ["https://media.giphy.com/media/lrPOpnwExOTZYTGyke/giphy.gif", 
                "https://i.pinimg.com/originals/a1/da/c5/a1dac5ff2bfa45269ba666c6c36d011f.gif",
                "https://media.tenor.com/images/2bb9e56d8982c9e806d33aed404a62c0/tenor.gif",
                "https://c.tenor.com/tEJ0EhvOE5QAAAAM/peach-cat-hug.gif"
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
        .setColor(0000000)
        .setThumbnail(gifLink)
        .setDescription(this.emoji+ " <@!" + message.author.id + "> " +  this.uniqueText + ' ' +  (text) + ' ' + this.emoji);
        //  client.user.avatarURL()
        
  

        //Sending the response  
        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}