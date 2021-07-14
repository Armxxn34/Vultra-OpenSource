const Discord = require("discord.js");
module.exports = {
  name: "unban",
  category: "moderation",
  description: "unban",
  async execute( message, args, client) {
    let unbanned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.join(" ").slice(23)

    
    let ban = await message.guild.fetchBans();
    
    console.log(ban);

    // MESSAGES
    if(!unbanned) return message.reply("Please mention someone to unban");
    if(unbanned.id === message.author.id) {
      let unbanerror1 = new Discord.MessageEmbed()

      .setDescription(`Are you sure you are banned?`)
      .setColor('RED')

      return message.channel.send(unbanerror1);

    }



  if(!ban.get(unbanned.id)) {
      let notbannedembed = new Discord.MessageEmbed()
        .setDescription("**This user is not banned**")
        .setColor("RED");
      message.channel.send(notbannedembed);

      return;
    }

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnoperms = new Discord.MessageEmbed()
        .setDescription(
          "I do not have permissions, please contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(botnoperms);

      return;
    }


    if (!message.member.permissions.has("BAN_MEMBERS")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You do not have permission `BAN MEMBERS` contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);

      return;
    }


    message.guild.members.unban(unbanned.id);
    let successfullyembed = new Discord.MessageEmbed()
      .setTitle(`**${unbanned.tag}** has been successfully unbanned | ${reason}`)
      .setColor("#2C2F33");

    message.channel.send(successfullyembed);
  }

  


};