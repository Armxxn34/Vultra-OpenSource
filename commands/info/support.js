const Discord = require('discord.js')
module.exports = {
  name: 'support',
  description: 'Invite link',
    category:'info',
 async execute(message, args) {
    const channel = message.client.channels.cache.get('848184701780754462');
    	invite = await channel.createInvite({
			maxAge: 86400,
			maxUses: 100
		})
    const embed = new Discord.MessageEmbed()
      .setTitle("Support!")
      .setFooter('Thank you for using Vultra!','')
      .setImage('')
      .setTimestamp()
      .setColor("RANDOM")
      .setDescription(`Found a bug? Report it [here!!](${invite})`);
    message.channel.send(embed);
  },
