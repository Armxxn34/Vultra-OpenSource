const music = require("../../handlers/musicHandler.js")
const Discord = require('discord.js')
//#TODO: dj role checking

module.exports = {
  name: "loop",
  aliases: [],
  description: "Toggle between loop states!",
  ussage: "loop off|single|queue",
  async execute(message, args, client) {
    let queue = await music.getQueue(message);
    let arg = args[0];
    if (!queue) {
        message.channel.send(`I am not currently playing in this server.`);
        return;
    };

    /*if (!message.member.hasPermission("ADMINISTRATOR") && queue.voiceChannel.members.filter(user => !user.user.bot).size > 1) {
        message.channel.send(`You don't have permission to change loop state.`);
        return;
    }*/

    if (arg === "off") {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Looping Disabled`)
      .setDescription(`Looping for this server has been set to \`off\`.`)
      .setColor('RANDOM')
      .setTimestamp()
        queue.loop = { enabled: false, single: false };
        message.channel.send(embed);
        return;
    }
    if (arg === "single") {
        queue.loop = { enabled: true, single: true };
        const eembed = new Discord.MessageEmbed()
      .setTitle(`Looping Enabled`)
      .setDescription(`Looping for this server has been set to \`single\`.`)
      .setColor('RANDOM')
      .setTimestamp()
        message.channel.send(eembed);
        return;
    }
    if (arg === "queue") {
        queue.loop = { enabled: true, single: false };
        const eeembed = new Discord.MessageEmbed()
        .setTitle(`Looping Enabled`)
        .setDescription(`Looping for this server has been set to \`queue\`.`)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send(eeembed);
        return;
    }

    //if no argument
    if (!arg) {
        if (queue.loop.enabled === false) {
            queue.loop = { enabled: true, single: false };
            const eeembed = new Discord.MessageEmbed()
        .setTitle(`Looping Enabled`)
        .setDescription(`Looping for this server has been set to \`queue\`.`)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send(eeembed);
            return
        } else if (queue.loop.single == false) {
            queue.loop = { enabled: true, single: true };
            const eeeembed = new Discord.MessageEmbed()
        .setTitle(`Looping Enabled`)
        .setDescription(`Looping for this server has been set to \`single\`.`)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send(eeeembed);

            return;
        } else {
            queue.loop = { enabled: false, single: false };
            const embedd = new Discord.MessageEmbed()
            .setTitle(`Looping Disabled`)
            .setDescription(`Looping for this server has been set to \`off\`.`)
            .setTimestamp()
            .setColor(`RANDOM`)
            
            message.channel.send(embedd);
            return;
        }
    }

    message.channel.send(`\*\*Invald arguments:\*\* Only valid loop states are\: off, queue, single`)
  }
}
