const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "help",
  category:"help",
  async execute(message, args, client, prefix) {
    const categories = [...new Set(client.commands.filter(x => x.category != "devonly").map(x => x.category))];
    let i = 0;
    const embed = new MessageEmbed()
      .setTitle(`Category: ${categories[i]}`)
      .setDescription(client.commands.filter(x => x.category == categories[i]).map(x => `**${prefix+x.name}${x.usage ? " `"+x.usage+"`" : ""}**: ${x.description || "No description"}`).join("\n\n"))
      .setColor("RANDOM");
    const msg = await message.channel.send(embed).catch(console.error);
    if(!msg) return;
    await msg.react("👉").catch();
    await msg.react("👈").catch();
    await msg.react("⏹️").catch();
      const filter = (reaction, user) => {
	return ["👈","👉","⏹️"].includes(reaction.emoji.name) && user.id === message.author.id;
};

const collector =  msg.createReactionCollector(filter, { max:20, time: 60000, errors: ['time'] });
collector.on("collect",(reaction,user) => {
		const emoji = reaction.emoji.name;
		switch(emoji){
		  case "👉":
		    if(i == categories.length - 1) i = 0;
		    else i++;
		    break;
		  case "👈":
		    if(i === 0) i = categories.length - 1;
		    else i--;
		    break;
		  case "⏹️":
		    msg.reactions.removeAll();
		    throw "";
		}
		embed.setTitle(`Category: ${categories[i]}`)
      .setDescription(client.commands.filter(x => x.category == categories[i]).map(x => `**${prefix+x.name}${x.usage ? " `"+x.usage+"`" : ""}**: ${x.description || "No description"}`).join("\n\n"));
      msg.edit(embed);
      reaction.users.remove(user);
	});
  }
};
