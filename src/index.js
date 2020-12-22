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
            // console.log(command.name.toLowerCase())
            if(command.name == undefined) return
            client.commands.set(command.name.toLowerCase(), command);

        })

    })
    
})

    client.on('message', async (message) => {
        const prefix = '!'
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return
        if(client.commands.has(command)){
            try {
             const commandDep = await client.commands.get(command)
               cmdHandler(commandDep, message, args, args.join(' '), client)
            }
             catch(e){
                message.channel.send('An error happened... please report it to Pandaa#0001')
            }
        }
    
    })

client.login(TOKEN)