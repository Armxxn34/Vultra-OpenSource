const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: 'rwarn',
execute(message, args){
const user = message.mentions.users.first();
const embedds = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Please mention a member that you want to remove a warn from!')
.setColor('RANDOM')
if (!user)
return message.channel.send(embedds)
warn = db.subtract(`warn_${user.id}`, 1)
warns = db.fetch(`warn_${user.id}`)
const embed = new Discord.MessageEmbed()
.setTitle('Warned')
.setDescription(`Successfully removed a warning from ${user.username}!
This user now has ${warns} warns`)
.setColor('RANDOM')
message.channel.send(embed)
}
}