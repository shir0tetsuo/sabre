const chalk = require('chalk');
const settings = require('../settings.json')
module.exports = client => {
  client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers. v${settings.version}`, type: 0}})
  client.user.setStatus("dnd") // online/offline/dnd/invisible/idle
  console.log(chalk.bgGreen.black('System Ready\nSystem Ready'));
};
