var Pokedex = require('pokedex-promise-v2');
const Discord = require('discord.js');

module.exports = {
    name: "moves",
    description: "Starts a quiz based on pokemon moves",
    aliases: ["pokemoves", "abilities", "ability", "move"],
    async execute(message, args) {
        //By gen
        //By type

        var pokedex = new Pokedex();
        var totalQuestions = 5;
        var questions = [];
        var max;
        var min;

        var types = ["", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water",
         "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"];
        if(args.length == 0){
            min = 1;
            max = 826;

            //Generates the moves
            for(var x = 0; x < totalQuestions;x++){
                questions.push(Math.floor(Math.random() * (max - min) ) + min);
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
               max = response.moves.length - 1;
             
            })
            .catch(function(error) {
              console.log('There was an ERROR: ', error);
            });
            
            //Generates the moves
            for(var x = 0; x < totalQuestions;x++){
                console.log(Math.floor(Math.random() * (max - min) ) + min);
                questions.push(names[Math.floor(Math.random() * (max - min) ) + min]);
            }
            console.log("length:" + questions.length);
            console.log(questions[2]);


         }
         //end

         else{
            let genID = [[1,165], [166, 251], [252, 354], [355,467], [468,559], [560, 621], [622, 742], [743, 826], [1,826]];
            let region = [["kanto", "1", "I"], ["johto", "2", "II"],["hoenn", "3", "III"], ["sinnoh","4", "IV"],
         ["unova", "5", "V"], ["kalos","5", "VI"], ["alola", "6", "VII"], ["galar","7", "VIII"], ["all"]]
        .findIndex(x => x.some(answer => answer.toLowerCase() === args[0].toLowerCase()));

            let max = genID[region][1];
            let min = genID[region][0];

            for(var x = 0; x < totalQuestions;x++){
                questions.push(Math.floor(Math.random() * (max - min) ) + min);
            }

         }

         


        
        

        
        var answer;
        var type;
        var text;
        var accuracy;
        var pp;
        var currentQuestion = 1;

        while(currentQuestion != totalQuestions){

        

        await pokedex.getMoveByName(questions[currentQuestion-1])
        .then(function(response) {
          answer = response.name;
          type = response.type.name;
          text = response.flavor_text_entries[0].flavor_text;
          accuracy = response.accuracy;
          pp = response.pp;

          console.log(answer);
        console.log(type);
        console.log(accuracy);
        console.log(text);
        console.log(pp);

          for(var u = 0;u < response.flavor_text_entries.length; u++){
            if(response.flavor_text_entries[u].language.name == "en" ){
                //&& response.flavor_text_entries[u].version.name == "k"
                data = response.flavor_text_entries[u].flavor_text.replace(/\n/g, " ");
                text = data.replace(/\f/g, " ");
            }
            
            }

        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });


        const question = new Discord.MessageEmbed()
            .setColor("#aaaaaa")
            .setDescription(text);
            console.log(answer);
            message.channel.send(question);

            const filter = response => {
                
                return (answer.toLowerCase() === response.content.toLowerCase());
                
            };

            await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        message.channel.send("That is correct");
                        
                    })

                    .catch(collected => {
                        message.channel.send("Unlucky");
                    });



        

        currentQuestion++;
    }
}



}
