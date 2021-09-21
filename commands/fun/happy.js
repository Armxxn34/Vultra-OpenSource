const Discord = require('discord.js')
module.exports = {
  name: 'happy',
  description: 'Gives a happy gif',
      category:'fun',
  execute(message, args) {
    const array = ["https://media.giphy.com/media/13k4VSc3ngLPUY/giphy.gif", "https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif", "https://media.giphy.com/media/39onL3yTmFw8I8agYk/giphy.gif", "https://media.giphy.com/media/MVDPX3gaKFPuo/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} is happy.`)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
          
    },
};