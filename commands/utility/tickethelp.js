const Discord = require('discord.js')
const client = new Discord.Client();
const db = require("quick.db")


module.exports = {
  name: 'setwelcome',
  aliases: ['sw'],
  permissions: [],
  description: 'creates a bugreport!',
  usage: '-bugreport <Message>',
 async execute(message, args) {


    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(`You dont have perms.`)
    }


let welcomeChannel = message.mentions.channels.first()


if(!args[0]) {
  
  let embed = new Discord.MessageEmbed()

  .setDescription(`You forgot to mention a channel.`)
  .setColor('RED')

  message.channel.send(embed)
}


 else if(!args[1]) {
  


let welcomeChannel = message.mentions.channels.first()


  let embed1 = new Discord.MessageEmbed()

  .setDescription(`The welcome channel has been set to ${welcomeChannel}!`)
  .setColor('GREEN')

  message.channel.send(embed1)
}

else if(!args[0]) {

  let embed2 = new Discord.MessageEmbed()

  .setDescription(`The current welcome channel is ${welcomeChannel}!`)
  .setColor('GREEN')

  message.channel.send(embed2)
}
  }



}