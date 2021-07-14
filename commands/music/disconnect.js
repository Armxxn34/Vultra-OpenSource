const music = require("../../handlers/musicHandler.js")
const discord = require('discord.js')
//#TODO: dj role checking

module.exports = {
  name: "disconnect",
  aliases: ["leave", "dc"],
  description: "Enable/dissable autoplay!",
  ussage: "autoplay",
  async execute(message, args, client) {
    let queue = await music.getQueue(message);
    queue.connection.disconnect()
    await music.deleteQueue(message);
    let voiceChannel = message.member.voice.channel;
      }
    }
  
