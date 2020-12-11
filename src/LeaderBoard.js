const Discord = require('discord.js');


class LeaderBoard{
    constructor(type, guild) {
        this.participants = [];
        this.guild = guild;

        this.fs = require('fs');
        const path = require("path");
        this.fileName = path.resolve(__dirname, '../DATA/LeaderBoard/' + type + '.txt') ;
        this.loadLeaderBoard();


    }

    loadLeaderBoard(){
        //Open file based on 
        

          try {
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

     async addPoints(id, points){
         
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
        if(this.participants.length == 0)
            return "No one";

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
        
        return winners;


    }
    adjustLeaderBoard(){
            if(this.participants.length == 0)
                return;
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
    getLeaderBoard(){}

}module.exports = LeaderBoard;