


class AnimeDescription{

    constructor(){
        try {
            var fs = require('fs');

            // read contents of the file
            const data = fs.readFileSync('./DATA/anime/OK.txt', 'UTF-8');
            console.log(data);
            // split the contents by new line
            this.file = data.split(/\r?\n/);
            
           this.question = this.file[Math.floor(Math.random() * (this.file.length - 1))];
           
        } catch (err) {
            console.error(err);
        }

    }
    
    getDescription(){
        return this.question.split("$")[2];

    }
    getHint(){
        var hint = this.question.split("$")[1][0];
        for(let x = 1; x < this.question.split("$")[1].length; x++){
            if(this.question.split("$")[1][x] == " "){
                x++;
                console.log(hint);
                hint += " " + this.question.split("$")[1][x];

            }
            else
                hint += "_"
        }
       
        return hint;


    }
    getAnswer(){
        return this.question.split("$")[1];
    }

    getType(){
        return this.question.split("$")[0];
    }

}module.exports = AnimeDescription;