const Discord = require('discord.js')
module.exports = {
  name: 'userinfo',
  description: 'userinfo command',
  execute(message, args) {
   const user = message.mentions.users.first() || message.author;         
    const Nick = message.author.tag || message.member.mentions.first().tag

    const ID = message.author.id || message.member.mentions.first().id

    const Created = message.author.createdAt || message.member.mentions.first().createdAt

    const Role =  message.member.roles.cache.map(role=>role.name).join(", ") || message.member.first().roles.cache.map(role=>role.name)/join(", ")
 const userinfo = new Discord.MessageEmbed()
.setTitle("Userinfo")
.setColor("RANDOM")
.setFooter(`Requested by ${message.author.tag}`)
.setTimestamp()
.addField("Nickname",  Nick)
.addField("ID",  ID)
.addField("Created",  Created)
.addField("Role", Role) 
.setThumbnail(user.avatarURL({dynamic: true, format: 'gif'}));
message.channel.send(userinfo)
  },
};
