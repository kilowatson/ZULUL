//import kanji from "./src/Kanji.js";
const Discord = require('discord.js');
var kanji = require("../src/Kanji.js");
var Jimp = require('jimp');
var LeaderBoard = require("../src/LeaderBoard.js");


module.exports = {
	name: 'kanji',
	description: 'Starts kanji quiz!',
	async execute(message, args) {
		quiz = new kanji();
		var questions = 5;
		var timeOut = 30000;
		var difficulty = quiz.getDifficulty();
		var points = 200;
		
		

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
		
		


		var currentQuestion = 0;//
		var leaderboard = new LeaderBoard("Kanji", message.guild);
		while(currentQuestion < questions){
		var c = Math.floor(Math.random() * (60 - 1 + 1) + 1);
		

		
		quiz.setKanji(c);
		var ans = quiz.getAnswer();

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
		.setFooter("This is a footer")
		//.setImage("");
		.setImage('attachment://lal.jpg')
		.attachFiles(file);
		
		
		
		//console.log(loc);
		
/*
		const question = {
			title: title,
			color :'#0099ff',
			description: "Enter the word associated with this kanji",
			image: {
				url: 'attachment://lplplp.jpg'
			},
			footer: "Enter n to skip and s to end the quiz"
		}
		*/
		
		//https://www.japanesewordswriting.com/wp-content/uploads/2010/09/hiragana-wo-150x150.png
		//https://www.japanesewordswriting.com/wp-content/uploads/2010/09/katakana-wo-150x150.png
		
		
		await  message.channel.send(exampleEmbed);
		
		

		await message.channel.awaitMessages(filter, { max: 1, time: timeOut, errors: ['time'] })
                .then(collected => {
					console.log("popop");
					if(collected.first().content.toLowerCase() == "n"){
						
						const skip =  new Discord.MessageEmbed()
						.setTitle('常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz')
						.setColor("#ec1c24")
						.setDescription("Question skipped!\nCorrect answers\n" + ans);
						message.channel.send(skip);
						
					}
					else if(collected.first().content.toLowerCase() == "s"){
						

						//Embed message that shows the correct answer
						const stop =  new Discord.MessageEmbed()
						.setTitle('常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz')
						.setColor("#ec1c24")
						.setDescription("Correct answers\n" + ans);
						
						message.channel.send(stop);
						if(currentQuestion == 0)
							return;
						currentQuestion = questions;//Ends the while loop
						
					}
                    else{
						console.log("Guessed correctly");
						const op = collected.first().author.tag;
						console.log("tag was acquired");
						leaderboard.addPoints(points, collected.first().author.id);
						console.log("points added");
						 //Add points to 200 * (100 / (difficulty * 100));
						
						const correct =  new Discord.MessageEmbed()
						.setTitle('常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz')
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
						.setTitle('常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz')
						.setColor("#ec1c24")
						.setDescription("Times up!\nCorrect answers\n" + ans);
					
                    message.channel.send(timeout);
				});
				
			currentQuestion++;
		}

		console.log(currentQuestion);
		if(currentQuestion == 1)
			return 1;
		var l = leaderboard.getWinner();
		
		
		const end =  new Discord.MessageEmbed()
						.setTitle('常用漢字 Jouyou Kanji Grade '+ difficulty + ' Quiz Ended')
						.setColor("#bd18c0")
						.setDescription("dfdf")
						.addFields({name : "Winner", value : l});

						
						message.channel.send(end);
	},
};