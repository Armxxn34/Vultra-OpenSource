/**** GET DEPENDENCIES ****/
const { MessageEmbed } = require("discord.js");
const ytsr = require('ytsr');

/**** CREATE EMBEDS ****/
const VoiceChatErrorEmbed = new MessageEmbed().setColor('#FF5757').setDescription(`You have to be in a Voice Chat to play music!`);
const VoiceChatSongAdded = new MessageEmbed().setColor('#85b0d2');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    description: 'Play a song in the vc', 
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(VoiceChatErrorEmbed);
        if (client.player.isPlaying(message)) {
            let song = await client.player.addToQueue(message, args.join(' '));
            
            VoiceChatSongAdded.setDescription(`Cool! Added **${song.name}** to the queue!`)

            if (song) return message.channel.send(VoiceChatSongAdded);
        } else {
            let song = await client.player.play(message, args.join(' '));

            VoiceChatSongAdded.setDescription(`Cool! Started playing **${song.name}**!`)

            if(song) return message.channel.send(VoiceChatSongAdded);
        }
    }
}
