module.exports ={
  name: "unlock",
  execute(message, args){
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
   const Discord = require('discord.js')
   const embed = new Discord.MessageEmbed()
   .setTitle('Unlocked Server')
   .setDescription('I have successfully opened the chat once again!')
   .setColor('RANDOM')
   message.channel.send(embed)
  }
}
