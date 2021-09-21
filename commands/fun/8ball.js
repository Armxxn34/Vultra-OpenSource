const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  description: "There is a big chance I insult you!",
  category: "fun",
   aliases: ["eightball",],
    execute(message, args) {
      let answers = [
      "As I see it, yes,",
      "Ask again later,",
      "Better not tell you now,",
      "Cannot predict now,",
      "Concentrate and ask again,",
      "It is certain,",
      "Don’t count on it,",
      "What, NO!!",
      "Most likely,",
      "My reply is no,",
      "My sources say yes,",
      "Outlook not so good,",
      "Outlook good,",
      "Reply hazy, try again,",
      "You may rely on it,",
      "Of course not!",
      "Without a doubt,",
      "Signs point to no",
      "Never",
      "No",
      "Yes",
     
    ];
let q = args.join(' ')

    let Result = answers[Math.floor(Math.random() * answers.length)];
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`8ball`)
      .setThumbnail('https://cdn.discordapp.com/attachments/807972694359932928/815957179261124658/e8cb6d17003ed339ad02c648745635bc.jpg')
      .setDescription(`
      **Your question:** ${q}
      **Result:** ${Result} ${message.author}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};//works
