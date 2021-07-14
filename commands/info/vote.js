const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'vote',
  description: 'votes for bot',
    category:'info',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Vote")
      .setTimestamp()
      .setFooter('Thanks for Voting!')
      .setColor("RANDOM")
      .setDescription(`DiscordBotList.com = [Thanks for Voting!](https://discordbotlist.com/bots/vultra)
      
      Top.gg = [Thanks for Voting!](https://top.gg/bot/811245442683371600)`);
    message.channel.send(embed);
  },
};
