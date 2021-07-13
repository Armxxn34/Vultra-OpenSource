const Discord = require('discord.js');
module.exports = {
  name: 'rickroll',
  description: 'Rickroll anyone by just simplily running this command',
    category:'fun',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Rickrolled!")
      .setTimestamp()
      .setFooter('Cooldown enabled!')
      .setColor("RANDOM")
      .setImage("https://media.giphy.com/media/lgcUUCXgC8mEo/giphy.gif")
    message.channel.send(embed);
  },
};
