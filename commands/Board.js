
const LeaderBoard = require("../src/LeaderBoard.js");
const Discord = require('discord.js');
module.exports = {
    name: 'board',
    description: 'Displays a leaderboard',
    aliases: ["leaderboard"],
	async execute(message, args) {
        var leaderboardName = args[0][0].toUpperCase() + args[0].slice(1)   ;
        //console.log(leaderoard);
        var leaderboard = new LeaderBoard(leaderboardName, message.guild);
        //var leaderboard = new LeaderBoard("PokemonName", message.guild);
        var board = leaderboard.getLeaderBoard();
        var names = "";
        var points = "";
        for(var x = 0; x < board[0].length; x++){
            names += "\n" + board[0][x];
            points += "\n" + board[1][x];
        }
        const display =  new Discord.MessageEmbed()
						.setTitle(leaderboardName)
						.setColor("#ec1c24")
						.addFields({name: "Name", value: names, inline: true},
						{name: "Points", value: points, inline: true});;
						message.channel.send(display); 
        

    }};