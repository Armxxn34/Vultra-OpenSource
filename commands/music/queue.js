const { MessageEmbed } = require("discord.js"), music = require("../../handlers/musicHandler.js");

function timestamp(time) {
  var seconds = time % 60
  var minutes = Math.floor(time / 60)
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  return `${minutes}\:${seconds}`
}

module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "music",
  shortdescription: "Shows queue.",
  description: "Displays all songs currently in the queue.",
  usage: "[command | alias]",
  execute: async (message, args, client) => {
    let queue = await music.getQueue(message);


    if (!queue) {
      message.channel.send(`\`\`\`No songs in queue\`\`\``)
      return;
    }

    if (!queue.dispatcher) {
      message.channel.send(`\`\`\`No songs in queue\`\`\``)
      return;
    }

    let embedArray = new Array();

    if (queue.queue[1]) {
      for (var i = 0; i < Math.ceil((queue.queue.length - 1) / 10); i++) {
        var fieldtext = "";
        var embed = new MessageEmbed()
          .setTitle("Queue")
          .addField("Now Playing", `${queue.queue[0].videoDetails.title} \- ${timestamp(Math.round(queue.queue[0].videoDetails.lengthSeconds - (queue.dispatcher.streamTime / 1000 + queue.seek)))} left`)
          .setColor("RANDOM");
        for (var j = (i * 10) + 1; j < queue.queue.length; j++) {
          if (j < (i + 1) * 10 + 1) {
            fieldtext = fieldtext + `\*\*\[${j}\]\*\* ${queue.queue[j].videoDetails.title} \*\*\(${timestamp(queue.queue[j].videoDetails.lengthSeconds)}\)\*\*\n`
          }
        }
        embed.addField('Up next', fieldtext)
        embedArray.push(embed)
      }
    } else {
      var embed = new MessageEmbed()
        .setTitle("Queue")
        .addField("Now Playing", `${queue.queue[0].videoDetails.title} \- ${timestamp(Math.round(queue.queue[0].videoDetails.lengthSeconds - (queue.dispatcher.streamTime / 1000 + queue.seek)))} left`)
        .setColor("RANDOM")
      if (queue.loop.enabled === true) {
        embed.addField("Up next", `\*\*\Loop:\*\* ${queue.queue[0].videoDetails.title} \*\*\(${timestamp(queue.queue[0].videoDetails.lengthSeconds)}\)\*\*\n`);
      } else if (queue.autoplay === true) {
        embed.addField("Up next", `\*\*Autoplay\:\*\* [${queue.queue[0].related_videos[0].title}](https://www.youtube.com/watch?v=${queue.queue[0].related_videos[0].id}) \*\*\(${timestamp(queue.queue[0].related_videos[0].length_seconds)}\)\*\*`);
      } else {
        embed.addField("Up next", `No song left in queue`);
      }
      message.channel.send(embed)
      return;
    };
    if (queue.queue.length > 11) {
      // saves embed msg
      var cpage = 0;
      var reactmsg = await message.channel.send(embedArray[cpage]);

      //adds reactions to the embed
      reactmsg.react("⏪");
      reactmsg.react("◀️");
      reactmsg.react("⏹️");
      reactmsg.react("▶️");
      reactmsg.react("⏩");
      reactmsg.react("🔢");

      // creates reactions colector
      var filter = (reaction, user) => {
        return user.id === message.author.id
      };
      const reactcollector = reactmsg.createReactionCollector(filter, { idle: 60000, dispose: true });

      reactcollector.on('collect', (reaction, user) => {
        //First page
        if (reaction.emoji.name === "⏪") {
          cpage = 0;
          reactmsg.edit(embedArray[cpage])
        };

        //Last page
        if (reaction.emoji.name === "◀️") {
          if (cpage != 0) {
            cpage += -1;
            reactmsg.edit(embedArray[cpage])
          }
        };

        //Stop
        if (reaction.emoji.name === "⏹️") {
          reactcollector.stop();
        };

        //Next page
        if (reaction.emoji.name === "▶️") {
          if (cpage != embedArray.length - 1) {
            cpage += 1;
            reactmsg.edit(embedArray[cpage])
          }
        };

        //Last page
        if (reaction.emoji.name === "⏩") {
          cpage = embedArray.length - 1;
          reactmsg.edit(embedArray[cpage])
        };

        //Go to page
        if (reaction.emoji.name === "🔢") {
          //Request message
          reactmsg.channel.send(`Write the numer of the page you want jump to.`)
            .then(msg => {
              msg.delete({ timeout: 10000 })
            });

          //Await message
          message.channel.awaitMessages(m => m.author === message.author, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
              //check if value collected is valid
              if (parseInt(collected.first().content) > 0 && parseInt(collected.first().content) <= embedArray.length) {
                cpage = parseInt(collected.first().content) - 1;
                reactmsg.edit(embedArray[cpage]);
              } else {
                message.channel.send(`\`${collected.first().content}\` is not a valid page!`)
                  .then(msg => {
                    msg.delete({ timeout: 5000 })
                  });
              }
              collected.first().delete({ timeout: 250 });
            })
            .catch(collected => {
              message.channel.send('Timed out after no response in 15s.')
                .then(msg => {
                  msg.delete({ timeout: 5000 })
                });
            });
        }

        //Clear user reaction
        reaction.users.remove(user.id);
      });

      reactcollector.on('end', collected => {
        reactmsg.reactions.removeAll()
      });
    } else {
      message.channel.send(embedArray[0])
    };
  }
}