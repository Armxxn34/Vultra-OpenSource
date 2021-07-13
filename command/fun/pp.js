
 const { MessageEmbed } = require('discord.js');
 const prefix = process.env.prefix
module.exports = {
  name: 'pp',
  description: 'tells you your PP size',
      category:'fun',
  execute(message, args) {
    const user = message.mentions.users.first()||message.author;
    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s PP`)
      .setTimestamp()
      .setFooter('Thank You for using Vultra!')
      .setColor("RANDOM")
      .setDescription(`8${'='.repeat(Math.floor(Math.random() * 20))}D
`);
   void message.channel.send(embed);
  }}
