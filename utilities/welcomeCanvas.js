const Canvas = require('canvas')
const path = require('path')
const {MessageAttachment} = require('discord.js')


const makeWelcomeCanvas = async (newMember, picturePath) => {
    const fontPath =path.join(__dirname, '../src/assets/fonts/Roboto-Bold.ttf')
Canvas.registerFont(fontPath, {
    family: 'Roboto',
})

    const canvas = Canvas.createCanvas(700, 400)
    let ctx = canvas.getContext('2d');

const newPath = path.join(__dirname, '../src/assets/2.png')
const img = await Canvas.loadImage(newPath)
ctx.drawImage(img, 0, 0, 700, 400)
ctx.font = `20px Roboto`
ctx.textBaseline = 'middle'
const messageText = `${newMember.user.tag} has joined!`
const memberCount = `Member #${newMember.guild.memberCount+1}`
const avatarURL = await newMember.user.displayAvatarURL({format: 'jpg',
                                                        size: 512})
const avatarImage = await Canvas.loadImage(avatarURL)
console.log(avatarImage)
ctx.save()


ctx.beginPath()
ctx.fillStyle = 'white'
ctx.arc(150, 135, 100, 0, 2 * Math.PI)
ctx.fill()
ctx.clip()
ctx.closePath()
ctx.drawImage(avatarImage,150-100,135-100, 200, 200)

ctx.restore()
ctx.beginPath()
ctx.strokeStyle = 'whitesmoke'
ctx.lineWidth = 6
ctx.arc(150, 135, 103, 0, 2 * Math.PI)
ctx.stroke()
ctx.closePath()

ctx.save()
ctx.beginPath()
ctx.fillStyle = 'black'
ctx.shadowColor = 'red'
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 10; 
ctx.fillRect(150-103, 265, ctx.measureText(messageText).width + ctx.measureText(messageText).width/6 , 70 )
ctx.fill()
ctx.closePath()

ctx.restore()
ctx.beginPath()
ctx.fillStyle = 'maroon'
ctx.fillText(messageText, (150-103)+ (150-103)/2 , 265+(265/8))
ctx.closePath()


ctx.save()
ctx.beginPath()
ctx.fillStyle = 'black'
ctx.fillRect(0, 370 , ctx.measureText(memberCount).width, 30)
ctx.fill()
ctx.closePath()


ctx.beginPath()
ctx.font = '17px Roboto';
ctx.fillStyle = 'white'
ctx.textBaseline = 'hanging'
ctx.fillText(memberCount, 0 + ctx.measureText(memberCount).width/8 , canvas.height-20-8)
ctx.fill()

const attachment = new MessageAttachment(canvas.toBuffer(), `newmember.png`)
return attachment
}

module.exports = makeWelcomeCanvas