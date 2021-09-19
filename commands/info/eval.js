/**** GET FUNCTIONS ****/
const { MessageEmbed } = require("discord.js");
const { inspect } = require('util');

/**** GET CONFIG ****/
const config = require("./config.json");

/**** CREATE FUNCTIONS ****/
function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

module.exports = {
    name: "help",
    description: "List all of the avaiable commands.",
    usage: "-help",
    category: "info",
    run: async (client, message, args) => {
        if(message.author.id != "465945329968218144") return;

        try {
            /**** GET CODE FROM COMMAND ****/
            let input = args.join(' ').replace(/.*token.*(\s|$)/i,"'<token-hidden>'");

            /**** EVALUATE CODE ****/
            const evaled = eval(input);

            /**** CREATE EMBED FOR RESULTS ****/
            const EvalEmbed = new MessageEmbed();
            EvalEmbed.setTitle('Evaluation Done.');
            EvalEmbed.addField('**Input:**',`\`\`\`js\n${args.join(' ')} \`\`\``);
            EvalEmbed.addField('**Output:**',`\`\`\`js\n${clean(inspect(evaled))} \`\`\``);
            EvalEmbed.addField('**Type:**',`\`\`\`js\n${Object.prototype.toString.call(evaled)} \`\`\``);
            EvalEmbed.setFooter(`Executed in ${(Date.now() - message.createdTimestamp)}ms`);

            /**** SEND EMBED FOR RESULTS ****/
            message.channel.send(EvalEmbed);
        } catch (e) {
            console.error(e);
            message.reply("Caught an error. ```js\n" + e + "```");
        }
    }
};
