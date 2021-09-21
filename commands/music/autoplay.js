const music = require("../../handlers/musicHandler.js")
const discord = require('discord.js')
//#TODO: dj role checking

module.exports = {
  name: "autoplay",
  aliases: ["ap","aplay"],
  description: "Enable/dissable autoplay!",
  ussage: "autoplay",
  async execute(message, args, client) {
    let queue = await music.getQueue(message);

    if (queue.autoplay) {
      queue.autoplay = false
      message.channel.send('autoplay off')
    } else {
      queue.autoplay = true
      message.channel.send('Autoplay enabled.')
    }
  }
}
