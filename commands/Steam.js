const Discord = require('discord.js');

module.exports = {
    name: 'steam',
    description: 'Steam stuff.',
    aliases: [],
    async execute(message, args) {
        const SteamAPI = require('steamapi');
        const steam = new SteamAPI('641E8A64CACF55C6C68A087E1D2D5418');

  
  steam.getFeaturedCategories().then(summary => {
    const stop =  new Discord.MessageEmbed()
   .setTitle("Featured Games on Sale")
    .setColor("#ec1c24");
    
    var names = "";
    var percents = "";
    var discountedPrice = "";
    var originalPrice = "";
    var name;
    console.log(summary);
    for(var i = 0; i < summary[2].items.length; i++){
        name = summary[2].items[i].name;
        console.log(summary[2].items[i]);
        name = name.replace(/[™]/,"");
        while(name.search(" ") != -1){
            name = name.replace(/ /, "_");
        }
        if(summary[2].items[i].type === 1){
            names += "[" + (summary[2].items[i].name).slice(0,30) +"](https://store.steampowered.com/sub/" + summary[2].items[i].id  +")\n\n";
        }
        else
        names += "[" + (summary[2].items[i].name).slice(0,30) +"](https://store.steampowered.com/app/" + summary[2].items[i].id  +"/" + name + ")\n\n"
       
        
        
        percents += summary[2].items[i].discount_percent + "%\n\n";
        discountedPrice += "$" + (parseFloat(summary[2].items[i].final_price)/100) + "\n\n";
        originalPrice += summary[2].items[i].original_price + "\n\n";
        
    }
    stop.addFields({name: "Name", value: names, inline: true},
    {name: "Discount Percent", value: percents, inline: true},
    {name: "Discount Price", value: discountedPrice, inline: true});
  
    message.channel.send(stop);
    //name discount_percent original_price final_price currency id
  });

    }};