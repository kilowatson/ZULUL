//import kanji from "./src/Kanji.js";
const Discord = require('discord.js');
var kanji = require("../src/Kanji.js");
var Jimp = require('jimp');
var LeaderBoard = require("../src/LeaderBoard.js");
const Shuffle = require('../src/RandomNumber.js');


module.exports = {
	name: 'kanji',
	description: 'Starts kanji quiz!',
	aliases: ['kj'],
	usage: '[Number of questions] [Number representing difficulty] [Time in seconds for questions]',
	examples: ['A.kanji 20 6 50', 'A.kanji 20', 'A.kanji 20 2'],
	async execute(message, args) {
		quiz = new kanji();
		var questions = 5;
		var timeOut = 30000;
		var difficulty = quiz.getDifficulty();
		
		

		if(args.length > 0){
			questions = parseInt(args[0])
			if(args.length > 1){
				difficulty = args[1]
				quiz.setDifficulty(difficulty);
				if(args.length > 2){
					timeOut = parseInt(args[2])
				}
			}
		}
		
		var title = '常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz';
		
		
		var time = timeOut / 1000;
		var points = 20 * difficulty;
		var currentQuestion = 0;//
		var leaderboard = new LeaderBoard("Kanji", message.guild);
		
		const questionList = Shuffle.shuffle(quiz.getNumberofKanji(),0, questions);
		console.log(questionList);

		let start =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("You have " + time +
						 " seconds to answer each question./nEnter 'n' to skip a question\nEnter 's' to stop the quiz early");

		
		while(currentQuestion < questions){
		
		

			console.log(questionList[currentQuestion]);
		quiz.setKanji(questionList[currentQuestion]);
		
		var ans = quiz.getAnswer();
		console.log(quiz.getAnswer());
		//Filter for quiz
		const filter = response => {
			if(response.content.toLowerCase() == "n" || response.content.toLowerCase() == "s"){
				return true;
			}
			console.log(ans);
			console.log(response.content);
			
			for(var i = 0;i < ans.length;i++){
				console.log(ans[i]);
				console.log((ans[i] == response.content  ));
			}
			console.log(ans.some(answer => answer.toLowerCase() === response.content.toLowerCase()))
            return ans.some(answer => answer.toLowerCase() === response.content.toLowerCase())
            
		};

		

		//Embeded message displaying the question
		
		
		//console.log(bg);
		const file = new Discord.MessageAttachment(quiz.getImage(), "lal.jpg");
		console.log(file);
		console.log(quiz.getImage());
		const exampleEmbed =  new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription("Enter the word associated with this kanji")
		
		//.setImage("");
		.setImage('attachment://lal.jpg')
		.attachFiles(file);
		
		
	
		
		
		await  message.channel.send(exampleEmbed);
		


		await message.channel.awaitMessages(filter, { max: 1, time: timeOut, errors: ['time'] })
                .then(collected => {
					console.log("popop");
					if(collected.first().content.toLowerCase() == "n"){
						
						const skip =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Question skipped!")
						.addFields({name: "Kanji", value: quiz.getKanji()},
						{name: "Correct Answers", value: ans});;
						message.channel.send(skip);
						
					}
					else if(collected.first().content.toLowerCase() == "s"){
						

						//Embed message that shows the correct answer
						const stop =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Quiz ended!")
						.addFields({name: "Kanji", value: quiz.getKanji()},
						{name: "Correct Answers", value: ans});
						
						message.channel.send(stop);
						
						currentQuestion = questions;//Ends the while loop
						
					}
                    else{
						console.log("Guessed correctly");
						const op = collected.first().author.tag;
						console.log("tag was acquired");
						leaderboard.addPoints(collected.first().author.id, points);
						console.log("points added");
						 //Add points to 200 * (100 / (difficulty * 100));
						
						const correct =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#48f05c")
						.setDescription( op + ' got the correct answer!')
						.addFields({name: "Correct Answers", value: ans, inline: true},
						{name: "Points", value: "You earned " + points + " points", inline: true},
						{name: "Kanji", value: quiz.getKanji()});
						message.channel.send(correct);
						
					}
                    
                       
                    
                   
                })
                .catch(collected => {
					const timeout =  new Discord.MessageEmbed()
						.setTitle(title)
						.setColor("#ec1c24")
						.setDescription("Times up!")
						.addFields({name: "Kanji", value: quiz.getKanji()},
						{name: "Correct Answers", value: ans});
					
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
};