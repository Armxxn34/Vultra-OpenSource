const {readdirSync} = require('fs');
const ascii = require('ascii-table');
const chokidar = require('chokidar');
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull;
            try {
              pull = require(`../commands/${dir}/${file}`);
            } catch(e) {
              table.addRow(file,`❌ -> ${e}`);
            }
			if (!pull) continue;
			if (!pull.name) pull.name = file.slice(0, -3);
		  pull.category = dir;
			client.commands.set(pull.name, pull);
      table.addRow(file,'✅');
        }
        console.log(table.toString());
        
const watcher = chokidar.watch(`./commands/${dir}`);
watcher.on('add',async function(path) {
  await client.wait(1800000);
  const pull = require(`../commands/${dir}/${file}`);
      if (!pull) return;
			if (!pull.name) pull.name = file.slice(0, -3);
		  pull.category = dir;
			client.commands.set(pull.name, pull);
});
    });
    
};
