/**** DELETE THIS IF U WANT ****/
process.on('unhandledRejection', console.error);

/**** CONFIG DEPENDENCIES ****/
const { default_prefix } = require("./config.json");
const { Player } = require("discord-music-player");
const { ready } = require("./handlers/ready.js")
const { config } = require("dotenv");

/**** MAKE A CLIENT ****/
const DisTube = require("distube");
const discord = require("discord.js");
const client = new discord.Client({
    disableEveryone: false
});

/**** SEARCH NPM ****/
const yts = require('yt-search');

/**** SET UP THE CLIENT CODE ****/
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

/**** ON MESSAGE EVENT ****/
client.on("message", async message => {
    /**** GET PREFIX ****/
    let prefix = db.get(`default_prefix${message.guild.id}`)
    if(prefix === null) prefix =default_prefix;

    /**** COMMAND EXEC CODE ****/
    if (message.author.bot || !message.guild || !message.content.startsWith(default_prefix)) return;
    if (!message.member) message.member = message.guild.fetchMember(message);

    const args = message.content.slice(default_prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); // "if (cmd.length === 0) return;" for some reason this was in the code.

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        try {
            command.run(client, message, args);
        } catch (e) {
            console.log(e);
        }
    }
});

/**** ON READY EVENT ****/
client.on("ready", () => {
    //empty for now. if you want to add anything go to ./handlers/ready.js - ItsOkayBae
});

/**** SAVE PLAYER CLIENT AS VARIABLE ****/
const player = new Player(client, {
    leaveOnEmpty: false,
});
client.player = player;

/**** MAKE A PLAYER CLIENT ****/
new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    timeout: 10,
    volume: 150,
    quality: 'high',
});


client.login(/**** JUST PUT YOUR TOKEN HERE, OR MAKE A .ENV FILE LIKE YOU HAD BEFORE. ****/);
