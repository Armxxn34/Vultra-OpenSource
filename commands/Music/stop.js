/**** GET DEPENDENCIES ****/
const { MessageEmbed } = require("discord.js");

/**** CREATE EMBEDS ****/
const VoiceChatErrorPlayingMusic = new MessageEmbed.setColor('#0000ff').setDescription(`There was an error while trying to play music!`);
const VoiceChatChannelLeft = new MessageEmbed().setColor('#FF5757').setDescription(`Alright! Cleared the queue and left the voice chat for you!`);
const VoiceChatErrorEmbed = new MessageEmbed().setColor('#FF5757').setDescription(`You have to be in a Voice Chat to play music!`);

module.exports = {
    name: 'stop',
    category: 'Music',
    description: 'Will clear the queue and leave the voice chat for you.', 
    aliases: ['st'],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(VoiceChatErrorEmbed);
        message.member.voice.channel.leave();
        
        try {
            client.player.stop(message);
            message.channel.send(VoiceChatChannelLeft);
        } catch (e) {
            message.channel.send(VoiceChatErrorPlayingMusic);
        }
    }
}
