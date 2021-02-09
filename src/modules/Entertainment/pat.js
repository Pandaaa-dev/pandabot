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
    module: 'Entertainment',
 
    emoji: "\`😘\`",
    uniqueText: "pats",
        giflinks: ['https://media.tenor.com/images/a671268253717ff877474fd019ef73e9/tenor.gif',
                    'https://i.pinimg.com/originals/c2/34/cd/c234cdcb3af7bed21ccbba2293470b8c.gif',
                'https://i.kym-cdn.com/photos/images/newsfeed/000/706/849/ff2.gif',
                'https://media0.giphy.com/media/N0CIxcyPLputW/giphy.gif'
                    
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
        .setDescription(`${message.author} pats ${text}`);
        //Sending the response  
        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}