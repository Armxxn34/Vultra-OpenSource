const { default_prefix } = require('../config');

module.exports = async bot => {
    console.log(`${client.user.tag} is online!`);
    const activities = [
        `Vultra Support`,
        `-help For Help!`,
        `.gg/jEKVP8BXNJ`,
    ];
    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `LISTENING` }), 12000);
};
