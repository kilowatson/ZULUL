'use strict'
const { timeStamp } = require("console");


class Kanji{
    
    constructor() {

        this.difficulty = "1";
        this.fs = require('fs');
        this.update();
      
      }
    
    //
    setDifficulty(difficulty){
        this.difficulty = difficulty;
        this.update();
    }

    //Loads kanji information into memory
    update(){
        try {
            // read contents of the file
            const data = this.fs.readFileSync('./DATA/Grade 1-6/grade'  + this.difficulty + '.txt', 'UTF-8');
        
            // split the contents by new line
            this.lines = data.split(/\r?\n/);
           
           
        } catch (err) {
            console.error(err);
        }

    }
    
    
    //Sets the kanji 
    setKanji(num){
        this.question = this.lines[num].split("$");
        this.kanji = this.question[0];
        this.imageName = this.question[2];
        this.answer = this.question[1].split(", ");
        
        
    }

    //Gets the difficulty
    getDifficulty(){
        return this.difficulty;
    }
    
    //Returns the path of the image
    getImage(){
        console.log("./DATA/Grade 1-6/Grade-"  + this.difficulty + "/" + this.imageName)
        return "../Discord Bot/DATA/Grade 1-6/Grade-"  + this.difficulty + "/" + this.imageName;
    }

    //Returns the name of the image file
    getName(){
        return this.imageName;
    }

    //Returns the answer :)
    getAnswer(){
        
        return this.answer;
    }

    getKanji(){
        return this.kanji;
    }
    getNumberofKanji(){
        return this.lines.length-1;
    }
    

    
}module.exports = Kanji;

/*
     async search(){

        var options = {
            method: 'GET',
            url: 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/' + encodeURIComponent(this.kanji),
            headers: {
              'x-rapidapi-key': 'd1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13',
              'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com'
            }
          };


          await axios.request(options).then((response) => {
              this.currentKanji = response.data;
          }).catch(function (error) {
              console.error(error);
          });
        
    }
*/
