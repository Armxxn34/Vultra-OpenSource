const db = require('quick.db');
const {MessageEmbed} = require('discord.js');

module.exports = {
	name: 'bal',
	description: 'Tells you your bot balance!',
	cooldown: 5,
	execute(message, args) {
		const user =
				message.mentions.users.first() ||
				message.client.users.resolve(args[0]) ||
				message.author,
			{ id, username } = user;

		let bal = db.fetch(`money_${id}`);
    let allTB = db.fetch(`aTB_${id}`);
    let bank = db.fetch(`bank_${id}`);
    if(allTB === null)allTB = 0;
		if (bal === null) bal = 0;
		if (bank === null) bank = 0;
    

		let embed = new MessageEmbed()
			.setTitle(`${username}'s Balance`)
			.addField(":moneybag: **Balance**:",`:coin: ${bal}`)
			.addField(":bank: **Bank**:",`:coin: ${bank}`)
			.addField("👤 **Networth**:",`:coin: ${bal+bank}`)
      .addField(":money_with_wings: **All Time Balance:**", `:coin: ${allTB} `)
			.setThumbnail(user.displayAvatarURL({dynamic:true}))
			.setFooter("Bro stop making it like dankmemer. jesus.")
      .setTimestamp()
			.setColor('GREEN');
		message.channel.send(embed)
	}
}
