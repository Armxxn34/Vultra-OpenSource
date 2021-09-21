const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'rewarn',
    description: "This command removes all warns from a  member!",
    execute(message, args){




const user = message.mentions.users.first();



const embedds = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Please mention a member that you want to remove a warn from!')
.setColor('RANDOM')
if (!user)
return message.channel.send(embedds)


warns = db.fetch(`warn_${user.id}`)




warn = db.subtract(`warn_${user.id}`, warns)



const embed = new Discord.MessageEmbed()
.setTitle('Warned')
.setDescription(`Successfully reset all of ${user.username} warns!
This user now has ${warn} warns`)
.setColor('RANDOM')
message.channel.send(embed)

    
    }

}