const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')

module.exports = {
  name: 'setlogs',
  aliases: ['sl'],
  permissions: [],
  description: 'creates a bugreport!',
  usage: '-bugreport <Message>',
  execute(message, args, client) {


let channel = message.mentions.channels.first()

if(args[0] === "warn") {

let warnL = db.set(`warnlogs_${message.guild.id}`, channel)
  let embed = new Discord.MessageEmbed()

  .setDescription(`New log channel for warns set to ${channel}. By <@${message.author.id}> `)
  .setColor('#262626')
  .setTimestamp()

  message.channel.send(embed)
}
  }

}