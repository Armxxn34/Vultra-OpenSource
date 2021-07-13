const Discord = require('discord.js')
module.exports = {
  name: 'hug',
  description: 'Hug the person you mention',
      category:'fun',
      aliases: ["cuddle"],
  execute(message, args) {
    const array = ["https://cdn.discordapp.com/attachments/807972694359932928/830453856214450196/r9aU2xv.gif", "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif", "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif", "https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif",
    "https://media.giphy.com/media/VXP04aclCaUfe/giphy.gif",
    "https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);
         const mmx = Math.floor(Math.random() * array.length);
        const user = message.mentions.users.first();
        if (user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} hugs ${user.username}, Aww!
              `)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        } else {
            const INNOOOOO = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Dude, mention the person u want to hug, we have our popcorn ready!')
            .setTitle('Error!')
             message.channel.send(INNOOOOO)
        }
    },
};
