const music = require("../../handlers/musicHandler.js");
module.exports = {
  name:'pause',
  description: "Pause music currently playing",
  category:'music',
  execute(message, args, client){
    try{
    const serverQueue = music.getQueue(message);
    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);
    console.log(serverQueue);
if (serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
    } catch(error){
      console.error(error);
      message.channel.send("something went wrong while trying to pause the song, try again later");
    }
  }
};