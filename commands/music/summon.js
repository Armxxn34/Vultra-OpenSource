const music = require("../../handlers/musicHandler.js")
const Discord = require('discord.js')
//#TODO: dj role checking

module.exports = {
  name: "summon",
  aliases: [],
  description: "Summon the bot!",
  ussage: "summon",
  async execute(message, args, client) {
    let queue = await music.getQueue(message);

    let voiceChannel = message.member.voice.channel;
    if (!queue.connection) {
      if (!voiceChannel) {
        return message.channel.send('You must be in a voice channel to play music.')
      };

      if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT") || !voiceChannel.permissionsFor(message.client.user).has("SPEAK")) {
        return message.channel.send("I need the permissions to join and speak in your voice channel!");
      };

      queue.voiceChannel = voiceChannel;
      queue.textChannel = message.channel;

      queue.connection = await voiceChannel.join();
const embed = new Discord.MessageEmbed()
.setTitle('Joined VoiceChannel')
.setDescription(`Joined \_\_${message.author}\_\_ in \_\_${voiceChannel.name}\_\_.`)
.setColor('RANDOM')
.setTimestamp()
      message.channel.send(embed)
    } else if (voiceChannel != queue.voiceChannel) {
      return message.channel.send("Someone's already playing music in the server already.")
    } else if (queue.dispatcher.paused) {
      queue.dispatcher.resume();
    }
    await music.updateQueue(message, queue);
  }
}