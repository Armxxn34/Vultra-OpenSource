const Discord = require('discord.js')
module.exports = {
  name: 'purge',
  description: 'purge command',
  aliases: ["clear"],
  execute(message, args) {
    const deletecount = `${args[0]}`;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You require the `Manage Messages` permission to execute this command!");
    if (!deletecount) return message.reply('You have to give me a number of messages to delete!');
    message.delete();
    if (deletecount < 2 || deletecount > 100) {
    return message.reply('you can only put a number between 2 and 100'); 
    
}
const embed = new Discord.MessageEmbed()
.setTitle('Purge successful!')
.setDescription(`I have managed to delete ${args[0]} messages!`)
.setColor('RANDOM')
.setFooter(`Purged by ${message.author.tag}`)
.setTimestamp()
message.channel.send(embed)
  .then(msg => msg.delete({ timeout: 5000 }))

    message.delete();


    if (isNaN(deletecount)) return message.reply('No number given!');
    message.delete();
    try {
       message.channel.bulkDelete(deletecount);
    } catch (e) {
       message.reply("you have to give me manage messages permission to delete messages!");
       message.delete();

       
   }
  },
};