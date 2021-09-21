const db = require("quick.db");
module.exports = {
  async run(reaction, user){
    let { message } = reaction;
    if(message.partial){
      message = await message.fetch();
    }
    const {id, members, roles} = message.guild;
    if(user.id != reaction.client.user.id && message.id === db.get(`${id}_reactionmsg`) && reaction.emoji.toString() === db.get(`${id}_reactionemoji`)){
    const role = roles.cache.get(db.get(`${id}_reactionrole`));
    if(!role) return;
    members.cache.get(user.id).roles.add(role).catch(console.error);
    reaction.users.remove(user);
    }
  }
};
