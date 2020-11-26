const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "number",
    description: "Gives a random number fact",
    aliases: ["num"],
    async execute(message, args) {
        var url;
        if(args.length == 1){
            url = "http://numbersapi.com/random/" + args[0];
        }
        else{
            let choice = ["trivia", "math", "date", "year"]
            
            url = "http://numbersapi.com/random/" + choice[Math.floor(Math.random() * 3 )];
        }


        axios.get(url)
        .then(data=>{
            
            const fact = new MessageEmbed()
            .setDescription(data.data);
            message.channel.send(fact);
        })
       
        .catch(error=>{
            console.log(error);
        });


    }
}