const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'poll',
  description: 'poll',
    category:'info',
  execute(message, args) {
        let messageArgs = args.join(' ');
    const embed = new Discord.MessageEmbed()
      .setTitle("Poll:")
      .setTimestamp()
      .setFooter('Cooldown enabled!')
      .setColor("RANDOM")
      .setDescription(messageArgs);
    message.channel.send(embed).then((msg) =>{
 msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
  },
};
