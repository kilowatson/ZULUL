const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require("axios");


const { prefix, token } = require('./config.json');
const fetch = require('node-fetch');
const { Client, MessageAttachment } = require('discord.js');
fs = require('fs');
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



//Loads commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

//Bot booting up message
bot.on('ready', () => {
    
    console.log('This bot is online!');
   
    
});


 

 //Runs commands
 bot.on('message', async message=> {

    //Ignores messages sent by bot and messages that don't start with the prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);//Gets the argument/s from the message 
    const commandName = args.shift().toLowerCase();//Separates the arguments form the command


    
   
    //Temporary if, this ends the bot
    if(commandName == "exit"){
        bot.destroy();
        return;
    }
   
    console.log(message.guild.members.cache.get(message.author.id).user.username);
   
    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;
    //Checks if command is valid

    //Command stuff
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        // ...
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
    }
    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //Command stuff
    
    //Attempts to run the exectue function of the command
try {
    command.execute(message, args);
  
        
    
        
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}


 });

 //Logs the bot in
 bot.login(token); 












/*

    if(command == "kanji"){
        
        console.log("Lets begin");
        let r = 0;
        while(r < 16){
        
        d.setKanji(randomIntInc(0, 50));
        //await d.search();
        console.log("Done serach");
        let ans = d.getAnswer()
        console.log(ans);
        const filter = response => {
            return ans.some(answer => answer.toLowerCase() === response.content.toLowerCase())
            
        };
        

        //const embed = new Discord.RichEmbed().setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png");
        
        
        message.channel.send({file: d.getImage()});
       // message.channel.send(attachment);

             await message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    console.log(collected);
                    
                        message.channel.send(`${collected.first().author} got the correct answer!`);
                    
                   
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. The answer was ' + ans);
                });
        

        
        console.log(d.getImage());
        
        
    
        console.log(r);
              r = r + 1;  
    }

    }
    else if(command == "exit"){
        bot.destroy();
    }


 });
*/
 


 




/*
var k = require("./src/Kanji.js");

var d = new k();
d.update();
d.setKanji(20);
d.search();

console.log(d.getAnswer());
*/

/*
var k = require("./src/Kanji.js");
var d = new k();

async function l(){
    d.update();
    d.setKanji(20);
    await d.search().then();
    console.log(d.getAnswer());
}


l();

*/
/*
const unirest = require("unirest");

async function x(){
    var req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/kanji/%E7%9F%B3");
    var l;
req.headers({
	"x-rapidapi-key": "d1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13",
	"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
	"useQueryString": true
});


    await req.end(function (res) {
	if (res.error) throw new Error(res.error);
    return res.body;
});
   


}
async function f() {
    const response = await x(); 
    console.log(response);
    
  }
 
 f();
 



*/











/*


const unirest = require("unirest");

async function x(){
    var req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/kanji/%E7%9F%B3");

req.headers({
	"x-rapidapi-key": "d1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13",
	"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
	"useQueryString": true
});
await req.end(function (res) {
    if (res.error) throw new Error(res.error);
   
    return res.body;
        
});


 let c = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/" + encodeURIComponent(this.kanji);

        let r = await unirest.get(c)
            .header("x-rapidapi-key", "d1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13")
            .header("x-rapidapi-host", "kanjialive-api.p.rapidapi.com")
            .header("useQueryString", "true").getBody();
            return r;

}


async function f() {
    const response = await x();
    
    let value = await Promise.all(response).then((values) => {
        console.log(values);
    });
    console.log("what is the point");
   
    return value;
  }
 
  console.log(f());
  var i;
  while(i < 50000){
      i++;
  }
  console.log("3");

*/

/*
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
    coverImage{
        large
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
    id: 1125
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    
    bot.on("message",(message)=>{
        
        var jsonData = JSON.parse(JSON.stringify(data));
        message.channel.send(jsonData.data.Media.coverImage.large);
        console.log("nada");
    
    } );
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
*/
//ascyc function




//////////Sets kanji into array//////////////////////////

/*
var req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/kanji/%E7%9F%B3");

req.headers({
	"x-rapidapi-key": "d1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13",
	"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
	"useQueryString": true
});
req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/kanji/%E8%A8%AA");
req.headers({
	"x-rapidapi-key": "d1484cf710msh7efaf67e72331adp1fcad6jsn65f651bfba13",
	"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
	"useQueryString": true
});
req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
*/
/*
req.query({
	"kanji" : p
});
*/







/*Cultivation

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    let x = JSON.parse(JSON.stringify(res.body));
    var i = 1;
    
    for (r in x) {
       
        fs.appendFileSync('grade-6.txt', x[r].kanji.character + "\n");
          i = i + 1;
      }
	//console.log(x.kanji.stroke);
});


*/









/*

  fetch("https://kanjialive-api.p.rapidapi.com/api/public/kanji/訪").then(handleResponse)
  .then(handleData)
  .catch(handleError);

function handleResponse(response) {
return response.json().then(function (json) {
return response.ok ? json : Promise.reject(json);
});
}

function handleData(data) {

bot.on("message",(message)=>{

var jsonData = JSON.stringify(data);
message.channel.send(jsonData);
console.log("nada");

} );
}

function handleError(error) {
alert('Error, check console');
console.error(error);
}
*/