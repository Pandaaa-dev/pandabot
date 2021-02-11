// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

const fs = require('fs')
const path = require('path')
const { MessageEmbed } = require('discord.js')
const descEmbed = require('../../../utilities/onlyDescEmbed')

const moduleEmojis = require('../../../utilities/ModuleEmojis.json')
module.exports = {
    name: 'help',
    description: 'Helps users understand more about the bot', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const basic= `\`${prefix}${this.name.toLowerCase()}\``
        const module = `\`${prefix}${this.name.toLowerCase()} <module>\``
        const commandName = `\`${prefix}${this.name.toLowerCase()} <module> <command>\``
        returnArray.push(basic)
        returnArray.push(module)
        returnArray.push(commandName)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 0,
    maxArgs: 2,
    module: 'Help',

    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client){
        message.delete()
        const guildConfig = client.guilds_config.get(message.guild.id)
        const modules =  fs.readdirSync(path.join(__dirname, '../'))

        


        if(args.length == 0){
             const embed = new MessageEmbed()
             .setColor(Math.floor(Math.random()*16777215).toString(16))
             .setTimestamp()
             .setTitle(`**>> Help** \`📜\``)
             .setDescription(`Below are the list of modules that are available in this bot. If you want to know the commands, just type the corresponding commands.`)
             .setFooter('Stay Safe!');
                 modules.forEach(module => {
                     embed.addField('*' + module + '*', `\`${guildConfig.prefix}help ${module.toLowerCase()}\``, true)
                 })
             return message.channel.send(embed)
        }
        if(args.length == 1) {
            const isModule = modules.find(module => module.toLowerCase() == args[0].toLowerCase())
            if(!isModule) return
            const allCommands = client.commands.filter(command => {

               return command.module.toLowerCase() === isModule.toLowerCase() && !command.owner
            })

            const embed = new MessageEmbed()
            .setTitle('>> ' + isModule + ` \`${moduleEmojis[0][isModule]}\``)
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter('Stay Safe!')
            .setTimestamp()
            .setDescription(`Showing you the commands for the ${isModule} module. If you think theres a command that you want, just dm the *owner* of the bot!
                            *(if you want help for a specific command, just type \`${guildConfig.prefix}help ${isModule.toLowerCase()} <commandName>\`)*`)
            allCommands.forEach(command => {
                
                embed.addField(`\`${guildConfig.prefix}${command.name}\` `, `\*${command.description}\*`, true)
            }) 
            message.channel.send(embed)
            if(allCommands.array().length > 25){
                const restCommands = allCommands.array().slice(24, Infinity)
                const newEmbed = new MessageEmbed()
                .setColor(Math.floor(Math.random()*16777215).toString(16))
                .setFooter('Stay Safe!')
                .setTimestamp()
                restCommands.forEach(command => {
                    newEmbed.addField(`\`${guildConfig.prefix}${command.name}\` `, `\*${command.description}\*`, true)

                })    
                message.channel.send(newEmbed)
            }
        }
        if(args.length == 2){
            const isModule = modules.find(module => module.toLowerCase() == args[0].toLowerCase())
            if(!isModule) return
            const allCommands = client.commands.filter(command => {
                // console.log(command.module)
               return command.module.toLowerCase() === isModule.toLowerCase() && !command.owner
            })
            let finalCommand = args[1]
            if(finalCommand.startsWith(guildConfig.prefix)){
                // console.log(args[1])
               finalCommand.split('').shift()
               finalCommand = finalCommand.split('').splice(1, Infinity).join('')
            }
            
    
            const command = allCommands.find(cmd => cmd.name.toLowerCase() === finalCommand.toLowerCase())
            
            if(!command) return message.channel.send(descEmbed(`Could not find command`))
            const moduleEmoji = moduleEmojis[0][isModule]
            const embed = new MessageEmbed()
            .setTitle(guildConfig.prefix + command.name + ` \`${moduleEmoji}\``)
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter('Stay Safe!')
            .setTimestamp()
            .setDescription(`**Module:** ${command.module}\n**Description:** ${command.description}\n**Usage:**\n${command.usage(guildConfig.prefix).join('\n')}`);
            message.channel.send(embed)
        }
    }
}