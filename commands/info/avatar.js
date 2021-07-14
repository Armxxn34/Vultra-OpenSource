const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'avatar',
  description: 'avatar command',
  category: 'info',
  aliases: ["pfp", "av"],
  cooldown: '5',
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
       const avatar = user.avatarURL({dynamic: true, size: 2048,});
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor("#0000ff")
      .setDescription(`[Avatar Link](${user.avatarURL({dynamic: true})})`)
      .setAuthor(`Avatar of ${user.username}`)
      .setTimestamp()
      .setFooter('Thank you for using Vultra')
      .setImage(avatar)
    message.channel.send(avatarEmbed);
  },
};
