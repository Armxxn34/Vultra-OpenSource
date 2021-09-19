/**** CREATE A FILESYSTEM ****/
const { readdirSync } = require("fs");

/**** CREATE A TABLE OF COMMANDS ****/
const ascii = require("ascii-table");
let table = new ascii("Commands");

/**** IDK WHAT THIS DO, PROLY NAME THE TABLE ****/
table.setHeading("Command", "Load status");

/**** START THE COMMAND.JS EVENT ****/
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}
