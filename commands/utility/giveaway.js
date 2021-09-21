const {MessageEmbed} = require ('discord.js');
const ms = require ('ms');
module.exports = {
  name:'giveaway',
  usage :'<channel> <duration> <prize>',
  async execute(message,args, client){
    if(args.length < 3) return message.reply('please mention the duration and prize the giveaway will be hosted for.');
   
    if(!ms(args[1])) return message.reply('please input a valid duration');
    const channel = message.mentions.channels.first();
    if(!channel) return message.reply('please mention the channel u want the giveaway to be hosted in');
    const embed = new MessageEmbed ()
    .setTitle(':tada: **GIVEAWAY TIME** :tada:')
    .setColor('RANDOM')
    .addField('**Duration**',args[1], true)
    .addField('**Prize**', args.join(' ').replace(`${args[0]} ${args[1]}`,''), true);
    const msg = await channel.send(embed);
    msg.react('🎉');
    setTimeout (() => {
     
  const users = msg.reactions.cache.find(x => x._emoji.name == '🎉').users.cache
  users.delete(client.user.id)
  const winner = users.random();
  embed.addField('**Winner**',winner?`${winner}`:'None')
  .spliceFields(0,2)
  .setTitle(':tada: **GIVEAWAY ENDED** :tada:');
  msg.edit(embed)
    },ms(args[1]));
    
  }
};