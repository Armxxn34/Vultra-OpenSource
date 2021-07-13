const Discord = require('discord.js')
module.exports = {
  name: 'cry',
  description: 'Gives a cry gif',
      category:'fun',
  execute(message, args) {
    const array = ["https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif", "https://media.giphy.com/media/14z4kx5yMo8Sc/giphy.gif", "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif", "https://media.giphy.com/media/l3q2RauzE5Vzf7iYo/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} is crying.`)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)

    },
};