const { registerFont, createCanvas, loadImage } = require('canvas');
const Discord = require('discord.js');
const db = require('quick.db');
registerFont('./OpenSans-Bold.ttf', { family: 'OpenSans' });
function interpolate(template, variables){
	return template.replace(/\${[^{]+}/g, (match) => {
		const path = match.slice(2, -1).trim();
		return variables[path];
	});
}
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 3}px OpenSans`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
module.exports = {
  once:false,
  async run(member,client){
    
    const autorole = db.get(`${member.guild.id}_autorole`);
    const role = member.guild.roles.cache.get(autorole);
    const channel = member.guild.channels.cache.find(x => x.id == db.get(`welcome_${member.guild.id}`));
    
if(member.guild.me.permissions.has('MANAGE_GUILD')){
	const guildInvites = await member.guild.fetchInvites().catch(console.error);
    // Update the cached invites for the guild.
    const ei = client.invites.get(member.guild.id);
    
    client.invites.set(member.guild.id,guildInvites);
    
    const logChannel = member.guild.channels.cache.find(c=> c.id === db.get(`joinlogs_${member.guild.id}`));
    // Look through the invites, find the one for which the uses went up.
    
    // Get the log channel (change to your liking)
    const invite = guildInvites.find(i => ei && i && i.code && ei.get(i.code) ? ei.get(i.code).uses < i.uses : false);
     const inviter = invite ? invite.inviter : "Unknown";
    if(logChannel) logChannel.send({embed:{description:`${member.user.tag} joined using invite code ${invite?invite.code:'Unknown'} from ${inviter}. Invite was used ${invite?invite.uses:'Unknown'} times since its creation.`,
      color:"RANDOM"
      }});
  
}

  if (!channel) return;
 
	let welcomeimg = db.get(`${member.guild.id}.welcomeimage`);
	if (!welcomeimg) welcomeimg = './wallpaper.jpg';
let welcomemsg = db.get(`${member.guild.id}.welcomemessage`);
if(!welcomemsg) welcomemsg = "Welcome to the server, ${member}!";
	const canvas = createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await loadImage(welcomeimg);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	

	// Assign the decided font to the canvas
	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
	
	ctx.font = '25px OpenSans';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Member#${member.guild.members.cache.size}`, canvas.width / 2.5, canvas.height / 1.2);
	


	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');

	channel.send(interpolate(welcomemsg,{
	  member,
	  inviter
	}), attachment);
	
	if(role) member.roles.add(role).catch(console.error);


 }
}
