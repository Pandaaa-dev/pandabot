const Discord= require('discord.js')
const {TOKEN} = require('../config.json')
const fs = require('fs');
const path = require('path');
const client = new Discord.Client() ;
const cmdHandler = require('../cmdHandler')

require('./db/db')

const connection = require('./db/db');
const { isRegExp } = require('util');


client.commands = new Discord.Collection() 

client.guilds_config = new Discord.Collection()
client.xp_level = new Discord.Collection()
client.muted_members = new Discord.Collection()
client.noPictureChannels = new Discord.Collection()
client.onlyPictureChannels = new Discord.Collection()
client.noLinkChannels = new Discord.Collection()
client.banned_words = new Discord.Collection()


client.once('ready', async () => {
    connection.query(`SELECT * FROM guild_config.guild_details`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachguild => {
            client.guilds_config.set(eachguild.guildid, eachguild)
        })
    })
    connection.query(`SELECT * FROM guild_config.only_pictures`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachChannel => {
            client.noPictureChannels.set(eachChannel.channelid, eachChannel)
        })
    })
    
    connection.query(`SELECT * FROM guild_config.muted_members`, (err, res)=> {
        if(err) console.log(err)
        if(!res.length) return 
        res.forEach(member => {
            client.muted_members.set(member.userid, member)
        })
    })
    connection.query(`SELECT * FROM guild_config.banned_words`, (err, res)=> {
        if(err) console.log(err)
        if(!res.length) return 
        res.forEach(word => {
            client.banned_words.set(word.id, word)
        })
    })
    connection.query(`SELECT * FROM guild_config.no_links`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachChannel => {
            client.noLinkChannels.set(eachChannel.channelid, eachChannel)
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

        client.emit('automod', client, message)

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return
        if(client.commands.has(command)){
            try {
             const commandDep = await client.commands.get(command)
              return cmdHandler(commandDep, message, args, args.join(' '), client, connection)
            }
             catch(e){
               return message.channel.send('An error happened... please report it to Pandaa#0001')
            }
        }
    
        
    })


    client.on('guildMemberAdd', async member => {
        const guildConfig = client.guilds_config.get(member.guild.id)
        const guild = client.guilds_config.get(member.guild.id);
        if(guild.nonewaccounts <0 || !guild.nonewaccounts) return
        const memberAccountTimestamp =  member.user.createdTimestamp/(1000*60*60*24)
        const presentTimestamp = Date.now()/(1000*60*60*24)
        const accountAge = presentTimestamp - memberAccountTimestamp
        if(accountAge <= guild.nonewaccounts){
            member.kick("Account not older than the given age.")
        }
       if(client.muted_members.get(member.id)){
           if(member.guild.roles.cache.find(role => role.id == guildConfig.muterole)){
           member.roles.add(guildConfig.muterole)
       }
        }
    })

    client.on('guildCreate', async guild => {
        const id = guild.id.toString()
        const prefix = "!"
        const premium = 0
        const privatelog = null 
        const publiclog = null
        const muterole = null
        const nonewaccounts = null
        connection.query(`
        INSERT INTO guild_config.guild_details(guildid, prefix, premium, privatelog, publiclog, nonewaccounts, muterole)
        values("${id}", "${prefix}", ${premium}, ${privatelog}, ${publiclog}, ${nonewaccounts}, ${muterole});
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

    client.on('automod', async (client, message) => {
        client.banned_words.delete(wordToDelete.id)
    })



    client.setInterval((() => {
        connection.query("SELECT * FROM GUILD_CONFIG.MUTED_MEMBERS WHERE expiresin < current_timestamp()", (rej, res) => {
            if(rej) console.log(rej)
            let v = new Date()
            console.log(res, v.toISOString(), res.length>0)
            if(res.length > 0){
                res.forEach(member => {
                    const guild = client.guilds.cache.find(guild => guild.id == member.guildid)
                    if(!guild || guild == undefined ) return
                      const roleToDeletemember = guild.members.cache.find(member => member.id == +member.userid)
                      console.log(member)
                      if(!member || member == undefined) return
                      const muteroleid = client.guilds_config.get(member.guildid).muterole
                      const guildMember = guild.member(member.userid)
                      guildMember.roles.remove(muteroleid)
                    connection.query("DELETE FROM GUILD_CONFIG.MUTED_MEMBERS WHERE userid = \"" + member.userid + "\"", (rej, res)=> {
                        if(rej) console.log(rej)
                        console.log(res, "Done")
                    })
                })
            }
        })
    }), (60000*15))

client.login(TOKEN)

module.exports = client