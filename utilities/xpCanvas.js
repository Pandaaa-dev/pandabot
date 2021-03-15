const Canvas = require('canvas')
const path = require('path')
const { MessageAttachment } = require('discord.js')
const arraySort = require('array-sort')
const xpCanvas = async (message, client, user) => {
    
    const fontPath =path.join(__dirname, '../src/assets/fonts/Roboto-Bold.ttf')
    Canvas.registerFont(fontPath, {
        family: 'Roboto',
    })

    const userxp = client.xp_level.get(user.id)
    let level = 1
    let points = 0
    if(!userxp){
        level = 0
        points = 0
    } else {
        level = userxp.level
        points = userxp.points
    }
    const nextLevel = level+1 
    const requiredPoints = 500 * (Math.pow(2, level+1) - 1)
    // Fod Global Rank
    const sortedArray = arraySort(client.xp_level.array(), 'points', {reverse:true})
    const GlobalRank = sortedArray.findIndex(obj => obj.userid == user.id) +1
    
    //For Guild Rank
    const guildArray = sortedArray.filter(obj => obj.guildid == message.guild.id)
    const guildSortedArray = arraySort(guildArray, 'points', {reverse: true})
    const guildRank = guildSortedArray.findIndex(obj => obj.userid == user.id) +1
    
    console.log(sortedArray, guildArray)
    console.log(userxp)

        const canvas = Canvas.createCanvas(700, 400)
        let ctx = canvas.getContext('2d');

    const newPath = path.join(__dirname, '../src/assets/xp.png')

    const img = await Canvas.loadImage(newPath)
    ctx.drawImage(img, 0, 0, 700, 400)
    ctx.font = `25px Roboto`
    ctx.textBaseline = 'middle'
    const userTag = user.tag
    const avatarURL = await user.displayAvatarURL({format: 'jpg',
                                                            size: 512})
    const avatarImage = await Canvas.loadImage(avatarURL)
    console.log(points, level)
    ctx.save()
    
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(145, 233.38, 122.38-10.91, 0, Math.PI * 2)
    ctx.fill()
    ctx.clip()
    ctx.closePath()
    ctx.drawImage(avatarImage,145-111.47,233.38-111.47, 222.94, 222.94)
    
    //User TAG
    ctx.restore()
    ctx.beginPath()
    ctx.shadowColor = 'red'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
    ctx.fillStyle = 'maroon'
    ctx.font = '40px Roboto'
    ctx.fillText(userTag, 23.76, 55.73)
    ctx.fill()
    ctx.closePath()

   //User Global Rank Title
    ctx.beginPath()
    ctx.shadowColor = 'blue'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'maroon'
    // ctx.font = '35px Times New Roman'
    ctx.fillText('Global Rank', 268.24, 215)
    ctx.fill()
    ctx.closePath()

   //User Global Rank 
    ctx.beginPath()
    ctx.shadowColor = 'white'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 1;
    ctx.fillStyle = 'white'
    // ctx.font = '27px NewRocker'
    ctx.fillText(GlobalRank, (268.24  + ctx.measureText('Global Rank').width/2 - ctx.measureText(GlobalRank.toString()).width), 250)
    ctx.fill()
    ctx.closePath()
    
   //User Server Rank Title
    ctx.beginPath()
    ctx.shadowColor = 'red'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'maroon'
    // ctx.font = '24px NewRocker'
    ctx.fillText('Server Rank', 520.24, 215)
    ctx.fill()
    ctx.closePath()

   //User Server Rank 
    ctx.beginPath()
    ctx.shadowColor = 'white'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'white'
    // ctx.font = '27px NewRocker'
    ctx.fillText(guildRank, (520.24 + ctx.measureText('Server Rank').width/2 - ctx.measureText(guildRank.toString()).width), 250)
    ctx.fill()
    ctx.closePath()
    
   //User XP points
    ctx.beginPath()
    ctx.shadowColor = 'white'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'white'
    // ctx.font = '27px NewRocker'
    ctx.fillText(`${points} XP`, 270, 150)
    ctx.fill()
    ctx.closePath()
    
    //User Level 
    ctx.beginPath()
    ctx.shadowColor = 'white'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 2;
    ctx.fillStyle = 'white'
    // ctx.font = '60px NewRocker'
    ctx.fillText(level, ((268.24 + ctx.measureText('Global Rank').width + (520.24 - (268.24 + ctx.measureText('Global Rank').width)))/1.1) - ctx.measureText(level.toString()).width + ctx.measureText(level.toString()).width/3 + 4 , 220)
    ctx.fill()
    ctx.closePath()
    
    //User xp BAR empty
    ctx.beginPath()
    // ctx.font = '27px NewRocker'
    ctx.fillStyle='rgba(0,0,0,0.8)'
    ctx.fillRect(268.24, 280, (520.24 + ctx.measureText('Server Rank').width) - 268.24, 20 )
    ctx.fill()
    ctx.closePath()

    //User xp BAR fullfill
    ctx.beginPath()
    // ctx.font = '27px NewRocker'
    ctx.fillStyle='maroon'
    ctx.fillRect(268.24, 280, ((520.24 + ctx.measureText('Server Rank').width) - 268.24)* ((points *100)/requiredPoints)/100, 20 )
    ctx.fill()
    ctx.closePath()
    
    //User required XP
    ctx.beginPath()
    ctx.font = '30px Roboto'
    ctx.fillStyle='white'
    ctx.fillText(`${points}/${requiredPoints}`,((700+145)/2)-ctx.measureText(`${points}/${requiredPoints}`).width/10, 325 )
    ctx.fill()
    ctx.closePath()

    const attachment = await new MessageAttachment(canvas.toBuffer(), 'bruh.png')
   return attachment
}


module.exports = xpCanvas