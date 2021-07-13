const db = require('quick.db')
const Discord = require('discord.js')
module.exports ={
    name: "daily",
    cooldown: 8640,
    description: "Gives you your daily allowance",
    execute(message, args){
        const randomAmount = Math.floor(Math.random() * 1000); 
        const daily = db.add(`money_${message.author.id}`, randomAmount);
            db.add(`aTB_${message.author.id}`, randomAmount)
        const dailyEmbed = new Discord.MessageEmbed()
        .setTitle('Daily')
        .setDescription(`💸you recieved $${randomAmount} as your daily`)
        .setColor('RANDOM');
        message.channel.send(dailyEmbed);
    }
}  
