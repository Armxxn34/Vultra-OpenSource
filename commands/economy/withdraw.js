 const db = require("quick.db");
      const Discord = require("discord.js");
      module.exports = {
        name: "withdraw",
        description: "begs random people or celebrities for money",
        aliases: ["with"],
        cooldown: 5,
        execute(message, args) {


    
if(!args[0]) {
  let embed = new Discord.MessageEmbed()

  .setDescription(`Incorrect Usage! -withdraw/with amount`)
  .setColor('RED')

  message.channel.send(embed)
}


 
    

      let bank = db.fetch(`bank_${message.author.id}`)


if(bank < args[0]) {
  return message.reply(`You dont even have that much in your bank.`)
}

else if(bank > args[0]) {
  db.subtract(`bank_${message.author.id}`, args[0])
  db.add(`money_${message.author.id}`, args[0])

  return message.channel.send(`Successfully withdrawed :coin: **${args[0]}**`)
}


let bal = db.fetch(`money_${message.author.id}`)

if(args[0] === "all") {
    db.subtract(`bank_${message.author.id}`, bank)
  db.add(`money_${message.author.id}`, bank)

  return message.channel.send(`Successfully withdrawed all your coins!`)
}
        }


      }
