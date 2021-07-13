 const db = require("quick.db");
      const Discord = require("discord.js");
      module.exports = {
        name: "beg",
        description: "begs random people or celebrities for money",
        cooldown: 5,
        execute(message, args) {

          
          let answers = [
      "thahsin17 for cash and he gave you",
      "Armxxn34 for moneyz and he gave you",
      "CustomName for gold but he gave you",
      "KSI for cash and he gave you",
      "The Vultra Devs for cash and they gave you",
    ];
     let Result = answers[Math.floor(Math.random() * answers.length)];
          let amount = Math.floor(Math.random() * Math.floor(99));
          if (amount < 20) amount = 43;
          db.add(`money_${message.author.id}`, amount);
          db.add(`aTB_${message.author.id}`, amount)
          const embedd = new Discord.MessageEmbed()
          .setTitle('Begging')
          .setDescription(`You begged ${Result} $${amount} 
:coin:`)
.setColor('RANDOM')
          message.channel.send(embedd);
        },
      };
