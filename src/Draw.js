const Discord = require('discord.js');


class Draw{
    constructor(){
        

    }
    drawWord(message, text){
        const Canvas = require('canvas');
        this.canvas = Canvas.createCanvas(200,200);
        this.ctx = this.canvas.getContext('2d');
        

        this.ctx.font = '75px sans-serif';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(text, 1, 1);
       

        
        message.channel.send(this.ctx.measureText(text).width);
        this.canvas2 = Canvas.createCanvas(this.ctx.measureText(text).width + 20, 150);
        let width = this.ctx.measureText(text).width;
        this.ctx2 = this.canvas2.getContext('2d');

        this.ctx2.fillStyle = '#ffffff';
	// Draw a rectangle with the dimensions of the entire canvas
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
        
        this.ctx2.font = '75px sans-serif';
        this.ctx2.fillStyle = '#000000';
        //this.ctx2.fillStyle = "green";
        this.ctx2.fillText(text,10 , 105);
        
        return new Discord.MessageAttachment(this.canvas2.toBuffer(), 'word.png');
        

        
        }


        async drawPokemonDescription(text){

        const { registerFont, Canvas, loadImage } = require('canvas')
        registerFont('./DATA/Fonts/pokemon-bw.ttf', { family: 'pokemon-bw' })

        const canvas = new Canvas(512, 113);
        const ctx = canvas.getContext('2d');
        const background = await loadImage('./DATA/PokemonImages/pokedexDescription.png');
            
        ctx.font = '15px "pokemon-bw"';
        ctx.fillStyle = '#ffffff';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            var maxWidth = 492;
            var words = text.split(" ");
            var lines = [];
            var currentLine = words[0];
        
            for (var i = 1; i < words.length; i++) {
                var word = words[i];
                var width = ctx.measureText(currentLine + " " + word).width;
                if (width < maxWidth) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
        
        
            for(var x = 0; x < lines.length; x++){
                ctx.fillText(lines[x], 10, (20 * x) + 35);  
            }
            
        
          
        return new Discord.MessageAttachment(canvas.toBuffer(), 'word.png');

    }

    async drawPokemonMoveDescription(pokemonMove){
        const { registerFont, Canvas, loadImage } = require('canvas')
        registerFont('./DATA/Fonts/OpenSans-Regular.ttf', { family: 'pokemon-ss' })

        const canvas = new Canvas(1296, 295);
        const ctx = canvas.getContext('2d');
        const background = await loadImage('./DATA/PokemonImages/'+pokemonMove.category+'.jpg');
        ctx.font = '30px "pokemon-ss"';
        ctx.fillStyle = '#000000';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.fillText(pokemonMove.power, 287, 199);  
        ctx.fillText(pokemonMove.accuracy, 287, 255); 

        var text = pokemonMove.description;
        var maxWidth = 858;
            var words = text.split(" ");
            var lines = [];
            var currentLine = words[0];
        
            for (var i = 1; i < words.length; i++) {
                var word = words[i];
                var width = ctx.measureText(currentLine + " " + word).width;
                if (width < maxWidth) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
        
        
            for(var x = 0; x < lines.length; x++){
                ctx.fillText(lines[x], 413, (35 * x) + 142);  
            }
            


        
        //ctx.fillText(pokemonMove.description, 412, 165); 
        ctx.fillStyle = '#ffffff';
        ctx.font = '31px "pokemon-ss"';

        let y = (196-ctx.measureText(pokemonMove.type.toUpperCase()).width) / 2;
        ctx.fillText(pokemonMove.type.toUpperCase(),y+59 , 57); 
        ctx.fillText("PP " + pokemonMove.pp + "/" + pokemonMove.pp, 1098, 62);  
        return new Discord.MessageAttachment(canvas.toBuffer(), 'pokemonMove.png');
      //  pokemonMove
        //Power 272 179
    }
}module.exports = Draw;//412 165