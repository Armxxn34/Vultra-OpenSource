const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'joinlogs',
  description: "sets bots moderation and command logs",
	usage: '<warn | join>',
	execute(message, args) {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) {
			return message.channel.send(
				'You need the `MANAGE_CHANNELS` permission to execute this command!'
			);
		}
		const channel = message.mentions.channels.first() || message.channel;
		const {id} = message.guild;
		switch(args[0]){
		  case undefined:
		    let errorEmbed1 = new Discord.MessageEmbed()
				.setDescription(`Wrong usage! -setlog command`)
				.setColor('RED');
				return message.channel.send(errorEmbed1);
			case "join":
			  if(db.set(`joinlogs_${id}`,channel.id)) message.channel.send(`Successfully set joinlogs to ${channel}`);
			  else message.reply("something went wrong");
			  break;
			case "welcome":
			  if(db.set(`welcome_${id}`,channel.id)) message.channel.send(`Successfully set welcoming channel to ${channel}`);
			  else message.reply("something went wrong");
			  break;
		  case "warn":
			  db.set(`warnlogs_${message.guild.id}`,channel.id);
			  let embed1 = new Discord.MessageEmbed()
				.setDescription(`I have set the log channel too ${channel}`)
				.setColor('GREEN');

			  return message.channel.send(embed1);
			default:
			  return message.reply("Unfortunately that sort of logs doesn\'t exist :/");
		}
	}
};
