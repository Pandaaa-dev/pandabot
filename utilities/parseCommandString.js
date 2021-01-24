const parseString = (string, message, author, guild, client, firstMention = null) => {
    const newStringArray = []
    string.split(' ').forEach(word => {
        if(word.startsWith('%') && word.endsWith('%')){
           const newWordArr = word.split('')
              newWordArr.splice(0, 1)
              newWordArr.splice(-1,  1)
              let realWord = newWordArr.join('')
            if(realWord.startsWith('rng')){
                const numbers = word.split('%')[1].split('').splice(3,Infinity).join('').split('-')
                var low = +numbers[0];
                var high= +numbers[1];
                var result = Math.floor(Math.random() * (1 + high - low)) + low;
                if(isNaN(result)) return
                newStringArray.push(result)
                return
            }else 
            if(realWord.toLowerCase() == 'percentage'){
                const percentage = Math.floor(Math.random()* 101)
                newStringArray.push(`${percentage}%`)
                return
            }else 
            if(realWord.toLowerCase() == 'author'){
                const reqAuthor = `<@${author.id}>`
                newStringArray.push(reqAuthor)
                return
            }else 
            if(realWord.toLowerCase() == 'author.tag'){
                const reqAuthor = author.tag
                newStringArray.push(reqAuthor)
                return
            }else 
            if(realWord.toLowerCase() == 'author.mention.user'){
               const newWord = firstMention
               if(!newWord) return
               newStringArray.push(`<@!${newWord.id}>`)
               return
            }else 
            if(realWord.toLowerCase() == 'author.mention.tag'){
               const newWord = firstMention
               if(!newWord) return
               newStringArray.push(`${newWord.username}#${newWord.discriminator}`)
               return
            }else 
            if(realWord.toLowerCase() == 'server.name'){
               const newWord = guild.name
               newStringArray.push(newWord)
               return
            }else 
            if(realWord.toLowerCase() == 'server.members'){
               const newWord = guild.memberCount
               newStringArray.push(newWord)
               return
            } else 
            if(realWord.toLowerCase() == 'server.owner'){
               const newWord = guild.ownerID
               newStringArray.push(`<@${newWord}>`)
               return
            } else 
            if(realWord.toLowerCase() == 'server.owner'){
               const newWord = guild.ownerID
               newStringArray.push(`<@${newWord}>`)
               return
            }else 
            if(realWord.toLowerCase() == 'server.createdat'){
               const newWord = guild.createdAt.toString()
               newStringArray.push(newWord)
               return
            } else 
            if(realWord.toLowerCase() == 'server.region'){
               const newWord = guild.region
               newStringArray.push(newWord)
               return
            } else
            if(realWord.toLowerCase() == 'server.boosts'){
               const newWord = guild.premiumSubscriptionCount
               newStringArray.push(newWord)
               return
            } 
        } else {
            newStringArray.push(word)

        }
    })
    const FullString = newStringArray.join(' ')
    return FullString
}

// %rng1-10%---------------
// %percentage% ----------
// %author% ----------
// %author.tag% -----
// %author.mention.user% ------------
// %author.mention.tag% -----------
// %server.name% ----------
// %server.members% ------
// %server.owner% ------
// %server.createdat% -----
// %server.region% --------
// %server.boosts%-------

module.exports = parseString