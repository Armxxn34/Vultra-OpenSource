const { registerFont, createCanvas } = require('canvas');
const {MessageAttachment, MessageEmbed} = require('discord.js');
const db = require('quick.db');
const handle = require("../../handlePromise.js");
const glitch = require("glitch-canvas");
registerFont('./OpenSans-Bold.ttf', { family: 'OpenSans' });
function generateRandomString() {
	let randomString = '';

	for (let i = 0; i < 6 ; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	return randomString;
}

module.exports = {
  name:"verify",
  category:"moderation",
  async execute(message, args){


 if(args[0] === "setup") {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You need the `MANAGE_ROLES` permision to execute this command.");
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); // jesus i went afk for 2 minutes and ur already doing the roles lmfao
//ikr I'm cool :)
  if(!role) return message.reply("Please mention a role to set")
  if(db.set(`${message.guild.id}_verifiedrole`,role.id)) return message.channel.send(`Successfully set verification role ${role}`); // alr then fair enough , i think we should mention the role in an embed just to make it look nicer.  ehhhhhhh i wouldnt say overrated they look pretty Nice wait lets test out the cmd first. 
  //ok lets test
// no inline is kool
  else return message.reply("An error happened while setting up the role try again later");
}
const role = message.guild.roles.cache.get(db.get(`${message.guild.id}_verifiedrole`));
     if(!role) return message.channel.send("This feature is either disabled or not setup correctly, contact an administrator to properly enable it");

	const canvas = createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
	const captcha = generateRandomString();
// it'll be better if u made that id statement directly under the execute function ye ok


	// Assign the decided font to the canvas
	ctx.font = "70px OpenSans";
	ctx.fillStyle = '#ffffff';
	ctx.shadowColor = "white";
	ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 10;
	ctx.fillText(captcha, canvas.width / 4, canvas.height / 2);
	const attachment = new MessageAttachment(canvas.toBuffer(), 'captcha.png');
	const embed = new MessageEmbed()
	  .setTitle("Captcha Sent")
	  .setDescription("You have a minute to send what you see in the captcha")
	  .attachFiles(attachment)
	  .setImage("attachment://captcha.png");
	  const msg = await message.author.send(embed).catch();
	  message.channel.send("I've tried to send you the verification captcha in dms");
	  const filter = m => m.author.id === message.author.id;
    const [collected, error] = await handle(msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }));
    if(error) return message.author.send("Your time window has ended, please try again");
    if(collected.first().content == captcha){
      message.member.roles.add(role);
      message.author.send("verification done");
    } else { // hm do u think it will be able to access the role variable earlier on in the code?  hmk im gonna go get something to eat.
 // have a good meal 
     
     message.author.send("given code's invalid please try again");
    }
  }
 }