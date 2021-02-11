const {MessageEmbed} = require('discord.js')
const fs = require('fs');
const path = require('path');
// const gif = require('../../assets/commandgifs')
module.exports = {
    name: 'bamboo',
    description: 'Feed the bot some bamboos!', 
    usage(prefix){
        const returnArray = []
        const single = `\`${prefix}${this.name.toLowerCase()}\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    module: 'Entertainment',

    highValue: false, 
    emoji: "\`😲\`",
    uniqueText: "gave me a bamboo! I won't have to eat this zoo shit food anymore!",
    giflinks: ["https://cdn.dribbble.com/users/2398700/screenshots/6225309/panda-for-dribbble4.gif",
                "https://i.imgur.com/IYIImQt.gif",
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7a75a58-68f9-48c7-a737-00c50e59cd1f/d4x85xk-e0bbda11-8211-435b-8d54-1e66c261d81b.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYzdhNzVhNTgtNjhmOS00OGM3LWE3MzctMDBjNTBlNTljZDFmXC9kNHg4NXhrLWUwYmJkYTExLTgyMTEtNDM1Yi04ZDU0LTFlNjZjMjYxZDgxYi5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.P93nTnwWZWwyka7ytrrYDGHJKGuOGepE_EYXLGF828c",
              "https://i.pinimg.com/originals/04/3a/c0/043ac046318c6c057191219848cd6a94.gif"],
    async execute( message, args, text, client, connection){
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
        .setTitle(">> " + this.name  + " \`🎋\`")
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setThumbnail(gifLink)
        .setDescription(" <@!" + message.author.id + "> " +  this.uniqueText + ' ' +  (text) + ' ');
        //Sending the response  
        try {
        return await message.channel.send(embed)
        } catch(e){
            console.log(e)
        }
    },
}