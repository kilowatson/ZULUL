//https://tenor.com/view/forsencoomer-gif-19185596
//https://imgur.com/4fglvfb       bj
//
const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'forsen',
	description: 'FORSAAAAAAAAAN',
	async execute(message, args) {
        let link;
        let lost = false;
        const YTAPI_KEY = "";
        const channelID = "UCoqDr5RdFOlomTQI2tkaDOA";
        if(args.length == 0){
            
            message.channel.send("https://cdn.mos.cms.futurecdn.net/58b85585972e0f04b20e1f31ac5e6c75-970-80.jpg.webp");
            return;
        }
        
        switch(args[0].toLowerCase()) {
            case "endermanpov":
              link = "https://i.redd.it/md9p1m2qi3u51.png";
              break;
            case "hobosen":
              link = "https://i.imgur.com/adPr318.png";
              break;
            case "billy":
                link = "https://i.redd.it/m77xps67quj21.png";
                break;
            case "oldforsen":
                link = "http://makefacts.com/wp-content/uploads/2020/07/original-33-1180x667.jpg";
                break;
            case "necksen":
                link = "https://i.ytimg.com/vi/3gnNOyMT0jc/maxresdefault.jpg";
                break;
            case "uganda":
                link = "https://pbs.twimg.com/media/DM6GbO6WsAISxUo.jpg";
                break;
            case "e":
                link = "https://i.kym-cdn.com/photos/images/original/001/336/309/b85.jpg";
                break;
            case "bj":
                link = "https://imgur.com/4fglvfb"
                break;
            case "coomer":
                link = "https://tenor.com/view/forsencoomer-gif-19185596";
                break;
            case "8":
                link = "https://i.redd.it/wuno4exglp421.png";
                break;
            case "youtube":
                lost = true;
                let r = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelID + "&maxResults=1&order=date&type=video&key="+ YTAPI_KEY)
                .then(res => res.json());
                
               
               
                message.channel.send("https://www.youtube.com/watch?v="+r.items[0].id.videoId);
                
                break;
                default:
                return;

              // code block
          }
          if(lost == false){
                message.channel.send(link);
          }

    }



}