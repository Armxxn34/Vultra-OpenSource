const Discord = require("discord.js");
module.exports = {
  name: "botinfo",
  description: "Bot Info!",
  category: "info",
  async execute(message, args, client, prefix) {
    let uptime,
      totalSeconds = client.uptime / 1000,
      botchannels,
      botguilds,
      botcreated = client.user.createdAt
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    const days = ("0" + Math.floor(totalSeconds / 86400)).slice(-2);
    const hours = ("0" + Math.floor(totalSeconds / 3600)).slice(-2);
    totalSeconds %= 3600;
    const minutes = ("0" + Math.floor(totalSeconds / 60)).slice(-2);
    const seconds = "0" + Math.floor(totalSeconds % 60);
    uptime = `${days}:${hours}:${minutes}:${seconds}`;
    botchannels = client.channels.cache.size.toLocaleString();
    botguilds = client.guilds.cache.size.toLocaleString();
    let embed = new Discord.MessageEmbed()
      .setTitle("Vultra Bot")
      .setColor("RANDOM")
      .addField("Servers Joined: ", botguilds, true)
      .addField("Channels Joined: ", botchannels, true)
      .addField("Uptime: ", `${uptime}`, true)
      .addField("Prefix: ", prefix, true)
      .addField("Ping: ", Math.round(client.ws.ping) + "ms", true)
      .addField("Created at: ", botcreated, true)
      .setFooter(
        "Requested by " + message.author.tag,
        message.author.avatarURL({
          format: "png",
          dynamic: true,
          size: 2048
        })
      )
      .setTimestamp();
    message.channel.send(embed);
  }
};
