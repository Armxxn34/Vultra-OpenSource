
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('angry')
		.setDescription('Why u angry?'),
cooldowns : new Set(),
	    cooldown : 3,
	async execute(interaction) {

  const array = ["https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif", "https://media.giphy.com/media/3o9bJX4O9ShW1L32eY/giphy.gif", "https://media.giphy.com/media/26uf1EUQzKKGcIhJS/giphy.gif", "https://media.giphy.com/media/90FH7I3McAQ7u/giphy.gif"]
        const randomgif = Math.floor(Math.random() * array.length);
const embed = new MessageEmbed()
.setTitle(`${interaction.user.username} is angry!`)
.setImage(`${array[randomgif]}`)
.setColor('RANDOM')
await interaction.reply({embeds: [embed]})
	},
};
