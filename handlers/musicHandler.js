const { Discord } = require("discord.js");
const queue = new Map();
const ytdl = require('ytdl-core');
const serverQueueEmbed = new Discord.MessageEmbed().setTitle('Leaving Voice Channel').setDescription(`Hey there, looks like you have no more songs left in queue, I'll leave the Voice Channel to save resources`).setColor('RANDOM');
const serverPlayingEmbed = new Discord.MessageEmbed().setTitle('<a:music:838002356435812403> Now Playing <a:music:838002356435812403>').setColor('RANDOM');

async function play(client, message, seek) {
    const serverQueue = await getQueue(message);

    if (!serverQueue.queue[0]) {
        serverQueue.connection.disconnect();
        queue.delete(message.guild.id);
        return serverQueue.textChannel.send(serverQueueEmbed);
    };

    if (typeof seek != Number || seek > serverQueue.queue[0].videoDetails.lengthSeconds) {
        seek=0;
    };

    serverQueue.seek = seek

    const row = new Discord.MessageActionRow();
    row.addComponents(
        new Discord.MessageButton().setCustomId('playpause').setLabel('Play/Pause').setStyle('primary').setEmoji(':play_pause:'),
        new Discord.MessageButton().setCustomId('skip').setLabel('Skip').setStyle('primary').setEmoji(':skip:')
    );

    serverPlayingEmbed.setDescription(`Now Playing: ${serverQueue.queue[0].videoDetails.title}`);
    serverQueue.textChannel.send(serverPlayingEmbed);

    serverQueue.dispatcher = serverQueue.connection.play(ytdl.downloadFromInfo(serverQueue.queue[0], {filter: 'audioonly', highWaterMark: 1<<15}), {seek: serverQueue.seek}).on("finish", () => {
        if (serverQueue.loop.enabled === true) {
            if (serverQueue.loop.single === true || serverQueue.queue.length < 2) {
                return play(client, serverQueue.textChannel);
            } else {
                serverQueue.queue.push(serverQueue.queue[0]);
                serverQueue.queueauthor.push(serverQueue.queueauthor[0]);
                serverQueue.queue.shift();
                serverQueue.queueauthor.shift();
                return play(client, serverQueue.textChannel);
            }
        }

        if (serverQueue.autoplay === true && !serverQueue.queue[1]) {
            async () => {
                const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${serverQueue.queue[0].related_videos[0].id}`);
                serverQueue.queue.push(info);
                serverQueue.queueauthor.push(serverQueue.queueauthor[0]);
                serverQueue.queue.shift();
                serverQueue.queueauthor.shift();
                play(client, serverQueue.textChannel);
            }
            return;
        }

        serverQueue.queue.shift();
        serverQueue.queueauthor.shift();
        play(client, serverQueue.textChannel);
    }).on("error", error => {
        console.error("Error: " + error);
    });
}


async function getQueue(message) {
    let queueConstruct = {
        playing: false,
        textChannel: null,
        voiceChannel: null,
        connection: null,
        queue: [],
        queueauthor: [],
        dispatcher: null,
        seek: 0,
        loop: {
            enabled: false,
            single: false
        },
        autoplay: false
    },
        serverQueue = queue.get(message.guild.id); //hold yo horses I realized I messed up the code in np//
    if (!serverQueue) {
        queue.set(message.guild.id, queueConstruct);
        serverQueue = queueConstruct;
    }

    return serverQueue;
}

async function updateQueue(message, newState) {
    queue.set(message.guild.id, newState)
}

async function deleteQueue(message) {
    queue.delete(message.guild.id)
}

module.exports = {
    play,
    getQueue,
    updateQueue,
    deleteQueue
}
