const {MessageEmbed} = require('discord.js'); 

const descEmbed = (text) => {
    const embed = new MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215).toString(16))
    .setDescription(text)
    return embed
}

module.exports = descEmbed