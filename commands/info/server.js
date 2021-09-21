const Discord = require("discord.js");
let region = {
	"brazil": ":flag_br: Brazil",
	"eu-central": ":flag_eu: Central Europe",
	"singapore": ":flag_sg: Singapore",
	"us-central": ":flag_us: U.S. Central",
	"sydney": ":flag_au: Sydney",
	"us-east": ":flag_us: U.S. East",
	"us-south": ":flag_us: U.S. South",
	"us-west": ":flag_us: U.S. West",
	"eu-west": ":flag_eu: Western Europe",
	"vip-us-east": ":flag_us: VIP U.S. East",
	"london": ":flag_gb: London",
	"amsterdam": ":flag_nl: Amsterdam",
	"hongkong": ":flag_hk: Hong Kong",
	"russia": ":flag_ru: Russia",
	"southafrica": ":flag_za:  South Africa",
    "newzealand": ":flag_nz:  New Zealand"
};
let checkDays = (date) =>  {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};
module.exports = {
	name: 'serverinfo',
	description: 'gives server info',
	async execute(message) {
			let invite = await message.channel.createInvite({
			maxAge: 86400,
			maxUses: 100
		},

		).catch(err => {});
		let embed = new Discord.MessageEmbed()
			.setTitle(message.guild.name)
			.setColor(0x00AE86)
			.addField(`ServerName: ${message.guild.name}`,
      `id: ${message.guild.id}`, '-\n')
			.addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member =>  member.user.bot).size}`, true)
			.addField("Channels", message.guild.channels.cache.size, true)
			.addField(`Region: ${region[message.guild.region]}`, '-\n')
			 .addField("Verification Level",message.guild.verificationLevel, true)
      .addField("Roles", message.guild.roles.cache.size, true)
      .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
      .setThumbnail(message.guild.iconURL())
			.addField(`Invite: ${invite}`, '-\n')
		message.channel.send(embed);
	},
};
