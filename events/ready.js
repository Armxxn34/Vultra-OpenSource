const config = require("../config/config.json");
module.exports.run = client => {
  client.commands.get("reload").execute({
    channel: {
      send: console.log
    },
    author: {
      id: config.developers[0]
    },
    client
  }, ["bal"]);
  client.guilds.cache.forEach(g => {
			if (g.me.permissions.has('MANAGE_GUILD')) {
				g.fetchInvites()
					.then(guildInvites => {
						client.invites.set(g.id, guildInvites);
					})
					.catch(console.log);
			}
  });
  const activities = [
    `Vultra Support`,  
    `-help For Help!`,
    `.gg/jEKVP8BXNJ`,
  ];
  let i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `LISTENING` }), 12000);
  console.log(`${client.user.tag} is online!`);
};
