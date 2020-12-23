const Discord= require('discord.js')
const {TOKEN} = require('../config.json')
const fs = require('fs');
const path = require('path');
const client = new Discord.Client() ;
const cmdHandler = require('../cmdHandler')

require('./db/db')

const connection = require('./db/db')


client.commands = new Discord.Collection() 

client.guilds_config = new Discord.Collection()
client.xp_level = new Discord.Collection()



client.once('ready', async () => {

    connection.query(`SELECT * FROM guild_config.guild_details`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachguild => {
            client.guilds_config.set(eachguild.guildid, eachguild)
        })
    })
    
    console.log(client.user.username + ' has logged in!')

    //Initiating the command Handler
    const moduleDir = './modules'
    const Fpath = path.join(__dirname,moduleDir)
    const rootModuleFolder  = fs.readdirSync(Fpath)

    rootModuleFolder.forEach(singularModule => {
        const singularModuleFilePath = path.join(__dirname, moduleDir, singularModule);
        const files = fs.readdirSync(singularModuleFilePath)
        // console.log(files)
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

        const guildConfig = client.guilds_config.get(message.guild.id)
        const prefix = guildConfig.prefix
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
    client.on('databaseUpdate', async (tableName, wherekey, whereVal, updateKey, updateValue) => {
        connection.query(`UPDATE ${tableName}
                        SET ${updateKey} = "${updateValue}"
                        WHERE ${wherekey} = "${whereVal}";
                        `, (rej, res) => {
                            if(rej) console.log(rej)
                            console.log(res)
                        })
    })


    client.on('guildCreate', async guild => {
        const id = guild.id.toString()
        const prefix = "!"
        const premium = 0
        const privatelog = null 
        const publiclog = null
        const muterole = null
        connection.query(`
        INSERT INTO guild_config.guild_details(guildid, prefix, premium, privatelog, publiclog, muterole)
        values("${id}", "${prefix}", ${premium}, ${privatelog}, ${publiclog}, ${muterole});
        `, (err, res) => {
            if(err) console.log(err);
            console.log(res)
            client.guilds_config.set(id, {
                id,
                prefix,
                premium,
                privatelog, 
                publiclog,
                muterole
            })

            console.log(client.guilds_config.get(id))

        })
    })

    client.on('myevent', string => {
        console.log("Emitter Ran!")
    })

client.login(TOKEN)

module.exports = client