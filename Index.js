const {Client ,Collection} = require('discord.js');
const config = require("./config/config.json");
const db = require("quick.db");
const client = new Client({partials:["MESSAGE","REACTION"]});
const express = require("express");
const app = express();
const fs = require('fs');

const { keepalive } = require("./keepalive");
client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
  const activities = [
    `Vultra Support`,
    `-help For Help!`,
    `.gg/jEKVP8BXNJ`,
  ];
  let i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `LISTENING` }), 12000);
});
["commands","cooldowns","invites"].forEach( prop => client[prop] = new Collection());
client.wait = async (amount) => {
  await new Promise((reject,resolve) => setTimeout(resolve, amount));
}

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => { // We use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
      const module = require(`./events/${file}`),
            { emitter } = module;
        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            ((emitter instanceof String ? client[emitter] : emitter) || client)[module.once ? "once" : "on"](file.split('.')[0], (...args) => module.run(...args,client,config.prefix)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});

client.on("guildDelete", guild => {
  db.delete(`prefix_${guild.id}`);
});

app.get("/", (req, res) => {
  res.json({ working: true });
});

let listener = app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.log("There was an error: ", error.message);
  console.log("Started on port " + listener.address().port);
});

setInterval(() => {
  keepalive();
}, 600000);

 const getApp = (guildId) => {
  const app = client.api.applications(client.user.id)
  if (guildId) {
    app.guilds(guildId)
  }
  return app
}

const guildId = '835514827841077309'
client.on('ready', async () => {
    client.api.applications(client.user.id).guilds(guildId).commands.post({
        data: {
            name: "hello",
            description: "hello world command"
            // possible options here e.g. options: [{...}]
        }
    });

const commands = await getApp(guildId).commands.get()
  console.log(commands)

    client.ws.on('INTERACTION_CREATE', async interaction => {
      
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'hello'){ 
            // here you could do anything. in this sample
            // i reply with an api interaction
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "hello world!!!"
                    }
                }
            })
        }
    });
});

client.login(process.env.TOKEN);
