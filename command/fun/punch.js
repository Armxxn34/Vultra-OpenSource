const Discord = require('discord.js')
module.exports = {
  name: 'punch',
  description: 'Punch the person you mention',
      category:'fun',
  execute(message, args) {
    const array = ["https://cdn.weeb.sh/images/SkFLH129z.gif", "https://cdn.weeb.sh/images/rJRUk2PLz.gif", "https://cdn.weeb.sh/images/ByI7vTb-G.gif", "https://cdn.weeb.sh/images/BkdyPTZWz.gif",
    "https://media.giphy.com/media/yo3TC0yeHd53G/giphy.gif",
    "https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);
         const mmx = Math.floor(Math.random() * array.length);
        const user = message.mentions.users.first();
        if (user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} punches ${user.username},Looks like it hurts!
              `)
                .setImage(`${array[randomgif]}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        } else {
            const INNOOOOO = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Dude, mention the person u want to punch, we have our popcorn ready!')
            .setTitle('Error!')
             message.channel.send(INNOOOOO)
        }
    },
};
