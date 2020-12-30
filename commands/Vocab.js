const WordImage = require("../src/Draw.js");
const Vocabulary = require("../src/LoadVocab.js");
const LeaderBoard = require("../src/LeaderBoard.js");
const Discord = require('discord.js');

module.exports = {
    name: 'vocab',
    description: 'Starts vocabulary quiz.',
    aliases: ['vocabulary', 'v'],
    async execute(message, args) {
        
		//All initial declarations
		var level = "5";
        var vocab = new Vocabulary(level);
        var wordImage = new WordImage();
        var word;
        
        var leaderboard = new LeaderBoard("Vocabulary", message.guild);
        var  answers;
        var timeOut = 15000;
        var title = "JLPT N"+level+" Vocab Quiz";
        var points = 200;
        var currentQuestion = 0;
        var questions = 20;
        var set = false;

        let start =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("There are "+ questions +" questions, you have " + (timeOut / 1000)+
						 " seconds to answer each question.\nEnter 'n' to skip a question\nEnter 's' to stop the quiz early");

        message.channel.send(start);
        
		while(currentQuestion < questions){

			while(!set){
            word = vocab.getWord();
			
			answers = await vocab.getAnswer();
			if(answers != ""){
				set = true;
				}
			}
			set = false;
			
            var exampleSentence = await vocab.getExampleSentence();

            var reading = vocab.getReading();

            var testableAnswer = vocab.getTestableAnswer();
            
            console.log(exampleSentence);
		    //Filter for quiz
		    const filter = response => {
			    if(response.content.toLowerCase() == "n" || response.content.toLowerCase() == "s"){
				    return true;
			    }
			    console.log(testableAnswer);
			    console.log(response.content);
			//For loop is debug
			    for(var i = 0;i < answers.length;i++){
				    console.log(testableAnswer[i]);
				    console.log((testableAnswer[i] == response.content  ));
			    }
			console.log(testableAnswer.some(answer => answer.toLowerCase() === response.content.toLowerCase()));//Debug
            return testableAnswer.some(answer => answer.toLowerCase() === response.content.toLowerCase())
            
		};

		

		//Embeded message displaying the question
		
		
		//console.log(bg);
        const file =  wordImage.drawWord(message, word);
        
		const questionEmbed =  new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription("Enter the word associated with this kanji")
		.setImage('attachment://word.png')
		.attachFiles(file);

		message.channel.send(questionEmbed);
		

		await message.channel.awaitMessages(filter, { max: 1, time: timeOut, errors: ['time'] })
                .then(collected => {
					
					if(collected.first().content.toLowerCase() == "n"){
						
						const skip =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Question skipped!")
						.addFields({name: "Correct Answers", value: answers, inline: true},
						{name: "Example Sentence", value: exampleSentence[0] + "\n" +
						exampleSentence[1] +  "\n"+ 
						exampleSentence[2]},
                        {name: "Word", value: word, inline: true},
                        {name: "Reading", value: reading, inline: true});
						message.channel.send(skip);
						
					}
					else if(collected.first().content.toLowerCase() == "s"){
						

						//Embed message that shows the correct answer
						const stop =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Quiz Stopped")
						.addFields({name: "Correct Answers", value: answers, inline: true},
						{name: "Example Sentence", value: exampleSentence[0] + "\n" +
						exampleSentence[1] +  "\n"+ 
						exampleSentence[2]},
                        {name: "Word", value: word, inline: true},
                        {name: "Reading", value: reading, inline: true});
						message.channel.send(stop);
						
						currentQuestion = questions;//Ends the while loop
						
					}
                    else{
						
						const op = collected.first().author.tag;
						
						leaderboard.addPoints(collected.first().author.id, points);
						
						 //Add points to 200 * (100 / (difficulty * 100));
						
						const correct =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#48f05c")
						.setDescription( op + ' got the correct answer!')
						.addFields({name: "Correct Answers", value: answers, inline: true},
                        {name: "Points", value: "You earned " + points + " points", inline: true},
						{name: "Example Sentence", value: exampleSentence[0] + "\n" +
						exampleSentence[1] +  "\n"+ 
						exampleSentence[2]},
                        {name: "Word", value: word, inline: true},
                        {name: "Reading", value: reading, inline: true});
						message.channel.send(correct);
						
					}
                    
                       
                    
                   
                })
                .catch(collected => {
					const timeout =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Time's up!")
						.addFields({name: "Correct Answers", value: answers, inline: true},
						{name: "Example Sentence", value: exampleSentence[0] + "\n" +
						exampleSentence[1] +  "\n"+ 
						exampleSentence[2]},
                        {name: "Word", value: word, inline: true},
                        {name: "Reading", value: reading, inline: true});;
					
                    message.channel.send(timeout);
				});
				
			currentQuestion++;
		}

		
		
		var winner = leaderboard.getWinner();
		
		
		const end =  new Discord.MessageEmbed()
						.setTitle(title + ' Ended')
						.setColor("#bd18c0")
						.addFields({name : "Winner", value : winner[0], inline: true},
						{name : "Points", value : winner[1], inline: true});

						
						await message.channel.send(end);
		leaderboard.adjustLeaderBoard();
	},



        //await message.channel.send({ files: [pic]});
        
    };