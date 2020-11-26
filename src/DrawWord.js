const Discord = require('discord.js');
const Canvas = require('canvas');

class DrawWord{
    constructor(){

    }
    setUp(message){

        this.canvas = Canvas.createCanvas(200,200);
        this.ctx = this.canvas.getContext('2d');

        this.ctx.font = '100px sans-serif';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText("花", 100, 100);

        const attachment = new Discord.MessageAttachment(this.canvas.toBuffer(), 'welcome-image.png');
        message.channel.send(attachment);

    }
}module.exports = DrawWord;