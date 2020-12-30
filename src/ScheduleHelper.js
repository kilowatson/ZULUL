const fetch = require('node-fetch');
const  getJsD  = require("excel-date-to-js");
var { DateTime } = require('luxon');

global.fetch = fetch


const { Message } = require('discord.js');

class ScheduleHelper{

   constructor(day){
       let cat = [["sunday", "sun", "0"], ["monday", "mon","m", "1"], ["tuesday", "tues", "tue", "2"], ["wednesday", "wed","w", "3"],
        ["thursday", "thurs", "4"], ["friday", "fri","f", "5"], ["saturday", "sat", "6"]];
        this.day = -1;
        this.invalid = false;
        this.todayDate = new Date();
        this.date = this.todayDate;
        this.shows = [];
        this.ids = [];

        if(parseInt(day) == this.todayDate.getDay()){
            this.date = this.todayDate;
            

        }
       else if(typeof day  === 'string'){
           var x = 0;
           
           for(x = 0;x < 7;x++){
               if(cat[x].includes(day)){
                this.day = x;
                
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

               }
               else{
                   let increment = this.day - this.todayDate.getDay();
                   this.date.setDate(this.todayDate.getDate() + increment);

               }
           }
           
       }
       

       

        
        
    }

    async getAnime(){
        
        
        var query = `
        query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(status: RELEASING, type: ANIME, countryOfOrigin: JP) {
                id
                title {
                romaji
                }
                episodes
                genres
                nextAiringEpisode {
                episode
                airingAt
                timeUntilAiring
                }
                description
                averageScore
                coverImage {
                large
                }
                studios {
                edges {
                    node {
                    name
                    }
                }
                }
            }
            }
        }
        
        `;





let nextPage = true;
let pageNum = 1;  
while(nextPage){
    var variables = {
        perPage: 50,
        page: pageNum
    
    };
    var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
    
    var result = await fetch(url, options);
    result = await result.json();
    nextPage =  result.data.Page.pageInfo.hasNextPage; 
   
    result = result.data.Page.media;
    
    for(var x = 0;x < result.length;x++){
        if(result[x].nextAiringEpisode != null){

            let airDate = new Date(1000*(result[x].nextAiringEpisode.airingAt));
            
            if(airDate.getMonth() == this.date.getMonth() && airDate.getDate() == this.date.getDate()){
              
                this.shows.push(result[x]);
                
            }
        }
        
       
    }

    pageNum++;
}


this.shows.sort(function(a, b){if(a.nextAiringEpisode && b.nextAiringEpisode)return a.nextAiringEpisode.airingAt  - b.nextAiringEpisode.airingAt});
for(var i = 0; i < this.shows.length; i++){
    this.ids.push(this.shows[i].id);
}



   
    
    
}

   
    getList(){   

       
        return this.ids;
    }

        

    getName(id){
        return this.shows.find(x => x.id === id).title.romaji;
    }
    getCurrentEpisode(id){
        return this.shows.find(x => x.id === id).nextAiringEpisode.episode;

    }
    getFinalEpisode(id){

        return this.shows.find(x => x.id === id).episodes;
    }
    getAverageScore(id){
        try{
            return this.shows.find(x => x.id === id).averageScore;
        }
        catch{
            return "Unknown";
        }
       
    }

    //Returns the broadcast time in the format of 
    getBroadcastTime(id, full){
        let time = DateTime.fromMillis((this.shows.find(x => x.id === id).nextAiringEpisode.airingAt) * 1000);
        if(full){ 
           
            return time.toFormat("cccc") + " at " + time.toFormat("h':'mm a ZZZZ");

        }
        else
            return  time.toFormat("h':'mm a ZZZZ");
        

       
    }
    //Gets the description of the anime and removes all html tags from it
    getDescription(id){
        return this.removeTags(this.shows.find(x => x.id === id).description);
    }

    //Gets the genres of the anime, if any
    getGenre(id){
        var genres = "\nGenres: ";
        try{
            
            var genre = this.shows.find(x => x.id === id).genres;
            
            genres += genre[0];
          
            for(var x = 1; x < genre.length; x++){
                genres += ", " + genre[x];
               
            }
            return genres;
        }
        catch{
            genres += "N/A";
            return genres;
        }   
    }

    getStudioName(id){   
        try{
            return this.shows.find(x => x.id === id).studios.edges[0].node.name;
        }
        catch{
            return "N/A";
        }  
        
    }

    //If producers are known presents them in a string sperated by commas
    getProducerName(id){
        if(typeof(this.shows.find(x => x.id === id).studios.edges[1]) != 'undefined'){
        var x = this.shows.find(x => x.id === id).studios.edges;
        var name = x[1].node.name;
        for(var c = 2; c < x.length; c++){          
            
                name += ", " + x[c].node.name;
        }
        return name.slice(0,-1);
    }
    return "";

    }

    //Gets image link
    getCoverImageURL(id){
        return this.shows.find(x => x.id === id).coverImage.large;
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