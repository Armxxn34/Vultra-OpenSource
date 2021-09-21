const Discord = require("discord.js")
const db = require("quick.db")
const client = new Discord.Client();
module.exports = {
  name: 'warn',
    execute(message, args, client) {

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user){
      const embedds = new Discord.MessageEmbed()
      .setTitle('Error')
      .setDescription('Please mention a member that you want to warn!')
      .setColor('RANDOM');
      return message.channel.send(embedds);
    }
    let reason = args.join(" ").slice(23);

    let reasonDB = db.set(`reasons1DB_${user.id}`, reason)
    if (!reason) {
        const embedd = new Discord.MessageEmbed()
          .setTitle('Error')
          .setDescription('You must provide a reason to warn someone')
          .setColor('RANDOM');
        return message.channel.send(embedd);
      }
    if(user.user) user = user.user;
    const logs = db.fetch(`warnlogs_${user.id}`);
      warn = db.add(`warn_${user.id}`, 1);
        warns = db.fetch(`warn_${user.id}`);
       if (warns === null) warns = 0;

       
       const embed = new Discord.MessageEmbed()
          .setTitle('Warned')
          .setDescription(`${user.username}  has been warned. \n They now have ${warns} warns \n Reason: ${reason}`)
          .setColor('RANDOM');
        
        message.channel.send(embed);
     

let warnlogs = db.fetch(`warnlogs_${message.guild.id}`)

    
       const embeds = new Discord.MessageEmbed()
          .setTitle('Warned')
          .setDescription(`${user.username}  has been warned. \n They now have ${warns} warns \n Reason: ${reason} \n Moderator: <@${message.author.id}> \n `)
          .setColor('RANDOM');
        
        client.channels.cache.get(warnlogs.id).send(embeds)
      
  }
};
