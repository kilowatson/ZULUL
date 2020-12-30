const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "islam",
    description: "Reads a verse",
    aliases: [],
    async execute(message, args) {
        
        
        if(args.length == 0){
            let random = await fetch("http://quranapi.azurewebsites.net/api/verse/?lang=en")
                .then(res => res.json());

            let verse = new MessageEmbed()
                .setColor("#886843")
                .setDescription(random.Text)
                .setFooter("Quran: Chapter " + random.Chapter + ", Verse " + random.Id);
            message.channel.send(verse);
        }


        else if(args[0] == "daily"){
        let daily = await fetch("https://salamquran.com/en/api/v6/aya/day")
                .then(res => res.json());
                
                
                let verse = new MessageEmbed()
                
                .setColor("#886843")
                .setDescription(daily.result.text + "\n\n" + daily.result.translate.text)
                .setFooter("Quran: Chapter " + daily.result.sura + ", Verse " + daily.result.aya);
                
        
        message.channel.send(verse);
        }

    }};