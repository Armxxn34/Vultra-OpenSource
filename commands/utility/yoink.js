module.exports = {
  name:'yoink',
  aliases:['stealemoji'],
  execute (message,args,client){
    if(!args[0]) return message.reply("You need to pass the emoji you want to steal")
    if(args[0].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
    const emojiparts = args[0].split(':');
    const emojiid = emojiparts[2].replace('>','');
    const emojitype = emojiparts[0]=='<a'?'gif':'png';
    message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emojiid}.${emojitype}`,emojiparts[1]).then(emoji => message.channel.send(`successfully yoinked the emoji ${emoji}`)).catch(console.error);
    
    } else {
      if(!args[1]) args[1] = 'png';
      if(!args[2]) args[2] = 'emoji';
     if(!isNaN(args[0])){
       
     message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${args[0]}.${args[1]}`, args[2]).then(emoji => 
     message.channel.send(`Successfully yoinked the emoji ${emoji}`)).catch(error => console.error);
     } else if(args[0].startsWith('https://') || args[0].startsWith('https://')){
    if(!args[1]) args[1] = 'emoji';
            message.guild.emojis.create(args[0], args[1]).then(emoji => message.channel.send(`successfully yoinked the emoji ${emoji}`)).catch(error => console.error(error));
     } else {
            const emoji = client.emojis.cache.find(e => e.name == args[0]);

    if(!emoji) return message.reply('didnt find the emoji you asked for');
    message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated?'gif':'png'}`,emoji.name).then(emoji => message.channel.send(`successfully yoinked the emoji ${emoji}`)).catch(error => console.error);
      }
    }
  }
};