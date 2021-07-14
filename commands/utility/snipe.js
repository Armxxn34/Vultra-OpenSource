const Discord = require("discord.js"), fs = require("fs"), path = require("path");
module.exports = {
  name: "snipe",
  usage: "{prefix}snipe",
  description: "sends last deleted message",
  category: 'utility',
  aliases: ['s'],
  execute: async (message, args, client, prefix) => {
    fs.readFile(path.join(__dirname, "/../../config/delete.json"), async (err, data) => {
      let json = JSON.parse(data);
      let curGuild = json.messages.filter(c => c.guildId === message.guild.id);
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Sniped!`)
        .setDescription("**" + curGuild[0].username + "**" + ": " + curGuild[0].deletedMessage)
        .setTimestamp()
        .setFooter("Sniped!")
      return message.channel.send(embed);
    })
  }
};