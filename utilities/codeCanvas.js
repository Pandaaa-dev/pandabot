const Canvas = require('canvas')
const path = require('path')
const { MessageAttachment } = require('discord.js')
const randomIntFromInterval = require('./randomNumber')
const randomCode = require('./randomCode')
const codeCanvas = async () => {

    const fontPath =path.join(__dirname, '../src/assets/fonts/Roboto-Bold.ttf')
    Canvas.registerFont(fontPath, {
        family: 'Roboto',
    })
    const code = randomCode(4)

    const canvas = Canvas.createCanvas(295, 294)
    let ctx = canvas.getContext('2d');
    const newPath = path.join(__dirname, '../src/assets/gift_card.png')
    const numberOfCurr = randomIntFromInterval(3, 25)
    const img = await Canvas.loadImage(newPath)

    ctx.drawImage(img, 0, 0, 295, 294)

    // ctx.beginPath()
    // ctx.fillStyle= 'black'
    // ctx.rect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2)
    // ctx.fill()
    // ctx.closePath()
    
    
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.font = '25px Roboto'
    ctx.fillText(code, canvas.width/4 + (canvas.width - (canvas.width/4)*2)/4, canvas.height/4 + (canvas.height - (canvas.height/4)*2)/2  );
    ctx.fill()
    ctx.closePath()
    // console.log(ctx.measureText(code))
    const attachment = new MessageAttachment(canvas.toBuffer(), `${code}.png`)

    return {
        attachment, 
        code,
        numberOfCurr
    }

}


module.exports = codeCanvas