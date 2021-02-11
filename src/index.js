const Discord= require('discord.js')
const {TOKEN} = require('../config.json')
const chalk = require('chalk')
const fs = require('fs');
const path = require('path');
const client = new Discord.Client({
    messageCacheMaxSize: 200,
    messageCacheLifetime:  1209600,
    messageSweepInterval:  1209600,
  });
const cmdHandler = require('../cmdHandler')
require('./db/db')
const connection = require('./db/db');
const nextLevel = require('../utilities/nextlevel')
const basicEmbed = require('../utilities/basicEmbed');
const descEmbed = require('../utilities/onlyDescEmbed');

client.commands = new Discord.Collection() 
client.guilds_config = new Discord.Collection() //guild delete change
client.bot_config = new Discord.Collection();
client.xp_level = new Discord.Collection();
client.economy = new Discord.Collection();
client.muted_members = new Discord.Collection();//guild delete change
client.noPictureChannels = new Discord.Collection(); //guild delete change
client.onlyPictureChannels = new Discord.Collection(); //guild delete change
client.noLinkChannels = new Discord.Collection(); //guild delete change
client.banned_words = new Discord.Collection(); //guild delete change
client.cooldowns = new Discord.Collection(); //guild delete change
client.shop = new Discord.Collection();
client.tickets= new Discord.Collection(); 
client.xpTimestamps= new Discord.Collection();
client.waifu= new Discord.Collection();


