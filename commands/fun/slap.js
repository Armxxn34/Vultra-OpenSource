const Discord = require('discord.js')
module.exports = {
  name: 'slap',
  description: 'Slap the person you mention',
      category:'fun',
  execute(message, args) {
    const array = ["https://media.giphy.com/media/uG3lKkAuh53wc/giphy.gif", "https://media.giphy.com/media/Ql5voX2wAVUYw/giphy.gif", "https://media.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif", "https://media.giphy.com/media/3wtc9qlgBxaq4/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);
        const user = message.mentions.users.first();

        if (user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} slapped ${user.username}, 
                Looks like it hurts!`)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        } else {
            return message.channel.send('Please mention a user!')
        }
    },
};