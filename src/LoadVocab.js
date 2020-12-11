const JishoApi = require('unofficial-jisho-api');
const request = require("request-promise");
const axios = require('axios');
const Vocab = require('../commands/Vocab');

class LoadVocab{

    constructor(level){
        this.jisho = new JishoApi();
        this.fs = require('fs');
        this.reading;
        this.answer;
       
        try {
            
            // read contents of the file
            const data = this.fs.readFileSync('./DATA/Vocabulary/N' + level + '.txt', 'UTF-8');
           
            // split the contents by new line
            this.file = data.split(/\r?\n/);
        
           
           
        } catch (err) {
            console.error(err);
        }

    }
    async getAnswer(){
        

       
    await this.jisho.searchForPhrase(this.currentWord).then(result => {
        console.log(result.data[0].senses[0].english_definitions);
        this.answer = result.data[0].senses[0].english_definitions;
        this.reading = result.data[0].japanese[0].reading;
       
    });

    if(this.answer == undefined){
        return ["none", "none", "none"];
    }
    return this.answer;




    }
    getTestableAnswer(){
        if(this.answer == undefined){
            return ["none", "none", "none"];
        }
        
        var testableAnswer = [];
        for(var i = 0; i < this.answer.length; i++){
            testableAnswer.push(this.answer[i].replace(/(\(.*\))/g, ""));
        }
        return testableAnswer
    }

    
    
    
    getWord(){
        this.currentWord = this.file[Math.floor(Math.random() * this.file.length - 1)];
        return this.currentWord;

    }
    getReading(){
        return this.reading;
        
    }
    async getExampleSentence(){
        var kanji;
        var kana;
        var english;
        await this.jisho.searchForExamples(this.currentWord).then(result => {
            console.log(result.results[0].kanji);
           //[result.results[0].kanji,  result.results[0].kana,  result.results[0].english];
           kanji = result.results[0].kanji;
           kana = result.results[0].kana;
           english = result.results[0].english;
        });
        
     return [kanji, kana, english];



    }
    


}module.exports = LoadVocab;