const { MessageEmbed} = require("discord.js"), queue = new Map(), ytdl = require('ytdl-core');
const Discord = require('discord.js')
const disbut = require("discord-buttons");

async function play(client, message, seek) {
    const serverQueue = await getQueue(message);

    if (!serverQueue.queue[0]) { 
        var embeeeeed = new Discord.MessageEmbed().setTitle('Leaving Voice Channel').setDescription(`Hey there, looks like you have no more songs left in queue, I'll leave the Voice Channel to save resources :thumbsup:`).setColor('RANDOM') 
        serverQueue.textChannel.send(embeeeeed);
        serverQueue.connection.disconnect();
        return queue.delete(message.guild.id);
    };

    if (typeof seek != Number || seek > serverQueue.queue[0].videoDetails.lengthSeconds) {
        seek=0;
    };

    serverQueue.seek = seek;

    const { thumbnails } = serverQueue.queue[0].videoDetails;

    let left = new disbut.MessageButton().setID('loop').setLabel('🔁').setStyle('grey');
    let middle = new disbut.MessageButton().setID('playandpause').setLabel('⏯️').setStyle('blurple');
    let right = new disbut.MessageButton().setID('skip').setLabel('⏩').setStyle('grey');
    let musicaction = new disbut.MessageActionRow().addComponents(left, middle, right);

    var embeddddddd = new Discord.MessageEmbed().setTitle('<a:music:838002356435812403> Now Playing <a:music:838002356435812403>').setDescription(`Now Playing: ${serverQueue.queue[0].videoDetails.title}`).setColor('RANDOM').setFooter('Music is still a work in progress, please be patient!').setTimestamp();

    serverQueue.textChannel.send(embeddddddd, musicaction);
    client.on('clickButton', async (button) => {
        if(button.id === "loop") {
            await button.reply.defer()

            if (serverQueue.loop.enabled == true && serverQueue.loop.single == true) {
                serverQueue.loop = { enabled: false, single: false };
                return button.message.channel.send("✅ | Loop mode was set to `OFF`!");
            } else if (serverQueue.loop.enabled == false && serverQueue.loop.single == false) {
                serverQueue.loop = { enabled: true, single: true };
                return button.message.channel.send("✅ | Loop mode was set to `SINGLE`!");
            } else if (serverQueue.loop.enabled == false && serverQueue.loop.single == true) {
                serverQueue.loop = { enabled: true, single: false };
                return button.message.channel.send("✅ | Loop mode was set to `QUEUE`!");
            } else {
                return button.message.channel.send("Could not find the mode you are looking for!");
            }
        }

        if(button.id === "playandpause"){
            await button.reply.defer()

            if (!serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause(true);
                return button.message.channel.send(`✅ | paused the current track.`);
            } else {
                serverQueue.dispatcher.resume();
                //don't remove.
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.pause(false);
                return button.message.channel.send(`✅ | unpaused the current track.`);
            }
        }

        if(button.id === "skip") {
            serverQueue.queue.shift();
            serverQueue.queueauthor.shift();

            await updateQueue(message, serverQueue); 

            play(client, message)

            return button.messsage.channel.send("✅ | Skipped the curent track.");
        }
    });

    console.log(serverQueue.queue[0].videoDetails);
    serverQueue.dispatcher = serverQueue.connection.play(ytdl.downloadFromInfo(serverQueue.queue[0], {filter: 'audioonly', highWaterMark: 1<<15}), {seek: serverQueue.seek}).on("finish", () => {
        if (serverQueue.loop.enabled === true) {
            if (serverQueue.loop.single === true || serverQueue.queue.length < 2) {
                play(client, serverQueue.textChannel);
                return;
            } else {
                serverQueue.queue.push(serverQueue.queue[0]);
                serverQueue.queueauthor.push(serverQueue.queueauthor[0]);
                serverQueue.queue.shift();
                serverQueue.queueauthor.shift();
                play(client, serverQueue.textChannel);
                return;
            }
        }

        if (serverQueue.autoplay === true && !serverQueue.queue[1]) {
            async () => {
                var info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${serverQueue.queue[0].related_videos[0].id}`);
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
        console.error(error);
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
        serverQueue = queue.get(message.guild.id);

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
