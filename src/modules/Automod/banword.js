// check these routes!
const basicEmbed = require('../../../utilities/basicEmbed')
const errorEmbed = require('../../../utilities/errorEmbed')

module.exports = {
    name: 'banword',
    description: 'Ban different words', 
    usage(prefix){
        const returnArray = []

        //Basic usage shown in an array 

        const single = `\`${prefix}${this.name.toLowerCase()}  <word>\``
        returnArray.push(single)
        return returnArray
    },
    requiredPermissions: [
        'MANAGE_CHANNELS',
    ], 
    isNSFW: false,
    minArgs: 1,
    maxArgs: 1,
    highValue: false,
    module: 'Automod',
 
    emoji: null,
    uniqueText: "uniquetext",
    giflinks: [ 
        // Gif links for the embed
    ],
    async execute( message, args, text, client, connection){
        let bannedWordsCounter = 0
    //    get(message.guild.id)
        let newid = 0

    const bannedArray = client.banned_words.array()
    console.log(bannedArray)
        if(bannedArray.length > 1){
            newid = bannedArray.pop().id + 1 
        } else {
            newid = 1
        }


        const wordArr = []
       client.banned_words.map(word => {
           if(+word.guildid == message.guild.id){
               bannedWordsCounter++
               wordArr.push(word.word)
           }
       })
        // console.log(bannedWordsArr.length)
        if(wordArr.includes(args[0].toLowerCase())){
            return message.channel.send(basicEmbed(client, message, args, text, `Already Banned!`, `😲`, `You already banned this word!` ))
        }
        if(bannedWordsCounter >=20){
            return message.channel.send(basicEmbed(client, message, args, text, `Max Limit Reached!`, `😲`, `You already have \`20\` banned words for this server! \n buy a [premium membership](https://google.com) or delete some of your existing commands!` ))
        }
        
        connection.query(`INSERT INTO  customer_178208_guilddetails.banned_words(guildid, word)
        values("${message.guild.id}", '${args[0].toLowerCase()}');
        `, (err, res) => {
            if(err) console.log(err);
            client.banned_words.set(newid, {
                id: newid,
                guildid: message.guild.id.toString(),
                word: args[0].toLowerCase()
            })
        return message.channel.send(basicEmbed(client, message, args, text, `Banned Word!`, `✔️`, `**Banned word:** \`${args[0].toLowerCase()}\`` ))
        })
    }
}