const Discord = require('discord.js')
const client = new Discord.Client();

module.exports = {
  name: 'bugreport',
  aliases: ['br', 'bugrep'],
  permissions: [],
  description: 'creates a bugreport!',
  usage: '-bugreport <Message>',
  execute(message, args, client) {


    if (!args[0]) {
      const embedd = new Discord.MessageEmbed()
      .setDescription('Incorrect Usage! -bugreport/-br/-bugrep what you want to report.')
      .setColor('RED')
      message.channel.send(embedd)
    
    }



      
    const messageArgs = args.join(' ').slice(0)
    

let embed1 = new Discord.MessageEmbed()

.setDescription(`Your bug report has been sent. \n Your Issue: "${messageArgs}" `)

client.users.cache.get(message.author.id).send(embed1)

     const embed = new Discord.MessageEmbed()
     .setTitle('New Bug Report')
     .setDescription(` **Reporter:**
${message.author.username}

**Issue:** 
${messageArgs}

**Guild:**
${message.guild.name}

**Extra Note:**
React with a :arrow_up_small: if you are facing the same problem.
:white_check_mark: Means that the error has been solved.`)
.setThumbnail(message.author.avatarURL())
.setColor('GREEN')

client.channels.cache.get('835514828726337567').send(embed)
            

    }
  }
