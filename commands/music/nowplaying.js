const { MessageEmbed } = require("discord.js");
const music = require("../../handlers/musicHandler.js");
const disbut = require("discord-buttons");
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
let playpause = new disbut.MessageButton()
.setStyle('blurple')
.setLabel('Play/Pause') 
.setEmoji('⏯')
.setID('playpause') 


let skip = new disbut.MessageButton()
.setStyle('grey')
.setLabel('Skip') 
.setEmoji('⏭️')
.setID('skip') 

let musicaction = new disbut.MessageActionRow()
.addComponents(playpause, skip);



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
            let bed = new MessageEmbed()
            .setTitle('Unavailable')
            .setDescription('No songs are playing right now')
            .setColor('RANDOM')
            message.channel.send(bed)
            return;
        }
        let embed = new MessageEmbed()
        .setTitle("<a:music:838002356435812403> Now Playing <a:music:838002356435812403>")
        .setDescription(`\*\*[${queue.queue[0].videoDetails.title}](${queue.queue[0].videoDetails.video_url})\*\*\n\`${bar(queue)} ${timestamp(Math.round(queue.dispatcher.streamTime / 1000 + queue.seek))}/${timestamp(queue.queue[0].videoDetails.lengthSeconds)}\` 🔉 ${Math.round(queue.dispatcher.volume * 100)}\%`)
        .setThumbnail(queue.queueauthor[0].avatarURL() || queue.queueauthor[0].defaultAvatarURL)
        .addField(`Song description\:`, `${queue.queue[0].videoDetails.description.split('').slice(0, 511).join('').split(`\n`).slice(0, queue.queue[0].videoDetails.description.split('').slice(0, 511).join('').split(`\n`).length - 2).join(`\n`)}` || "Song got no description or it can't be displayed")
        .addField(`Likes\/Dislikes`, `${queue.queue[0].videoDetails.likes || 0} \👍\n${queue.queue[0].videoDetails.dislikes || 0}\👎`, true)
        .addField(`Duration:`, `${timestamp(queue.queue[0].videoDetails.lengthSeconds)}`, true)
        .addField(`Requested by:`, `${queue.queueauthor[0].tag}`, true)

        .setColor("RANDOM")
        message.channel.send(embed, musicaction)

        client.on('clickButton', async (button) => {
            if(button.id === "skip") {
                await button.reply.defer()
                
                if (queue.loop.enabled == true && queue.loop.single == true) {
                    queue.loop = { enabled: false, single: false };
                    return button.message.channel.send("Loop mode was set to `OFF`!");
                } else 
                if (queue.loop.enabled == false && queue.loop.single == false) {
                    queue.loop = { enabled: true, single: true };
                    return button.message.channel.send("Loop mode was set to `SINGLE`!");
                } else 
                if (queue.loop.enabled == false && queue.loop.single == true) {
                    queue.loop = { enabled: true, single: false };
                    return button.message.channel.send("Loop mode was set to `QUEUE`!");
                } else {
                    return button.message.channel.send("Could not find the mode you are looking for!");
                }
            }
            if(button.id === "playpause"){
                await button.reply.defer()
                //await button.message.channel.send("Music paused! Click the button or run the `nowplaying` command again to unpause!")

                if (!queue.queue[0]) {
                    if (queue.playing) {
                        queue.playing = false;
                        queue.connection.dispatcher.pause(true);
                        return button.message.channel.send(`**${queue.queue[0].videoDetails.title}** has been paused!`);
                    } else {
                        queue.playing = true;
                        queue.connection.dispatcher.pause(false);
                        return button.message.channel.send(`**${queue.queue[0].videoDetails.title}** has been unpaused!`);
                    }
                } else {
                    return button.message.channel.send(`Could not interact, there's been an issue.`);
                }
            }
        });

    }
}
