

class KanaLoader{
    constructor(kana, totalChar){
        this.kana = kana;
        this.totalChar = totalChar;
        this.fs = require('fs');

        this.loadFile();

    }
    loadFile(){
        try {
            // read contents of the file
            const data = this.fs.readFileSync('./DATA/' + this.kana + '/' + this.kana + '.txt', 'UTF-8');
            console.log(data);
            // split the contents by new line
            this.file = data.split(/\r?\n/);
            this.file = this.file.splice(0, this.totalChar);
           
           
        } catch (err) {
            console.error(err);
        }

    }
    setQuestion(num){
        this.question = this.file[num];
        let r = this.question.split("$");
        this.answer = r[1];
        this.imageLoc = "../Discord Bot/DATA/" + this.kana +"/" + r[2];
        this.imageName = r[2]; 
        this.character = r[0];
    }
    getAnswer(){
        return this.answer;
    }
    getImageLoc(){
        return this.imageLoc;
    }
    getImageName(){
        return this.imageName;
    }
    getCharacter(){
        return this.character;
    }


}module.exports = KanaLoader;