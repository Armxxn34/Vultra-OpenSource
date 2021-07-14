const Discord = require('discord.js'), fs = require("fs"), path = require("path"), config = require("../config/config.json"), duration = require('../duration.js'), db = require ("quick.db")


async function run(message, client, prefix) {
  if (message.channel.type === "dm") return;
  prefix = db.fetch(`prefix_${message.guild.id}`) || prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.find(x => x.aliases && x.aliases.includes(command));
  if (!cmd) return;
  if (cmd.category === "devonly" && !config.developers.includes(message.author.id)) return;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {// make it give higher cooldown if args return true
  
 /* if (cmd.name ==="daily") {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount * 2400;
  }
  */
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;


    if (now < expirationTime) {
      return message.reply(`please wait ${duration(expirationTime, now)} before reusing the \`${cmd.name}\` command.`).then(msg => msg.delete({ timeout: 5000 }));
    }
  }
  try {
    await cmd.execute(message, args, client, prefix);
  } catch(e) { 
    const clap = client.channels.cache.get('835514828893323318')
    const embeddddd = new Discord.MessageEmbed()
    .setTitle('Error')
    .setDescription(`Error occured: ${e} in ${message.guild.name}
    Stack trace:
    \`\`\`js
    ${e.stack}\`\`\``)
    .setColor('RED');
    clap.send(embeddddd);
   
    console.log(`${cmd.name} - ${Date.now()}`);
    console.error(e);
  }
  timestamps.set(message.author.id, now);
}

module.exports = {
  run
};
