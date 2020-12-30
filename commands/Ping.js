
module.exports = {
    name: 'ping',
    description: 'Roundtrip latency ping check',
    aliases: ['p'],
    async execute(message, args) {
message.channel.send('Pinging...').then(sent => {
    sent.edit(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
});
    }}