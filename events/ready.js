const chalk = require('chalk');
const settings = require('../settings.json')
module.exports = client => {
  client.user.setPresence({ game: { name: `v${settings.version} (${settings.prefix}help)`, type: 0}})
  client.user.setStatus("dnd") // online/offline/dnd/invisible/idle
  console.log(chalk.bgGreen.black(`System Ready (${settings.version})\nSystem Ready (${settings.version})`));
};
