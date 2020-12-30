const ytdl = require('ytdl-core');
const yts = require("yt-search");

module.exports = {
    name: 'play',
    description: 'Plays youtube videos',
	async execute(message, args) {

        let song;
if (ytdl.validateURL(args[1])) {
  const songInfo = await ytdl.getInfo(args[1]);
  song = {
    title: songInfo.title,
    url: songInfo.video_url
  };
} else {
  const {videos} = await yts(args.join(" "));
  if (!videos.length) return message.channel.send("No songs were found!");
  song = {
    title: videos[0].title,
    url: videos[0].url
  };
}
        //message.client.user.setAvatar('https://i.kym-cdn.com/entries/icons/original/000/028/963/41975e8a4757d3efcda6a1841e79c9ef4ef6efd8.jpg');
        if (message.member.voice.channel) {
        message.member.voice.channel.join().then(connection => {
            const stream = ytdl(song.url, { filter: 'audioonly' });
            
            const dispatcher = connection.play(stream);
            
            dispatcher.on('finish', () => voiceChannel.leave());
            
        })
    }
    
    }};