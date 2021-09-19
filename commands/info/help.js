const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "List all of the avaiable commands.",
    usage: "-help",
    category: "info",
    run: async (client, message, args) => {
        if (args[0]) {
            const command = await client.commands.get(args[0]);
            if (!command) return message.channel.send("Unknown Command: " + args[0]);

            const InfoEmbed = new MessageEmbed();
            InfoEmbed.setAuthor(command.name, client.user.displayAvatarURL());
            InfoEmbed.addField("-Description-", command.description || "None");
            InfoEmbed.addField("Usage", command.usage || "None");
            InfoEmbed.setThumbnail(client.user.displayAvatarURL());
            InfoEmbed.setFooter(client.user.username, client.user.displayAvatarURL());

            return message.channel.send(InfoEmbed);
        } else {
            const HelpEmbed = new MessageEmbed();
            HelpEmbed.setTitle(`Vultra's Commands List!`);
            HelpEmbed.setDescription(`Soon to be listed.`);

            return message.channel.send(HelpEmbed);
        }
    }
}
