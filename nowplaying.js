const { MessageEmbed } = require("discord.js"), music = require("../../handlers/musicHandler.js");

function timestamp(time) {
  var seconds = time % 60
  var minutes = Math.floor(time / 60)
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  return `${minutes}\:${seconds}`
}

function bar(queue) {
  var bar = "───────────────────".split("")
  var ballspot = Math.round((queue.dispatcher.streamTime / 1000 + queue.seek) / queue.queue[0].videoDetails.lengthSeconds * 20)
  bar.splice(ballspot, 0, "⚪");
  return bar.join("")
}

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  category: "music",
  shortdescription: "Gives info on song playing now.",
  description: "Shows the song currently playing and info about it.",
  usage: "[command | alias]",
  execute: async (message, args, client) => {
    let queue = await music.getQueue(message);

    if (!queue.queue[0]) {
      message.channel.send(`\`\`\`No song playing now.\`\`\``)
      return;
    }
    let embed = new MessageEmbed()
      .setTitle("Now Playing")
      .setDescription(`\*\*[${queue.queue[0].videoDetails.title}](${queue.queue[0].videoDetails.video_url})\*\*\n\`${bar(queue)}  ${timestamp(Math.round(queue.dispatcher.streamTime / 1000 + queue.seek))}/${timestamp(queue.queue[0].videoDetails.lengthSeconds)}\` 🔉 ${Math.round(queue.dispatcher.volume * 100)}\%`)
      //.setThumbnail(queue.queueauthor[0].avatarURL() || queue.queueauthor[0].defaultAvatarURL)
      .addField(`Song description\:`, `${queue.queue[0].videoDetails.description.split('').slice(0, 511).join('').split(`\n`).slice(0, queue.queue[0].videoDetails.description.split('').slice(0, 511).join('').split(`\n`).length - 2).join(`\n`)}` || "Song got no description or it can't be displayed")
      .addField(`Likes\/Dislikes`, `${queue.queue[0].videoDetails.likes || 0} \👍\n${queue.queue[0].videoDetails.dislikes || 0}\👎`, true)
      .addField(`Duration:`, `${timestamp(queue.queue[0].videoDetails.lengthSeconds)}`, true)
      .addField(`Requested by:`, `${queue.queueauthor[0].tag}`, true)
      .setColor("RANDOM")
    message.channel.send(embed)
  }
}