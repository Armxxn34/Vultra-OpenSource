const Discord = require("discord.js");
const prefix = process.env.prefix

module.exports = {
  name: "slowmode",
  aliases: ["sm"],
  category: 'moderation',
  description: "sets slowmode for a channel",
  usage: "Slowmode <Number>",
  execute(message, args, client) {
    let cd = args[0];
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You Need The `Manage Channels` Permission To Use This Command!")
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I Need The `Manage Channels` Permission To Use This Command!")
    {
      const { channel } = message;
      let duration = args[0];
      if (isNaN(duration)) {
        message.channel.send("Please give a valid amount of time!");
        return;
      }

      if (cd > 21600) {
        return message.channel.send(
          "You can't set the Slowmode higher than 21600 seconds."
          .then(msg => {
    msg.delete({ timeout: 5000 })
  })
        );
      }
   
      channel.setRateLimitPerUser(duration);
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Slowmode Set!`)
        .setTimestamp()
        .addField(`Moderator`, `${message.author} (${message.author.id})`)
        .addField(`Time Set`, `${duration} seconds`)
        .setFooter(`Thank You for adding Vultra to your server!`)
        .setTimestamp();
        message.delete();
      return  message.channel.send(embed)
    .then(msg => {
    msg.delete({ timeout: 5000 });
    });
    }
  }
};




