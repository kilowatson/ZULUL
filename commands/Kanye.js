const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kanye',
    aliases: ['kanyewest', 'ye', 'yeezy', 'yeez' , 'yeezus'],
	description: 'Prints Kanye quote',
	async execute(message, args) {
       

        axios.get("https://api.kanye.rest")
        .then(data=>{
            const quote = new MessageEmbed()
            .setDescription('"' + data.data.quote +'" - Kanye West');
            message.channel.send(quote);
        })
       
        .catch(error=>{
            console.log(error);
        });


    }
};