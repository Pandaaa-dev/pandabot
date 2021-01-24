const Discord= require('discord.js')
const {TOKEN} = require('../config.json')
const fs = require('fs');
const path = require('path');
const client = new Discord.Client() ;
const cmdHandler = require('../cmdHandler')
require('./db/db')

const connection = require('./db/db');
const { isRegExp } = require('util');
const nextLevel = require('../utilities/nextlevel')
const basicEmbed = require('../utilities/basicEmbed');


client.commands = new Discord.Collection() 

client.guilds_config = new Discord.Collection()
client.bot_config = new Discord.Collection();
client.xp_level = new Discord.Collection()
client.economy = new Discord.Collection()
client.muted_members = new Discord.Collection()
client.noPictureChannels = new Discord.Collection()
client.onlyPictureChannels = new Discord.Collection()
client.noLinkChannels = new Discord.Collection()
client.banned_words = new Discord.Collection()
client.cooldowns = new Discord.Collection();
client.shop = new Discord.Collection();
client.tickets= new Discord.Collection();
client.xpTimestamps= new Discord.Collection();


client.once('ready', async () => {

    const _1 = {
        emoji: `⭐`,
        emojiName: `stars`,
        perMessageXP: 8,
        dailyEcon: 50,
        econInterval: 12,
        award5: 150,
        award15: 300,
        award20: 500,
        award30: 750,
        award35: 1000,
        award40: 1500,
        award45: 2500,
        award50: 3000,
    }

    client.bot_config.set('_1', _1)

    
    connection.query(`SELECT * FROM guild_config.guild_details`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachguild => {
            client.guilds_config.set(eachguild.guildid, eachguild)
        })
    })
    connection.query(`SELECT * FROM guild_config.shop`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachthing => {
            client.shop.set(eachthing.name, eachthing)
        })
    })
    connection.query(`SELECT * FROM guild_config.tickets`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachthing => {
            client.tickets.set(eachthing.id, eachthing)
        })
    })
    connection.query(`SELECT * FROM guild_config.economy`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachuser => {
            client.economy.set(eachuser.userid, eachuser)
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
        // console.log(client.banned_words.array().pop().id)
    })
    connection.query(`SELECT * FROM guild_config.no_links`, (err, res)=> {
        if(err) console.log(err)
        res.forEach(eachChannel => {
            client.noLinkChannels.set(eachChannel.channelid, eachChannel)
        })
    })
    console.log(client.user.username + ' has logged in!')
    client.guilds.cache.forEach(guild => {
        client.xp_level.set(guild.id, new Discord.Collection())
    })
    //Initiating the command Handler
    const moduleDir = './modules'
    const Fpath = path.join(__dirname,moduleDir)
    const rootModuleFolder  = fs.readdirSync(Fpath)

    rootModuleFolder.forEach(singularModule => {
        const singularModuleFilePath = path.join(__dirname, moduleDir, singularModule);
        const files = fs.readdirSync(singularModuleFilePath)
        console.log(files.length)
        files.forEach(file => {
            const filePath = path.join(__dirname, moduleDir, singularModule, file)
            const command = require(filePath)
            if(command.name == undefined) return
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name.toLowerCase(), new Discord.Collection());
             }
            client.commands.set(command.name.toLowerCase(), command);

        })

    })
    
})

    client.on('message', async (message) => {
        const guild = message.guild
        if(!guild) return
        const guildid = message.channel.guild.id
        const guildConfig = client.guilds_config.get(guildid)
        const prefix = guildConfig.prefix
        client.emit('automod', client, message)
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return
        if(client.commands.has(command)){

            // Denoting the Cooldown for each command 

            const commandDep = await client.commands.get(command)
            const now = Date.now();
            const timestamps = client.cooldowns.get(command);
            let cooldownAmount = 0
            if(isNaN(commandDep.cooldown) && commandDep.cooldown != undefined){
                if(commandDep.cooldown = 'econdaily'){
                    cooldownAmount= client.bot_config.get('_1').econInterval * 3600000 
                }
            } else {
                    cooldownAmount = (commandDep.cooldown || 4) * 1000;
            }
        
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const text = args.join(' ')
                    message.delete()
                    return message.channel.send(basicEmbed(client, message, args, text, `Too many Commands!`, '>:(', `You are using the ${command} command too many times! please wait **${timeLeft > 3600 ? (Math.floor(timeLeft/3600)) :timeLeft.toFixed(1)} more ${timeLeft > 3600 ? 'hour(s)' : 'second(s)'}** to use it again.`))
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);   

            // Handling the command
            try {
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
        // Handling Words to be deleted ***{
            const bannedWords = []
            const args = message.content.split(' ')
            let messageDeleted = false
            client.banned_words.map(word => {
                if(+word.guildid == message.guild.id){
                    bannedWords.push(word.word.toLowerCase())
                }
            })
            args.forEach(arg => {
                if(bannedWords.includes(arg.toLowerCase())) {
                    message.delete()
                    messageDeleted = true
                }  
            })
            //           }***
            if(messageDeleted) return

            //Check if attachments are present
        const onlyPicturesChan = client.onlyPictureChannels.get(message.channel.id)
        const noPicturesChan = client.noPictureChannels.get(message.channel.id)
        const noLinkChan = client.noLinkChannels.get(message.channel.id)
        
        if(onlyPicturesChan){
            if(message.attachments.array().length < 1){
                message.delete()
                messageDeleted = true
            }
            if(messageDeleted) return
        }
        
        if(noPicturesChan){
            if(message.attachments.array().length > 0){
                message.delete()
                messageDeleted = true
            }
            if(messageDeleted) return
        }
        if(noLinkChan){

            const isLink = message.content.split(' ').find(thing => {
                return new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(thing)
            })
            if(isLink) message.delete()
            messageDeleted = true
        }
        if(messageDeleted) return


        //  XP SYSTEM  

            //Cooldown because spamming shouldnt have xp rewarded.
        const now = Date.now();
        const timestampsForUser = client.xpTimestamps.get(message.author.id);
        let cooldownAmount = 60000    
        if (timestampsForUser) {
            const expirationTime = timestampsForUser + cooldownAmount;
            if (now < expirationTime) {
                return
            }
        }
        client.xpTimestamps.set(message.author.id, now);
        setTimeout(() => client.xpTimestamps.delete(message.author.id), cooldownAmount);   
            //cooldown Code end 

            //XP addition code
        const guildXpColl = client.xp_level.get(message.guild.id)
        const userxp = guildXpColl.get(message.author.id)
        let level = 1
        let points = 0
        if(!userxp){
            level = 1
            points = 0
        } else {
            level = userxp.level
            points = userxp.points
        }
        points = points + client.bot_config.get('_1').perMessageXP
        const levelUp = nextLevel(points, level)
        if(levelUp){
            level = level+1
        }
        console.log(userxp)
        guildXpColl.set(message.author.id, {
            guildid: message.guild.id,
            userid: message.author.id,
            points: points,
            level: level
        })
    })

    // const guild_config = client.guilds_config.get(message.guild.id)

    // if(!guild_config.privatelog || !guild_config.publiclog) return 

    setInterval((() => {
        connection.query("SELECT * FROM GUILD_CONFIG.MUTED_MEMBERS WHERE expiresin < current_timestamp()", (rej, res) => {
            if(rej) console.log(rej)
            console.log('Hopefully its working?')
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

    const comparisonArr = []
    setInterval(() => {
        connection.query(`DELETE FROM guild_config.economy;`, (res, rej) => {
            const array = client.economy.array(); 
            const arrayForDB = [];
            console.log(array.length)
            if(array.length < 1) return
            array.forEach(obj => {
                const newArr = Object.values(obj)
                arrayForDB.push(newArr)
            })
        connection.query(`INSERT into guild_config.economy (userid, points) VALUES ?`, [arrayForDB])
        });

    }, 60000 * 1.5);


module.exports = {
    client
}