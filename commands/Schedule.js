var ScheduleHelper = require("../src/ScheduleHelper.js");
const Discord = require('discord.js');

var prev;
module.exports = {
    name: 'schedule',
    description: 'Shows schedule based on day entered',
    aliases: ['s', 'shed'],
    async execute(message, args) { 
        
        var scheduler;
        if(args.length == 1){
            scheduler =  new ScheduleHelper(args[0]);
            console.log((typeof args[0]  === 'string'));
        }
        else if(args.length == 0)
            scheduler =  new ScheduleHelper(new Date().getDay())
        else
            return;
        
        await scheduler.getAnime(24); 
        var list = scheduler.getList();
        if(list.length == 0){
            console.log("empty");
            return;
        }
        var max = list.length;

        console.log(list);
        var i = 0;

        var index = "";
        var names = "";
        var broadcastTime = "";
        var upcomingEpisode = "";

        var prevname = "";
        var name = "";
        for(i = 0; i < list.length; i++){
            console.log(list[i]);
            prevname = name;
            name = [(i+1).toString(), scheduler.getName(list[i])].join(" <:girl:778478477337821186>  ") + "\n\n"
            names +=  name;
            console.log(name.length);
            if(70 < prevname.length){
                broadcastTime +=  scheduler.getBroadcastTime(list[i], false) + "\n\n\n";
            upcomingEpisode += scheduler.getCurrentEpisode(list[i]) + "\n\n\n"; 
                
            }
            else{
                broadcastTime += scheduler.getBroadcastTime(list[i], false) + "\n\n";
            upcomingEpisode += scheduler.getCurrentEpisode(list[i]) + "\n\n"; 

            }
            
        }
        console.log(names);
        const AssignedSchedule = new Discord.MessageEmbed()
	    .setColor('#0099ff')
        .setTitle('Schedule for In Season Anime')
        .addFields(
            {name: "#      Name                    ", value:  names, inline: true},
            {name: "Upcoming Episode  ", value: upcomingEpisode, inline: true},
            {name: "Broadcast Time  ", value: broadcastTime, inline: true}
        )
        .setFooter("Enter a number to see detailed view");
        var k = await message.channel.send(AssignedSchedule);
            console.log(k);
        
        const filter = response => {
			if(response.content.toLowerCase() == "n" || (parseInt(response.content) > 0 && parseInt(response.content) < list.length + 1)){
				return true;
            }

            
                
        //const back = response =>{
        //    if()
       // }
            
            
            
		};

        await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        .then(async (collected) => {
            if(collected.first().content.toLowerCase() == "n"){
                return;
            }

            //Creating embed showing details
            var choice = parseInt(collected.first().content)-1;
            var id = list[choice];
            console.log(list.length);
            const Details = new Discord.MessageEmbed()
	        .setColor('#800080')
            .setTitle(scheduler.getName(id))
            .setDescription(scheduler.getDescription(id)) 
            .setImage(scheduler.getCoverImageURL(id))
            .setFooter("Episodes : " + ((parseInt(scheduler.getCurrentEpisode(id)) - 1)).toString() + "/" + scheduler.getFinalEpisode(id) + scheduler.getGenre(id) +
            "\nStudio: " + scheduler.getStudioName(id) + "\nProducers: " + scheduler.getProducerName(id)+  "\nAiring Date: " + scheduler.getBroadcastTime(id, true));
              prev = await  message.channel.send(Details);

               await prev.react("⬅️");
                await prev.react("➡️");
               
               
             //message.
            //await message.channel.awaitMessages
            //console.log(prev);
            const filter2 = (reaction) => {
                
                return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' || reaction.emoji.name == "😄");
            };
            
            var end = 0;
            increment = 0;
            while(end == 0){
               
            await  prev.awaitReactions(filter2,{max: 1, time: 30000, errors: ['time'] })

            .then(async(collected)  => {
                console.log(collected.first().author);
                if(collected.first().emoji.name == "😄" ){
                    end = 1;
                }
                else if(collected.first().emoji.name == "⬅️" && choice + increment != 0){
                    increment -= 1;
                    console.log("heo");

                }
                else if(choice + increment !=  max - 1){
                    increment += 1;
                   
                    console.log("ho");
                }
                id = list[choice+increment];
                console.log("Is it me?");
                const Detail = new Discord.MessageEmbed()
	        .setColor('#800080')
            .setTitle(scheduler.getName(id))
            .setDescription(scheduler.getDescription(id)) 
            .setImage(scheduler.getCoverImageURL(id))
            .setFooter("Episodes : " + ((parseInt(scheduler.getCurrentEpisode(id)) - 1)).toString() + "/" + scheduler.getFinalEpisode(id) + 
            scheduler.getGenre(id) +
            "\nStudio: " + scheduler.getStudioName(id) + "\nProducers: " + scheduler.getProducerName(id) + "\nAiring Date: " + scheduler.getBroadcastTime(id, true));
              await prev.edit(Detail);
              await prev.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              await prev.react("⬅️");
                await prev.react("➡️");
            })
            
            .catch(collected => {
                end = 1;
                prev.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                
                console.log(`Collected ${collected.size} items`);
            });
            console.log("do I work");
            
        }

        });
        
    }
    };