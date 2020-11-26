const fetch = require('node-fetch');
const  getJsD  = require("excel-date-to-js");
var { DateTime } = require('luxon');

global.fetch = fetch

const currentlyAiringAnime = require('currently-airing-anime');
const { Message } = require('discord.js');

class ScheduleHelper{

   constructor(day){
       let cat = [["sunday", "sun", "0"], ["monday", "mon","m", "1"], ["tuesday", "tues", "tue", "2"], ["wednesday", "wed","w", "3"],
        ["thursday", "thurs", "4"], ["friday", "fri","f", "5"], ["saturday", "sat", "6"]];
        this.day = -1;
        this.invalid = false;
        this.todayDate = new Date();
        this.date = this.todayDate;

        if(parseInt(day) == this.todayDate.getDay()){
            this.date = this.todayDate;
            console.log(parseInt(day));

        }
       else if(typeof day  === 'string'){
           var x = 0;
            console.log("saas");
           for(x = 0;x < 7;x++){
               if(cat[x].includes(day)){
                this.day = x;
                console.log(this.day)
                break;
               }

           }
           if(this.day == -1){
               this.invalid = true;
           }


           else{
               if(this.todayDate.getDay() > this.day){
                let increment = this.day - this.todayDate.getDay() + 7;
                
                this.date.setDate(this.todayDate.getDate() + increment);
                console.log("na math");
               }
               else{
                   let increment = this.day - this.todayDate.getDay();
                   this.date.setDate(this.todayDate.getDate() + increment);

               }
           }
           
       }
       

       console.log(this.date);

        
        
    }



    async getAnime(day){
        
        
        this.slid = [];
        await currentlyAiringAnime().then(({shows, next}) => {
            this.show = [];
            for(x = 0;x < shows.length;x++){
                this.show.push(shows[x]);
               // console.log(shows[x].title.romaji);
              }
            console.log(next);
            if (next) {

                 next().then(({shows, next}) => {
                    
                  // logs shows
                  for(x = 0;x < shows.length;x++){
                    this.show.push(shows[x]);
                   //console.log(shows[x].title.romaji);
                  }
                  console.log(" this " + next);
                  if (next) {

                    next().then(({shows, next}) => {
                
                      // logs shows
                      for(x = 0;x < shows.length;x++){
                        this.show.push(shows[x]);
                      //  console.log(shows[x].title.romaji)
                      }
                      //;
                    
                    }); 
                }
                });
            } 
           // if(next){
          //      this.show += next;    
          //  }
            //console.log(shows);
            
          });
          console.log(this.show[34]);
          var x = 0;
          //this.show.length
          for(x = 0;x < this.show.length;x++){
           
              if (this.show[x].nextAiringEpisode != null){

                this.airDate = new Date(1000*(this.show[x].nextAiringEpisode.airingAt));
               
                console.log(this.show[x].nextAiringEpisode.timeUntilAiring);
                
                if((this.airDate.getDate() == this.date.getDate() && this.airDate.getMonth() == this.date.getMonth()) ){//|| this.show[x].nextAiringEpisode.timeUntilAiring > 518400
                    console.log(this.show[x])
                    this.slid.push(this.show[x].id); 
                   
                }
                
                
              }
              
              
              
                


          }

          
         


    }

    getList(){
        return this.slid;
    }

        

    getName(id){
        return this.show.find(x => x.id === id).title.romaji;
    }
    getCurrentEpisode(id){
        return this.show.find(x => x.id === id).nextAiringEpisode.episode;

    }
    getFinalEpisode(id){

        return this.show.find(x => x.id === id).episodes;
    }

    //Returns the broadcast time in the format of 
    getBroadcastTime(id, full){
        let time = DateTime.fromMillis((this.show.find(x => x.id === id).nextAiringEpisode.airingAt) * 1000);
        if(full){ 
           
            return time.toFormat("cccc") + " at " + time.toFormat("h':'mm a ZZZZ");

        }
        else
            return  time.toFormat("h':'mm a ZZZZ");
        

       
    }
    //Gets the description of the anime and removes all html tags from it
    getDescription(id){
        return this.removeTags(this.show.find(x => x.id === id).description);
    }

    //Gets the genres of the anime, if any
    getGenre(id){
        try{
            return "\nGenres: " + this.show.find(x => x.id === id).genres;
        }
        catch{
            return "N/A";
        }   
    }

    getStudioName(id){   
        try{
            return this.show.find(x => x.id === id).studios.edges[0].node.name;
        }
        catch{
            return "N/A";
        }  
        
    }

    //If producers are known presents them in a string sperated by commas
    getProducerName(id){
        if(typeof(this.show.find(x => x.id === id).studios.edges[1]) != 'undefined'){
        var x = this.show.find(x => x.id === id).studios.edges;
        var name = x[1].node.name.slice(7) + ", ";
        for(var c = 2; c < x.length; c++){
            
                name += x[c].node.name + ", ";
        }
        return name.slice(0,-1);
    }
    return "";

    }

    //Gets image link
    getCoverImageURL(id){
        return this.show.find(x => x.id === id).coverImage.large;
    }


    //Used to remove html tags from the descriptions
    removeTags(str) { 
        if ((str===null) || (str==='')) 
            return false; 
        else
            str = str.toString(); 
              
        // Regular expression to identify HTML tags in  
        // the input string. Replacing the identified  
        // HTML tag with a null string. 
        return str.replace( /(<([^>]+)>)/ig, ''); 
    } 
    


}module.exports = ScheduleHelper;