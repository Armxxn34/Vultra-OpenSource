 const db = require("quick.db");
      const Discord = require("discord.js");
      module.exports = {
        name: "work",
        cooldown: 600,
        description: "works at random places, results in you earning a lot of money",
        execute(message, args) {
          let answers = [
      "Jake Paul's Team 10 squad, that gave you",
      "InnovationDev's company, and that gave you ",
      "Youtube, that gave you",
      "KSI's beerus factory and that gave you",
      "TommyInnit's discord server, that gave you",
    ];
     let Result = answers[Math.floor(Math.random() * answers.length)];
          let amount = Math.floor(Math.random() * Math.floor(250));
          if (amount < 1) amount = 43;
              db.add(`money_${message.author.id}`, amount)
               db.add(`aTB_${message.author.id}`, amount)
          const embedd = new Discord.MessageEmbed()
          .setTitle('Work')
          .setDescription(`You worked at ${Result} $${amount} 
<a:money_flying:828222178393980958>`)
.setColor('RANDOM')
          message.channel.send(embedd);
        },
      };
