'use strict'
const { timeStamp } = require("console");
const http = require("https");
const unirest = require("unirest");
var axios = require("axios").default;

class Kanji{
    
    constructor() {
        this.difficulty = "1";
        
       
        //this.currentKanji = JSON;
        this.fs = require('fs');
        this.update();
        
      
      }
    
    
      setDifficulty(difficulty){
        this.difficulty = difficulty;
        this.update();
    }


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

    
    
    setKanji(num){
        this.kanji = this.lines[num];
        console.log(this.kanji);
        
    }
    getDifficulty(){
        return this.difficulty;
    }
    
    getImage(){
       
        return "./DATA/Grade 1-6/Grade-"  + this.difficulty + "/" + this.kanji.split("$")[1].split("/")[4].split(".")[0] + ".jpg";
    }
    getName(){
        return this.kanji.split("$")[1].split("/")[4].split(".")[0] + ".jpg"
    }
    getAnswer(){
        
        return this.kanji.split("$")[0].split(", ");
    }
    

    
}module.exports = Kanji;
