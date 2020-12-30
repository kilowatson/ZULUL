//https://tenor.com/view/forsencoomer-gif-19185596
//https://imgur.com/4fglvfb       bj
//
const Discord = require('discord.js');
const fetch = require('node-fetch');
const {YTAPI_KEY} = require('./config.json');

module.exports = {
    name: 'forsen',
	description: 'FORSAAAAAAAAAN',
	async execute(message, args) {
        let link;
        let lost = false;
       
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
            case "unlucky":
                link = "https://i.redd.it/26x5q4kgfeb51.png";
                break;
            case "gta":
                link = "https://i.redd.it/65hd92dnez941.jpg";
                break;
            case "mald":
                link = "https://i.redd.it/98z233mpvc251.png";
                break;
            case "shungite":
                link = "Anyways, um... I bought a whole bunch of shungite rocks, do you know what shungite is? Anybody know what shungite is? No, not Suge Knight, I think he's locked up in prison. I'm talkin' shungite. Anyways, it's a two billion year-old like, rock stone that protects against frequencies and unwanted frequencies that may be traveling in the air. That's my story, I bought a whole bunch of stuff. Put 'em around the la casa. Little pyramids, stuff like that.\nhttps://i.kym-cdn.com/photos/images/original/001/853/632/25f.png \n ";
                break;
            case "8":
                link = "https://i.redd.it/wuno4exglp421.png";
                break;
            case "clownsen":
                link = "https://i.redd.it/fcxuexcf6ny51.jpg";
                break;
            case "cock":
                link = "📜 ✍️ Sadge 𝓜𝔂 𝓭𝓮𝓪𝓻𝓮𝓼𝓽 𝓫𝓻𝓸𝓽𝓱𝓮𝓻, 𝓘 𝔀𝓻𝓲𝓽𝓮 𝔂𝓸𝓾 𝓲𝓷 𝓭𝓮𝓮𝓹 𝓶𝓮𝓵𝓪𝓷𝓬𝓱𝓸𝓵𝔂. 𝓘𝓽 𝓪𝓹𝓹𝓮𝓪𝓻𝓼 𝓽𝓸 𝓶𝓮 𝓽𝓱𝓪𝓽 𝓽𝓱𝓮𝓻𝓮 𝓲𝓼𝓷'𝓽 𝓪𝓷𝔂 𝓬𝓸𝓬𝓴 𝓵𝓮𝓯𝓽"



                +"\n\n\n\n📜 ✍ ️ Okayge 𝓑𝓻𝓸𝓽𝓱𝓮𝓻 𝓘 𝓻𝓮𝓬𝓮𝓲𝓿𝓮𝓭 𝔂𝓸𝓾𝓻 𝓶𝓮𝓼𝓼𝓪𝓰𝓮 𝔀𝓮𝓵𝓵. 𝓘𝓽 𝓮𝔁𝓬𝓲𝓽𝓮𝓼 𝓶𝓮 𝓽𝓸 𝓲𝓷𝓯𝓸𝓻𝓶 𝔂𝓸𝓾 𝓪𝓫𝓸𝓾𝓽 𝓪 𝓬𝓸𝓬𝓴 𝓻𝓮𝓼𝓮𝓻𝓿𝓮, 𝓯𝓻𝓮𝓽 𝓷𝓸𝓽, 𝓬𝓸𝓬𝓴 𝔀𝓲𝓵𝓵 𝓫𝓮 𝓼𝓮𝓷𝓽 𝔂𝓸𝓾𝓻 𝔀𝓪𝔂 𝓼𝓸𝓸𝓷.";
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