client.once('ready', async () => {

    const _1 = {
        emoji: `⭐`,
        emojiName: `stars`,
        perMessageXP: 15,
        dailyEcon: 50,
        econInterval: 12,
        award5: 500,
        award10: 1000,
        award15: 1500,
        award20: 2000,
        award25: 2500,
        award30: 3000,
        award35: 3500,
        award40: 4000,
        award45: 4500,
        award50: 5000,
    }

    client.bot_config.set('_1', _1)

    client.guilds.cache.forEach(guild => {
        // client.xp_level.set(guild.id, new Discord.Collection())
        client.xpTimestamps.set(guild.id, new Discord.Collection())
    })
    
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.guild_details`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachguild => {
            client.guilds_config.set(eachguild.guildid, eachguild)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.shop`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachthing => {
            client.shop.set(eachthing.name, eachthing)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.tickets`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachthing => {
            client.tickets.set(eachthing.id, eachthing)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.economy`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachuser => {
            client.economy.set(eachuser.userid, eachuser)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.waifu`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachWaifu => {
            client.waifu.set(eachWaifu.waifu, eachWaifu)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.only_pictures`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachChannel => {
            client.onlyPictureChannels.set(eachChannel.channelid, eachChannel)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.no_pictures`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachChannel => {
            client.noPictureChannels.set(eachChannel.channelid, eachChannel)
        })
    })
    
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.muted_members`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(member => {
            client.muted_members.set(member.id, member)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.banned_words`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(word => {
            client.banned_words.set(word.id, word)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.no_links`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachChannel => {
            client.noLinkChannels.set(eachChannel.channelid, eachChannel)
        })
    })
    connection.query(`SELECT * FROM s581_GUILD_CONFIG.xp_level`, (err, res)=> {
        if(err) console.log(err)
        if(!res) return
        if(res.length ==0) return
        res.forEach(eachXP => {
            if(eachXP){ 
                client.xp_level.set(eachXP.userid, eachXP)
            }
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
                    let timeLeft = (expirationTime - now) / 1000;
                    let denoter = 'second(s)'
                    if(timeLeft >= 60 && timeLeft < 3600){
                        timeLeft = (timeLeft/60).toFixed(1)
                        denoter = 'minute(s)'
                    } 
                    if(timeLeft >= 3600){
                        timeLeft = (timeLeft/3600).toFixed(1)
                        denoter = 'hour(s)' 
                    }
                    const text = args.join(' ')
                    message.delete()
                    return message.channel.send(descEmbed(`You are using the ${command} command too many times! please wait **${timeLeft} more ${denoter}** to use it again.`))
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




    client.on('guildCreate', async guild => {
        client.xpTimestamps.set(guild.id, new Discord.Collection())
        const id = guild.id.toString()
        const prefix = "!"
        const premium = 0
        const noNewAccounts = null 
        const publiclog = null
        const muterole = null
        const nonewaccounts = null
        connection.query(`
        INSERT INTO  s581_GUILD_CONFIG.guild_details(guildid, prefix, premium,  nonewaccounts, muterole, ticketsystem, ticketcategoryid, lastticket, welcomechannelid, loggingchannelid, logging, sightseeing)
        values("${id}", "${prefix}", ${premium}, ${noNewAccounts}, ${muterole}, ${0}, ${null}, ${0}, ${null}, ${null}, ${0}, ${0});
        `, (err, res) => {
            if(err) console.log(err);
            client.guilds_config.set(id, {
                id,
                prefix,
                premium,
                nonewaccounts: null,
                muterole: null,
                ticketsystem: 0,
                ticketcategoryid: null,
                lastticket:0,
                welcomechannelid:null,
                loggingchannelid:null,
                logging:0,
                sightseeing:0
            })
        })
    })








    
    client.on('automod', async (client, message) => {
        // Handling Words to be deleted ***{
        console.log(`${chalk.blue(message.author.tag)} from ${chalk.yellow(message.guild.name)} at ${chalk.blueBright(message.channel.name)}: ${message.content}`) 

            const guild = message.guild
            if(!guild) return
            const guildid = message.channel.guild.id
            const guildConfig = client.guilds_config.get(guildid)

            if(!guildConfig) return
            if(guildConfig.sightseeing === 1) return

            const prefix = guildConfig.prefix
            if (message.content.startsWith(prefix) || message.author.bot) return;
            if(client.user.id === message.author.id) return
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
        const guildCollForCooldown = client.xpTimestamps.get(message.guild.id)
        const timestampsForUser = guildCollForCooldown.get(message.author.id);
        let cooldownAmount = 60000    
        if (timestampsForUser) {
            const expirationTime = timestampsForUser + cooldownAmount;
            if (now < expirationTime) {
                return
            }
        }
        guildCollForCooldown.set(message.author.id, now);
        setTimeout(() => {
            if(client.xpTimestamps.get(message.guild.id)) guildCollForCooldown.delete(message.author.id)
        }, cooldownAmount);   
            //cooldown Code end 

            //XP addition code
        const userxp = client.xp_level.get(message.author.id)
        const botConfig = client.bot_config.get('_1')
        let level = 0
        let points = 0
        if(!userxp){
            level = 0
            points = 0
        } else {
            level = userxp.level
            points = userxp.points
        }
        points = points + client.bot_config.get('_1').perMessageXP
        const levelUp = nextLevel(points, level)
        if(levelUp){
            const userEcon = await client.economy.get(message.author.id)
            if(!userEcon){
                userPoints = 0
            } else if(userEcon){
                userPoints = userEcon.points
            }
            level = level+1
            
            if(`${'award'+level.toString()}` in botConfig){
                const award = botConfig['award' + level.toString()]
                    let Econpoints = userPoints + award
                    client.economy.set(message.author.id, {
                        userid: message.author.id,
                        points: Econpoints
                    })

                    message.channel.send(descEmbed(`You levelled up to level ${level}! As a result, you have earned ${award}${botConfig.emoji} as your prize!`)) 
            }
        }

        client.xp_level.set(message.author.id, {
            guildid: message.guild.id,
            userid: message.author.id,
            points: points,
            level: level
        })
    })

    setInterval((() => {
        if(client.muted_members){
            if(client.muted_members.array().length > 0){
                const memberstoUnmute = []
                const mutedMembers = client.muted_members.array()
                const present = Date.now();
                mutedMembers.forEach(member => {
                    if(present >= +member.expiresin){
                        memberstoUnmute.push(member)
                    }
                })
                if(memberstoUnmute.length < 1) return
                memberstoUnmute.forEach(member => {
                    const guild = client.guilds.cache.find(guild => guild.id == member.guildid)
                    if(!guild || guild == undefined ) return
                    const muteroleid = client.guilds_config.get(member.guildid).muterole

                    const actualRole = guild.roles.cache.get(muteroleid)
                    if(!actualRole) return
                    const guildMember = guild.member(member.userid)
                    if(!guildMember || guildMember == undefined) return
                   
              
                    
                    connection.query(`DELETE FROM s581_GUILD_CONFIG.muted_members 
                                    WHERE guildid = ${member.guildid} AND userid = ${member.userid}`)
                    guildMember.roles.remove(actualRole)
                })
            }
        }
    }), (60000*5))

     setInterval((() => {
        if(!client.xp_level || client.xp_level.array().length < 1) return
          connection.query(`DELETE FROM  s581_GUILD_CONFIG.xp_level;`, (res, rej) => {
            // const allXP = []
           const allXP = []
           const allxpButObj = client.xp_level.array()
           if(!allxpButObj) return
           allxpButObj.forEach(obj => {
               const array = Object.values(obj)
               allXP.push(array)
           })
            if(!allXP) return
            connection.query(`INSERT into  s581_GUILD_CONFIG.xp_level (guildid, userid, points, level) VALUES ?`, [allXP])
            })

    }), (60000*2.5))

    setInterval((() => {
        if(!client.waifu || client.waifu.array().length < 1) return
          connection.query(`DELETE FROM  s581_GUILD_CONFIG.waifu;`, (res, rej) => {
           const allWaifu = []
           const allWaifuButObj = client.waifu.array()
           if(!allWaifuButObj) return
           allWaifuButObj.forEach(obj => {
               const array = Object.values(obj)
               allWaifu.push(array)
           })
            if(!allWaifu) return
            if(allWaifu.length == 0) return
            console.log('WAIFU INTERVAL')
            connection.query(`INSERT into  s581_GUILD_CONFIG.waifu (waifu, husbandu, amount, divorceCount) VALUES ?`, [allWaifu], (err,res) => {
                if(err) console.log(err)
            })
            })
    }), (60000*10))

    
    setInterval(() => {
        if(!client.economy || client.economy.array().length < 1) return
        connection.query(`DELETE FROM  s581_GUILD_CONFIG.economy;`, (res, rej) => {
            const array = client.economy.array(); 
            const arrayForDB = [];
            if(array.length < 1) return
            array.forEach(obj => {
                const newArr = Object.values(obj)
                arrayForDB.push(newArr)
            })
            connection.query(`INSERT into  s581_GUILD_CONFIG.economy (userid, points) VALUES ?`, [arrayForDB])
        });
        
    }, 60000 * 3.5);
    
    fs.readdir(path.join(__dirname, '../utilities/Logging'), (err, files) => { // We use the method readdir to read what is in the events folder
        if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
        files.forEach(file => {
            const eventFunction = require(path.join(__dirname, `../utilities/Logging/${file}` )); // Here we require the event file of the events folder
            if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error
    
            const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
            const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
            const once = eventFunction.once; // A simple variable which returns if the event should run once
    
            // Try catch block to throw an error if the code in try{} doesn't work
            try {
                emitter[once ? 'once' : 'on'](event, async (...args) => await eventFunction.run(connection, client, ...args)); // Run the event using the above defined emitter (client)
            } catch (error) {
                // console.error(error.stack); // If there is an error, console log the error stack message
            }
        });
    });

client.login(TOKEN)