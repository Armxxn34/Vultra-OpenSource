const Discord = require('discord.js')
module.exports = {
  name: 'angry',
  description: 'Gives an angry gif',
  category:'fun',
  execute(message, args) {
    const array = ["https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif", "https://media.giphy.com/media/3o9bJX4O9ShW1L32eY/giphy.gif", "https://media.giphy.com/media/26uf1EUQzKKGcIhJS/giphy.gif", "https://media.giphy.com/media/90FH7I3McAQ7u/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} is angry.`)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
           
    },
};