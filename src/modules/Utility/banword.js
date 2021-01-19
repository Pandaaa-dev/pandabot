// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'banword',
    description: 'Bans different words', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        // const single = `\`${prefix}${this.name.toLowerCase()}  @person %reason\``
        // const multiple = `\`${prefix}${this.name.toLowerCase()} @person1 @person2  %reason\` `
        // returnArray.push(single)
        // returnArray.push(multiple)
        return returnArray
    },
    requiredPermissions: [
            //All the required permissions the user and the bot both needs
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false, 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
        let bannedWordsCounter = 0
    //    get(message.guild.id)
        const wordArr = []
       client.banned_words.map(word => {
           if(+word.guildid == message.guild.id){
               bannedWordsCounter++
               wordArr.push(word.word)
           }
       })

        console.log(bannedWordsCounter)
        console.log(wordArr)
        // console.log(bannedWordsArr.length)
        if(wordArr.includes(args[0].toLowerCase())){
            return message.channel.send(basicEmbed(client, message, args, text, `Already Banned!`, `D:`, `You already banned this word!` ))
        }
        if(bannedWordsCounter >=20){
            return message.channel.send(basicEmbed(client, message, args, text, `Max Limit Reached!`, `D:`, `You already have \`20\` banned words for this server! \n buy a [premium membership](https://google.com) or delete some of your existing commands!` ))
        }
        
        connection.query(`INSERT INTO guild_config.banned_words(guildid, word)
        values("${message.guild.id}", '${args[0]}');
        `, (err, res) => {
            if(err) console.log(err);
            console.log(res)
            client.banned_words.set(bannedWordsCounter+1, {
                id: bannedWordsCounter++,
                guildid: message.guild.id.toString(),
                word: args[0]
            })
        return message.channel.send(basicEmbed(client, message, args, text, `Banned Word!`, `:D`, `**Banned word:** \`${args[0]}\`` ))
        })
    }
}