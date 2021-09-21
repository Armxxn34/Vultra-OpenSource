module.exports ={
  name: "lock",
  execute(message, args){
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You require the `Manage MANAGE_CHANNELS` permission to execute this command!");
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
   const Discord = require('discord.js')
   const embed = new Discord.MessageEmbed()
   .setTitle('Locked Down')
   .setDescription('I have successfully locked down chat!')
   .setColor('RANDOM')
   message.channel.send(embed)
  }
}