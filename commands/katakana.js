const Discord = require('discord.js');
var KanaLoader = require("../src/KanaLoader.js");
var LeaderBoard = require("../src/LeaderBoard.js");
const Shuffle = require('../src/RandomNumber.js');

module.exports = {
    name: 'katakana',
    description: 'Starts katakana quiz!',
    aliases: ["kata"],
	async execute(message, args) {
        //Check args
        //Begin the loop
        //Present question
        //Check answers

        var questions = 5;
        var timeOut = 15000;
        var totalChar = 46;
        const title = 'Katakana Quiz';
        var leaderboard = new LeaderBoard("Katakana", message.guild);
        var answer;
        var points = 50;
        

        //Checking arguments
        if(args.length > 0){
        if(args[0].toLowerCase() == "all"){
            totalChar = 71;
            args.shift();
        }
    }
        if(args.length > 0){
            questions = parseInt(args[0]);

        }
        else if(args.length > 1){
            timeOut = parseInt(args[1]);

        }

        var quiz = new KanaLoader("Katakana", totalChar);
        const questionList = Shuffle.shuffle(quiz.getNumberofKana(),0, questions);

        

        //Begin the loop
        var currentQuestion = 0;
        while(currentQuestion < questions){
            //Present the question                         
            
            quiz.setQuestion(questionList[currentQuestion]);

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
			if(response.content.toLowerCase() == "skip" || response.content.toLowerCase() == "stop"){
				return true;
			}
            return (answer.toLowerCase() == response.content.toLowerCase())
            
		};

        await message.channel.awaitMessages(filter, { max: 1, time: timeOut, errors: ['time'] })
                .then(collected => {
                    if(collected.first().content.toLowerCase() == "skip"){
                
                        const skip =  new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor("#ec1c24")
                        .setDescription("Question skipped!")
                        .addFields({name: "Correct Answers", value: answer});
                        message.channel.send(skip);
                        
                    }
                    else if(collected.first().content.toLowerCase() == "stop"){
                        
        
                        //Embed message that shows the correct answer
                        const stop =  new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor("#ec1c24")
                        .setDescription("Quiz Stopped")
                        .addFields({name: "Correct Answers", value: answer});
                        message.channel.send(stop);
                       
                        currentQuestion = questions;//Ends the while loop
                       
                    }
                    else{
                        
                        const op = collected.first().author.tag;
                        
                        leaderboard.addPoints(collected.first().author.id, points);
                        
                         
                        
                        const correct =  new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor("#48f05c")
                        .setDescription( op + ' got the correct answer!')
                        .addFields({name: "Correct Answers", value: answer, inline: true},
                        {name: "Points", value: "You earned " + points + " points", inline: true},
						{name: "Character", value: quiz.getCharacter()});
                        message.channel.send(correct);
                        
                    }
                    
                       
                    
                   
                })
                .catch(collected => {
                    const timeout =  new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor("#ec1c24")
                        .setDescription("Time's up!")
                        .addFields({name: "Correct Answers", value: answer});
                    
                    message.channel.send(timeout);
                });
                    
                    
        
        
                        currentQuestion++;
        
        
            }
            let winner = leaderboard.getWinner();
        
            const end =  new Discord.MessageEmbed()
                                .setTitle(title + ' Ended')
                                .setColor("#bd18c0")
                                .addFields({name : "Winner", value : winner[0], inline: true},
                                {name : "Points", value : winner[1], inline: true});
        
                                
                await message.channel.send(end);
                leaderboard.adjustLeaderBoard();
        
        
        
        


    



    }



};