const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Invite link',
  category: 'info',
  execute(message, args) {
    const botAdd = `[Thank you for adding me!](https://discord.com/api/oauth2/authorize?client_id=835894096501014588&permissions=0&scope=applications.commands%20bot
)`
    const row = new MessageActionRow()
	.addComponents(
	new MessageButton()
	.setCustomId('primary')
        .setUrl('https://discord.com/api/oauth2/authorize?client_id=835894096501014588&permissions=0&scope=applications.commands%20bot')
	.setLabel('Invite Me :)')
	.setStyle('url'),
			);
    const embed = new Discord.MessageEmbed()
  
      .setTitle("Invite")
      .setFooter('Thank you for using Vultra!', '')
      .setTimestamp()
      .setColor("RANDOM")
      .setDescription(botAdd);
    message.channel.send(embed, row);
  },
};
