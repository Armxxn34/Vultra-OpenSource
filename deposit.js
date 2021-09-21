const db = require("quick.db");
const Discord = require("discord.js");
module.exports = {
  name: "deposit",
  description: "begs random people or celebrities for money",
  aliases: ["dep"],
  cooldown: 5,
  execute(message, args) {



    if (!args[0]) {
      let embed = new Discord.MessageEmbed()

        .setDescription(`Incorrect Usage! -deposit amount`)
        .setColor('RED')

      message.channel.send(embed)
    }


    let bal = db.fetch(`money_${message.author.id}`)


    let bank = db.fetch(`bank_${message.author.id}`)


    if (bal < args[0]) {
      return message.reply(`You dont even have that much.`)
    }

    else if (bal > args[0]) {
      db.subtract(`money_${message.author.id}`, args[0])
      db.add(`bank_${message.author.id}`, args[0])

      return message.channel.send(`Successfully deposited :coin: **${args[0]}**`)
    }


    if (args[0] === "all") {
      db.subtract(`money_${message.author.id}`, bal)
      db.add(`bank_${message.author.id}`, bal)

      return message.channel.send(`Successfully deposited all your coins!`)
      //
    }
  }


}
