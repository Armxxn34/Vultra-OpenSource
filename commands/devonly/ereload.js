const config = require("../../config/config.json");
module.exports = {
	name: 'ereload',
	description: 'Reloads a command',
	category:'devonly',
	async execute(message, args, client) {
	  if(!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
  let events = await require('fs').promises.readdir("./events");
if (!events.includes(`${args[0]}.js`)) return message.channel.send(`There is no event with name \`${args[0]}\`, ${message.author}!`);
let event = args[0];
const path = `../../events/${event}.js`;
delete require.cache[require.resolve(path)];
try {
  client.removeAllListeners(event);
  client.addListener(event, (...args) => require(path).run(...args, client, config.prefix));
	message.channel.send(`\`${event}\` event got successfully reloaded`);
} catch (error) {
	console.error(error);
	message.channel.send(`There was an error while reloading a command \`${event}\`:\n\`\`\`js\n${error.stack}\`\`\``);
}
	},
};
