const db = require("quick.db");
module.exports = {
  description: "sets up a reaction system!",
  category:"utility",
  execute(message, args){
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You need the `MANAGE_ROLES` permision to execute this command.");
    if(args.length < 3) return message.reply("Please pass the message id, the emoji, and the role that will be used in the reaction role");
    const {id} = message.guild;
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if(!role) return message.reply("Please mention a vaild role");
    if(db.set(`${id}_reactionmsg`,args[0]) && db.set(`${id}_reactionemoji`,args[1]) && db.set(`${id}_reactionrole`,role.id)){
      const channel = message.guild
      .channels.cache.find(channel => channel.messages && channel.messages.cache.has(args[0]));
      if(channel) channel.messages.cache.get(args[0]).react(args[1]).catch();
      message.channel.send({embed:{description:`Successfully set your reaction role system:\nMessage ID: ${args[0]}\nEmoji: ${args [1]}\nRole: ${role}`,
        color:"RANDOM"
      }});
    } else message.reply("The setup failed please try again later");
  }
};