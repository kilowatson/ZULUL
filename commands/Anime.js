const AnimeDescription = require("../src/AnimeDescription.js");
const Discord = require('discord.js');
const { color } = require("jimp");
const levenshtein = require('js-levenshtein');
var LeaderBoard = require("../src/LeaderBoard.js");

module.exports = {
    name: "anime",
    description: "Starts a quiz based on pokemon moves",
    aliases: [],
    async execute(message, args) {
        var quiz = new AnimeDescription();
        var leaderboard = new LeaderBoard("Anime", message.guild);
        var points = 500;

        var question = new Discord.MessageEmbed()
        .setTitle(quiz.getType())
        .setColor("#222222")
        .setDescription(quiz.getDescription())
        .setFooter(quiz.getHint());
        
        message.channel.send(question);

        var answer = quiz.getAnswer();
        //Filter for question
        const filter = response => {
			if(response.content.toLowerCase() == "n" || response.content.toLowerCase() == "s"){
				return true;
			}
            return (levenshtein(answer.toLowerCase(), response.content.toLowerCase()) < 4 )
            
		};

        await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(":)");
                    leaderboard.addPoints(collected.first().author.id, points);
                })

                .catch(collected => {
                    message.channel.send("Unlucky");
                });
        leaderboard.adjustLeaderBoard();

            
            


              


    




        



















        




    }}