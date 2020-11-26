const Discord = require('discord.js');


class LeaderBoard{
    constructor(type, guild) {
        this.participants = [];
        this.guild = guild;



    }

    loadLeaderBoard(type){}

     addPoints(points, id){
         
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
    adjustLeaderBoard(){}
    getLeaderBoard(){}

}module.exports = LeaderBoard;