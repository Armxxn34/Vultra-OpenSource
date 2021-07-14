const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'rawarn',
    description: "This command removes all warns from a  member!",
    execute(message, args){


const user = message.mentions.users.first();

let removedAmount = `${args[1]}`;


const embedds = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Please mention a member that you want to remove a warn from!')
.setColor('RANDOM')
if (!user)
return message.channel.send(embedds)


warns = db.fetch(`warn_${user.id}`)


if(warns < removedAmount) {

  let errorEmbed = new Discord.MessageEmbed()

  .setDescription(`They dont even have that many warns.`)
  .setColor('RED')

  message.channel.send(errorEmbed)
}


if(warns > removedAmount)  {
warn = db.subtract(`warn_${user.id}`, `${removedAmount}`)
warns = db.fetch(`warn_${user.id}`)


const embed = new Discord.MessageEmbed()
.setTitle('Warned')
.setDescription(`Successfully ${removedAmount} from ${user.username}!
This user now has ${warns} warns`)
.setColor('RANDOM')
message.channel.send(embed)

    }
    }

}