const Discord = require("discord.js")
const client = new Discord.Client()
const db = require("quick.db")
module.exports = {
  name: 'warns',
execute(message, args){
const user = message.mentions.users.first()||message.author;
warns = db.fetch(`warn_${user.id}`,) 
let reason = db.fetch(`reasons1DB_${user.id}`)
if(warns === null)warns = 0;
const embedds = new Discord.MessageEmbed()
.setTitle(`${user.username}'s Warns`)
.setDescription(`${user.username} have ${warns} \n Reasons: ${reason}` )
.setColor('RANDOM')
message.channel.send(embedds)
}
}
