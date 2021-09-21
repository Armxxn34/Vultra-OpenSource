module.exports = {
  name: 'kick',
  description: "This command kicks a member!",
  execute(message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send("You need the `Kick Members` permissions to execute this command!")
      if(!message.guild.me.hasPermission("KICK_MEMBERS"))return message.channel.send("I need the `Kick Members` permissions to execute this command!")
    const target = message.mentions.users.first();
    if (!target)
      return message.channel.send(
        `Please Mention A Member That You Want To Kick!`
      );
    if (target) {
      const memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.kick();
      message.channel.send(` ${target.username} has been kicked`);
      
    }
  }
}