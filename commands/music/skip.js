const ytdl = require('ytdl-core'), discord = require('discord.js'), music = require("../../handlers/musicHandler.js")

module.exports = {
  name: "skip",
  aliases: [],
  description: "Skip the current song!",
  ussage: "autoplay",
  async execute(message, args, client) {
    let queue = await music.getQueue(message);

    if (queue.loop.enabled === true) {
      if (queue.loop.single === true || queue.queue.length < 2) {
        music.play(client, queue.textChannel);
        return;
      } else {
        queue.queue.push(queue.queue[0]);
        queue.queueauthor.push(queue.queueauthor[0]);
      }
    } else if (queue.autoplay === true && !queue.queue[1]) {  
      var info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${queue.queue[0].related_videos[0].id}`);
      queue.queue.push(info);
      queue.queueauthor.push(message.author);
    }
    queue.queue.shift();
    queue.queueauthor.shift();
    await music.updateQueue(message, queue); 

    music.play(client, message)
   
  }

}
