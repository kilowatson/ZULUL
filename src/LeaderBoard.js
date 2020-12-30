const Discord = require('discord.js');
//const Leaderboard = require('../commands/Board');


class LeaderBoard{
    constructor(type, guild) {
        this.participants = [];
        this.guild = guild;
        this.type = type;
        this.fs = require('fs');
        this.path = require("path");
        this.fileName = this.path.resolve(__dirname, '../DATA/LeaderBoard/' + type + '.txt') ;
        


    }

    loadLeaderBoard(type){
        //Open file based on 


          try {
            this.fileName = this.path.resolve(__dirname, '../DATA/LeaderBoard/' + type + '.txt') ;
            // read contents of the file
            console.log(this.fileName);
            const data = this.fs.readFileSync(this.fileName, 'UTF-8');
            //console.log(data.split(/\r?\n/));
            // split the contents by new line
            this.board = data.split(/\r?\n/);
            
           
           
        } catch (err) {
            console.error(err);
        }



        
    }

     addPoints(id, points){
        
         let newParticipant = true;

         console.log(this.participants.length);
        if(this.participants.length == 0){
            this.participants.push([id,points]);
            
        }
        else{
            for(var d = 0; d < this.participants.length; d++){
                if(this.participants[d][0] == id){
                    newParticipant = false;
                    this.participants[d][1] += points; 
                }
            }
            if(newParticipant){
                this.participants.push([id,points]);
            }
         
        }

         
        
           
        
        
    }

    getWinner(){
        let highestpoints = 0;
        let winners = [];
        if(this.participants.length == 0){
            return "No one";
        }
        this.loadLeaderBoard(this.type);

        for(var i = 0; i < this.participants.length; i++){
            if(this.participants[i][1] == highestpoints){
            winners.push(this.guild.members.cache.get(this.participants[i][0]).user.username);
            
            }

            else if(this.participants[i][1] > highestpoints){
                highestpoints = this.participants[i][1];
                winners = [];
                winners.push(this.guild.members.cache.get(this.participants[i][0]).user.username);
              
            }
           

        }
        
        return [winners, highestpoints];


    }
    adjustLeaderBoard(){
            if(this.participants.length == 0){
                return;}
            console.log(this.board);
            console.log(this.board[0]);
            console.log(this.board.length);
            var newParticipant = true;
            for(var j = 0; j < this.participants.length; j++){

                for (var i=this.board.length; i--;) {
                    if (this.board[i].indexOf(this.participants[j][0]) >= 0){
                       
                        let newPoints = parseInt(this.board[i].split("$")[1]) + parseInt(this.participants[j][1]);
                        this.board[i] = this.participants[j][0] + "$" + newPoints + "$" + this.guild.members.cache.get(this.participants[j][0]).user.username;
                        newParticipant = false;
                        break;
                    }

                }
                if(newParticipant){
                    this.board.push(this.participants[j][0] + "$" + this.participants[j][1] + "$" + this.guild.members.cache.get(this.participants[j][0]).user.username);

                }
                newParticipant = true;
            }

        
        let output = this.board.join("\n");
        this.fs.writeFile(this.fileName, output, function(err) {
            if (err) throw err;
            console.log('complete');
        });               
                

    }

    //Gets a leaderboard as an array
    getLeaderBoard(){
        //this.board
        if(this.type == "All"){
            //W
            let boardFiles = this.fs.readdirSync(this.path.resolve(__dirname, '../DATA/LeaderBoard/'));
            var IDS = [];
            var points = [];
            var names = [];
            for (const file of boardFiles) {
                this.loadLeaderBoard(file.slice(0,-4));
                
                for(var x = 0; x < this.board.length; x++){
                    let row = this.board[x].split("$");
                    let position = IDS.indexOf(row[0]);
                   
                    if(position > -1){
                        console.log(row[2]);
                        points[position] = parseInt(row[1]) + parseInt(points[position]);
                    }
                    else{
                        console.log("New " + row[2]);
                        IDS.push(row[0]);
                        points.push(row[1]);
                        names.push(row[2]);
                    }



                   
        }

                
            

            }
            for (var x = 0; x < IDS.length; x++) {
                try{
                    names[x] = (this.guild.members.cache.get(IDS[x]).user.username);
                    }
                catch{
                    console.log("No username cached");
                }

            }

            //////////////////////
            return [names, points];

        }
        else{
        this.loadLeaderBoard(this.type);
        var names = [];
        var points = [];
        for(var x = 0; x < this.board.length; x++){
            let row = this.board[x].split("$");
            try{
                names.push(this.guild.members.cache.get(row[0]).user.username);
            }
            catch{
                names.push(row[2]);
            }
            points.push(row[1]);
        }
        return [names, points];
    }
}

}module.exports = LeaderBoard;