const Discord = require('discord.js');
const Canvas = require('canvas');

class Draw{
    constructor(){
        this.canvas = Canvas.createCanvas(200,200);
        this.ctx = this.canvas.getContext('2d');

    }
    drawWord(message, text){

        

        this.ctx.font = '75px sans-serif';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(text, 1, 1);
       

        
        message.channel.send(this.ctx.measureText(text).width);
        this.canvas2 = Canvas.createCanvas(this.ctx.measureText(text).width + 20, 150);
        let width = this.ctx.measureText(text).width;
        this.ctx2 = this.canvas2.getContext('2d');
        this.ctx2.font = '75px sans-serif';
        this.ctx2.fillStyle = '#000000';
        //this.ctx2.fillStyle = "green";
        this.ctx2.fillText(text,10  , 105);
        return new Discord.MessageAttachment(this.canvas2.toBuffer(), 'word.png');
        

        
    }
}module.exports = Draw;