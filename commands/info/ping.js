const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'ping',
  description: 'ping',
    category:'info',
  execute(message, args) {
    const ping = message.client.ws.ping
    const embed = new Discord.MessageEmbed()
      .setTitle(" :ping_pong: Pong! :ping_pong: ")
      .setTimestamp()
      .setFooter('Cooldown enabled!')
      .setColor("RANDOM")
      .setDescription(`Ping = ${ping}ms `);
    message.channel.send(embed);
  },
};
