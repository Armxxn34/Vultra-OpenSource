const db = require('quick.db');
const Discord = require("discord.js");
module.exports = {
    name: "prefix",
    description: "Set a server's prefix",
    execute(message, args){
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission to use that.');
        if(!args[0]) return message.channel.send('Please provide a new prefix');

        if(args[1]) return message.channel.send('The prefix can\'t have two spaces');

        db.set(`prefix_${message.guild.id}`, args[0])

        const embed = new Discord.MessageEmbed()
        .setDescription(`I set new prefix to **${args[0]}**!`)
        .setTitle(`Prefix Set!`)

    message.channel.send(embed).then(msg => msg.delete({timeout: 5000}))
    message.delete();
  } 
}