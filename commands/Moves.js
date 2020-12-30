var Pokedex = require('pokedex-promise-v2');
const Discord = require('discord.js');
const LeaderBoard = require("../src/LeaderBoard.js");
const Draw = require("../src/Draw.js");

module.exports = {
    name: "moves",
    description: "Starts a quiz based on pokemon moves",
    aliases: ["pokemoves", "abilities", "ability", "move", "mv"],
    async execute(message, args) {
        //By gen
        //By type

        var pokedex = new Pokedex();
        var totalQuestions = 5;
       
        var max;
        var min;
        var response;
        var types = ["", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water",
         "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"];
        if(args.length == 0){
            min = 1;
            max = 827;

            //Generates the moves
            let set = false;
            while(!set){
                response = await pokedex.getMoveByName(Math.floor(Math.random() * (max - min) ) + min);
                console.log(response);
                if(response.flavor_text_entries != undefined && response.flavor_text_entries != null){
                    set = true;
                }
            }
            
            

            

         }
         //Types
         else if(types.includes(args[0])){

            var names = [];
            let search = types.findIndex(x => x === args[0]);//.toLowerCase()
            console.log(search);
            await pokedex.resource("api/v2/type/" + search + "/")
            .then(function(response) {
            console.log(response.moves[2].name);
               for(var c = 0; c < response.moves.length - 1; c++){
                   
                    names.push(response.moves[c].name);
                    
               }
               min = 0;
               max = response.moves.length;
             
            })
            .catch(function(error) {
              console.log('There was an ERROR: ', error);
            });
            
            //Generates the moves
            let set = false;
            while(!set){
                response = await pokedex.getMoveByName(names[Math.floor(Math.random() * (max - min) ) + min]);
                if(response.flavor_text_entries != undefined && response.flavor_text_entries != null){
                    set = true;
                }
            }
               
            
            


         }
         //end

         else{
            let genID = [[1,165], [166, 251], [252, 354], [355,467], [468,559], [560, 621], [622, 742], [743, 826], [1,826]];
            let region = [["kanto", "1", "I"], ["johto", "2", "II"],["hoenn", "3", "III"], ["sinnoh","4", "IV"],
         ["unova", "5", "V"], ["kalos","5", "VI"], ["alola", "6", "VII"], ["galar","7", "VIII"], ["all"]]
        .findIndex(x => x.some(answer => answer.toLowerCase() === args[0].toLowerCase()));

            let max = genID[region][1] + 1;
            let min = genID[region][0];

            let set = false;
            while(!set){
                response = await pokedex.getMoveByName(Math.floor(Math.random() * (max - min) ) + min);
                if(response.flavor_text_entries != undefined && response.flavor_text_entries != null){
                    set = true;
                }
            }
              
            

         }

         


        
        

        
        var answer;
        var type;
        var text;
        var accuracy;
        var pp;
        var power;
        var category;
         var data = [];

      

        
    
         for(var u = 0;u < response.names.length; u++){
            if(response.names[u].language.name == "en" ){
                //&& response.flavor_text_entries[u].version.name == "k"
                answer = response.names[u].name;
                break;
                
            }
            
            }
      
         
          type = response.type.name;
          text = response.flavor_text_entries[0].flavor_text;
          if(response.accuracy == null){
            accuracy = "-";
          }
          else{
            accuracy = response.accuracy;
          }
          if(response.power == null){
            power = "-";
          }
          else{
            power = response.power;
          }
          
          pp = response.pp;
         
            category = response.damage_class.name;
          console.log(answer);
        console.log(type);
        console.log(accuracy);
        console.log(text);
        console.log(pp);

          for(var u = 0;u < response.flavor_text_entries.length; u++){
            if(response.flavor_text_entries[u].language.name == "en" ){
                //&& response.flavor_text_entries[u].version.name == "k"
                data.push(response.flavor_text_entries[u].flavor_text);
                
            }
            
            }
            
            text = data[Math.floor(Math.random() * data.length )].replace(/\n/g, " ");
            text = text.replace(/\f/g, " ");

            const pokemonMove = {
                type: type,
                accuracy: accuracy,
                description: text,
                pp: pp,
                power: power,
                category: category
            };
            var description = new Draw();
            const file = await description.drawPokemonMoveDescription(pokemonMove);

        
            console.log(answer);
            message.channel.send(file);

            const filter = response => {
                
                return (answer.toLowerCase() === response.content.toLowerCase());
                
            };

            await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        var leaderboard = new LeaderBoard("Move", message.guild);
                        leaderboard.addPoints(collected.first().author.id, 500);
                        leaderboard.adjustLeaderBoard();
                        const correct =  new Discord.MessageEmbed()
						.setTitle(answer[0].toUpperCase() + answer.slice(1))
						.setColor("#bd18c0")
						.setDescription(collected.first().author.tag    + " got the answer\n 500 points gained\nAbsolute nerd.")
						

                        message.channel.send(correct);
                        
                        
                    })

                    .catch(collected => {
                        message.channel.send(answer[0].toUpperCase() + answer.slice(1));
                    });



        

        
    }




}
