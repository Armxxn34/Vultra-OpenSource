const Discord = require('discord.js')
module.exports = {
  name: 'bday',
  description: 'Wish a person a really happy birthday',
      category:'fun',
  execute(message, args) {
    const array = ["https://media.giphy.com/media/WRL7YgP42OKns22wRD/giphy.gif", "https://media.giphy.com/media/LRCZEnOZRmAOE1MEWM/giphy.gif", "https://media.giphy.com/media/kZu5IMsDPzHqlOpmme/giphy.gif", "https://media.giphy.com/media/L0SVtu86DgL21RkZAB/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);
        const user = message.mentions.users.first();
        
        if (user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} said  happy birthday to  ${user.username} and from all of us at Vultra Support -  Happy birthday! We want cake btw.`)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        } else {
            return message.channel.send('Please mention a user whose birthday it is!!')
        }
    },
};