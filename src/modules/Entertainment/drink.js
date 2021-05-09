// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')
const entertainmentEmbed = require('../../../utilities/entertainmentEmbed')
const descEmbed = require('../../../utilities/onlyDescEmbed')
const items = [
    {name: 'Tea', emoji: '☕'},
    {name: 'Coffee', emoji: '☕'},
    {name: 'Orange Juice', emoji: '🧃'},
    {name: 'Sea Water', emoji: '🌊'},
    {name: 'Milk', emoji: '🥛'},
    {name: 'Non-alcoholic alcohol(for legal reasons)', emoji: '🥤'},
    {name: 'Root Beer', emoji: '🍺'},
    {name: 'Blood', emoji: '🩸'},
    {name: 'of his/her tears', emoji: '😭'},
    {name: 'Water', emoji: '💧'},
    {name: 'Vodka', emoji: '🍷'},
    {name: 'Pineapple Juice', emoji: '🍍'},
    {name: 'Watermelon Juice', emoji: '🍉'},
    {name: 'Mango Juice', emoji: '🥭'},
    {name: 'Champagne', emoji: '🥂'},
]
module.exports = {
    name: 'drink',
    description: 'Drink something randomly', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}`
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 0,
    highValue: false, 
    module: 'Entertainment',

    emoji: null,
    uniqueText: "uniquetext",
    giflinks:[ 
         ],
    async execute( message, args, text, client){
        

        message.delete()
        const finalItem = items[Math.floor(Math.random() * items.length)]
        if(!message.channel.permissionsFor(message.channel.guild.member(client.user)).has('SEND_MESSAGES')) return
       await message.channel.send(descEmbed(`${message.author} is drinking some ${finalItem.name} \`${finalItem.emoji}\``))
    }
}