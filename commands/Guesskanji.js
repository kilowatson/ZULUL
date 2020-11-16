//import kanji from "./src/Kanji.js";
const Discord = require('discord.js');
var kanji = require("../src/Kanji.js");

module.exports = {
	name: 'kanji',
	description: 'Starts kanji quiz!',
	async execute(message, args) {
		quiz = new kanji();
		
		var x = 0;
		const filter = response => {
			if(response.content.toLowerCase() == "n" || response.content.toLowerCase() == "s"){
				return true;
			}
            return ans.some(answer => answer.toLowerCase() === response.content.toLowerCase())
            
		};
		
		while(x < 3){
		var c = Math.floor(Math.random() * (60 - 1 + 1) + 1);
		console.log(c);
		quiz.setKanji(c);
		//quiz.setKanji(3);	
		
		let file1 = new Discord.MessageAttachment(quiz.getImage());
		const exampleEmbed =  new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('AHHas  '+ quiz.getDifficulty())
		.setDescription("Enter the word associated with this kanji")
		.setFooter("This is a footer")
		
		.setImage("attachment://" + quiz.getName());

		
		var ans = quiz.getAnswer();
		
		
		message.channel.send({ files: [file1],embed: exampleEmbed });
		


		await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
					if(collected.first().content.toLowerCase() == "n"){
						message.channel.send("The correct answer: " + ans);
					}
					else if(collected.first().content.toLowerCase() == "s"){
						x = 3;
						message.channel.send("The correct answer: " + ans);
						message.channel.send("The quiz is over");
					}
                    else{
						message.channel.send(`${collected.first().author} got the correct answer!`);
					}
                    
                       
                    
                   
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. The answer was ' + ans);
				});
				
		x = x + 1;
		}
	},
};