const Discord= require('discord.js')
const {TOKEN} = require('../config.json')
const fs = require('fs');
const path = require('path');
const client = new Discord.Client() ;
const cmdHandler = require('../cmdHandler')

client.commands = new Discord.Collection() 



client.on('ready', () => {
    console.log(client.user.username + ' has logged in!')

    //Initiating the command Handler

    const moduleDir = './modules'
    const Fpath = path.join(__dirname,moduleDir)
    const rootModuleFolder  = fs.readdirSync(Fpath)

    rootModuleFolder.forEach(singularModule => {
        const singularModuleFilePath = path.join(__dirname, moduleDir, singularModule);
        const files = fs.readdirSync(singularModuleFilePath)
        console.log(files)
        files.forEach(file => {
            const filePath = path.join(__dirname, moduleDir, singularModule, file)
            const command = require(filePath)
            client.commands.set(command.name, command);

        })

    })
    
})

    client.on('message', async (message) => {
        const prefix = '!'
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        console.log(command)

        if(!client.commands.has(command)) return
        if(client.commands.has(command)){
            console.log(args)
            try {
             await  cmdHandler(client.commands.get(command), message, client)
            } catch(e){
                message.channel.send('An error happened... please report it to Pandaa#0001')
            }
        }
    
    })

client.login(TOKEN)