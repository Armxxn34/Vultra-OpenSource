const ytdl = require('ytdl-core'), discord = require('discord.js'), music = require("../../handlers/musicHandler.js"), { YoutubeDataAPI } = require("youtube-v3-api"), youtube = new YoutubeDataAPI(process.env.YTTOKEN);
const Discord = require('discord.js')

//#TODO: dj role checking

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Play a song!",
    ussage: "Play",
    async execute(message, args, client) {
      if (!args[0]) return message.reply("wat");
        let queue = await music.getQueue(message);
        var color = 'RANDOM'
        let voiceChannel = message.member.voice.channel;
        if (!queue.dispatcher) {
            if (!voiceChannel) {
                var voiceEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('You must be in a voice channel to play music.')
                .setColor('RANDOM')

                 message.channel.send(voiceEmbed)
            } else if(!voiceChannel.permissionsFor(message.client.user).has("CONNECT") || !voiceChannel.permissionsFor(message.client.user).has("SPEAK")) {
                var permsEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('I need the permissions to join and speak in your voice channel!')
                .setColor(color)
                return message.channel.send(permsEmbed);
            };

            queue.voiceChannel = voiceChannel;
            queue.textChannel = message.channel;

            queue.connection = await voiceChannel.join();
          voiceChannel.join()
  .then(connection => {
      connection.voice.setSelfDeaf(true);
  });

            var joinedEmbed = new Discord.MessageEmbed()
            .setTitle('Joined VoiceChannel!')
            .setDescription(`I have joined \_\_${message.author}\_\_ in \_\_${voiceChannel.name}\_\_.`)
            .setTimestamp()
            .setColor(color)
            message.channel.send(joinedEmbed)
            await music.updateQueue(message, queue);

            var alreadyListening = new Discord.MessageEmbed()
            .setTitle('Error')
            .setDescription('Someone is already listening to music in your server!')
            .setColor(color)
            } else if (voiceChannel != queue.voiceChannel) {
                return message.channel.send(alreadyListening)
            } else if (queue.dispatcher.paused) {
                queue.dispatcher.resume();
            }
        if(ytdl.validateURL(args[0])) {
            let song = await ytdl.getInfo(args[0]);
            queue.queue.push(song)
            queue.queueauthor.push(message.author)
            await music.updateQueue(message, queue);
            if (queue.queue.length === 1) {
                music.play(client, message)
            }
        } else {
            let results = await youtube.searchAll(args.join(" "), 5, {type: 'video'}) //Get all results from the search. (didn't want to rewrite anything here)
            let song = await ytdl.getInfo(results.items[1].id.videoId);
            queue = await music.getQueue(message);
            queue.queue.push(song);
            queue.queueauthor.push(message.author);
            await music.updateQueue(message, queue);
            if (queue.queue.length === 1) {
                music.play(client, message) //play the music.
            } else {
              var addQueue = new Discord.MessageEmbed()  //another embed (don't remove)
              .setTitle("Queue Added")
              .setDescription(`${results.items[1].snippet.title} was added to the queue!`)
              .setColor(color)
              .setFooter("Added By: **" + message.author.tag + "**")
              message.channel.send(addQueue);
            }
        }
    }
} 