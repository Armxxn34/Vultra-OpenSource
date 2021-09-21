const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'gayrate',
  description: 'Gives a random number, telling you how gay you are',
    category:'fun',
    aliases: ["gayr8", "gayreight"],
    cooldown: '5',
  execute(message, args) {
    const gay = Math.floor(Math.random() * Math.floor(100));
     const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
          .setColor("#0000ff")
          .setDescription(`${user.username} is ${gay}% gay
          `)
          .setTitle(`Gayrate Machine!`)
          .setTimestamp()
          .setFooter ('Thank you for using Vultra')   
        message.channel.send(avatarEmbed);
  },
};