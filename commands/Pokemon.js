
//Get whatever the fuck they want
//Options Gen 1-8
//Get all of the fucking pokemon data
//Make embed that displays the pokedex description
//await answeres
//When answered correctly display pokemon name(romaji as well maybe) and picture
const { MessageEmbed } = require('discord.js');
var Pokedex = require('pokedex-promise-v2');
const Discord = require('discord.js');
module.exports = {
    name: "pokemon",
    description: "Starts a pokemon description quiz",
    aliases: ["poke"],
    async execute(message, args) {
        var pokedex = new Pokedex();
        var data;
        var name;
        let totalQuestions = 4;
        var currentQuestion = 1;
        let region = [["kanto", "1", "I"], ["johto", "2", "II"],["hoenn", "3", "III"], ["sinnoh","4", "IV"], ["unova", "5", "V"], ["kalos","5", "VI"], ["alola", "6", "VII"], ["galar","7", "VIII"], ["all"]].findIndex(x => x.some(answer => answer.toLowerCase() === args[0].toLowerCase()));
        let pokedexIndex = [[1,151], [152, 251], [252, 386], [387, 493], [494, 649], [650, 721], [722, 809], [810, 890],[1,890]];
        min = pokedexIndex[region][0];
        max = pokedexIndex[region][1];
        while(currentQuestion <= totalQuestions){

            let choice = Math.floor(Math.random() * (max - min) ) + min;
            await pokedex.getPokemonSpeciesByName(choice)
            .then(response =>{
                name = response.name;
                for(var u = 0;u < response.flavor_text_entries.length; u++){
                    if(response.flavor_text_entries[u].language.name == "en" ){
                        //&& response.flavor_text_entries[u].version.name == "k"
                        data = response.flavor_text_entries[u].flavor_text.replace(/\n/g, " ");
                        data = data.replace(/\f/g, " ");
                    //data = response.flavor_text_entries[u].flavor_text.replace(/\n/g, " ");
                    
                    
                    // console.log(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png);
                    // break;
                    }
                }
            })
            .catch(error =>{
                console.log(error);
            });

            const question = new Discord.MessageEmbed()
            .setColor("#aaaaaa")
            .setDescription(data);
            console.log(name);
            message.channel.send(question);

            const filter = response => {
                
                return (name.toLowerCase() == response.content.toLowerCase());
                
            };

            await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        message.channel.send("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ choice +".png");
                        
                    })

                    .catch(collected => {
                        message.channel.send("Unlucky");
                    });

                
                


                    currentQuestion++;


    }

    
       //console.log(list);


        

    }
};