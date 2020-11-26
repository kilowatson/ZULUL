const Discord = require('discord.js');
var KanaLoader = require("../src/KanaLoader.js");
var LeaderBoard = require("../src/LeaderBoard.js");


module.exports = {
    name: 'hiragana',
	description: 'Starts hiragana quiz!',
	async execute(message, args) {
        //Check args
        //Begin the loop
        //Present question
        //Check answers

        var questions = 5;
        var timeOut = 15000;
        var totalChar = 46;
        var points = 200;
        const title = 'Hiragana Quiz';
        
        
        

        //Checking arguments
        if(args.length > 0){
        if(args[0].toLowerCase() == "all"){
            totalChar = 69;
            args.shift();
        }
    }
        if(args.length > 0){
            questions = parseInt(args[0]);

        }
        else if(args.length > 1){
            timeOut = parseInt(args[1]);

        }

        var quiz = new KanaLoader("Hiragana", totalChar);
        var leaderboard = new LeaderBoard("hiragana", points);

        

        //Begin the loop
        var currentQuestion = 0;
        while(currentQuestion < questions){
            //Present the question                         
            var randQuestion = Math.floor(Math.random() * (totalChar - 1 + 1) + 1);
            quiz.setQuestion(randQuestion);

            const file = new Discord.MessageAttachment(quiz.getImageLoc());

            const exampleembed = {
                title: title,
                color :'#0099ff',
		        description: "Enter the sound associated with this character",
	            image: {
		            url: 'attachment://' + quiz.getImageName()
            }
            
            
        };
       
        await  message.channel.send({ files: [file], embed: exampleembed });

        answer = quiz.getAnswer();
        //Filter for question
        const filter = response => {
			if(response.content.toLowerCase() == "n" || response.content.toLowerCase() == "s"){
				return true;
			}
            return (answer.toLowerCase() == response.content.toLowerCase())
            
		};

        await message.channel.awaitMessages(filter, { max: 1, time: timeOut, errors: ['time'] })
                .then(collected => {
                    if(collected.first().content == "n"){

                        let skip = new Discord.MessageEmbed()
                        .title(title)
                        .color()
                        .description

                    }
                    else if(collected.first().content == "s"){
                        currentQuestions = questions;
                    }
                    else{

                    }
                    message.channel.send(":)");
                })

                .catch(collected => {
                    message.channel.send("Unlucky");
                });

            
            


                currentQuestion++;


    }



    }



};