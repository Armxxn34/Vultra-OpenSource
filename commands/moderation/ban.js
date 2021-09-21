const Discord = require("discord.js")



module.exports = {
    name: 'ban',
    description: "This command kicks a member!",
    execute(message, args){
    
    let member = message.mentions.users.first()

    if(!args[0]) {

      let errorEmbed = new Discord.MessageEmbed()

      .setDescription(`Wrong usage! -ban user days reason`)
      .setColor('RED')
      message.channel.send(errorEmbed)
    }
      else  if(args[1]) {

      let errorEmbed = new Discord.MessageEmbed()

      .setDescription(`Wrong usage! -ban user days reason`)
      .setColor('RED')
      message.channel.send(errorEmbed)
    }

    let daysAmount = `${args[1]}`;

    let reason = args.join(" ").slice(23)
    
    if(!daysAmount) {
      let successEmbed2 = new Discord.MessageEmbed()

      .setDescription(`**${message.member.id}** has been banned! || Days: No days specified`)
      .setColor('GREEN')

      message.channel.send(successEmbed2)
    }

    if (!reason){
      let successEmbed1 = new Discord.MessageEmbed()

    .setDescription(`**${user.id}** has been banned! | Days: No day specified | Reason: No Reason Provided`)
    .setColor('GREEN')

   return message.channel.send(successEmbed1)
    
    }


else {
    
    member.ban({ days: daysAmount, reason: reason})

    let successEmbed = new Discord.MessageEmbed()

    .setDescription(`**${member.id}** has been banned! | Days: ${daysAmount} Reason: ${reason}`)
    .setColor('GREEN')

    message.channel.send(successEmbed)
    }
}
}
