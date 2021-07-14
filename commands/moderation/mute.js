const Discord = require("discord.js")

module.exports = {
  name: 'mute',
  description: 'Mute a user',
  async  execute(message, args){

if(!args[0]) {

  let embed1 = new Discord.MessageEmbed()

  .setDescription("Wrong usage! *-mute user | Reason (You dont have to supply a reason)*")
  .setColor('RED')

  message.channel.send(embed1)
}
   
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I Need The `Manage Roles` Permission To Use This Command!")

let mentionedUser = message.mentions.users.first()



let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted')



if(!mutedRole) {
  return message.channel.send(`I cannot find the Muted Role please create one.`)
}



let reason = args.join(" ").slice(23)





  }
}