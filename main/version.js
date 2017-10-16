const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  message.reply(`Current Sabre Build: v${settings.version}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['v'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'version',
  description: 'Displays the current Sabre version.',
  usage: 'version\nAlpha :: A (Everything should work)\nBeta :: B (May have bugs but is stable)\nExperimental :: C (Version number may not increment, developer build)\nDelta :: D (Known bugs, developer build)\nEnd-of-Line :: E (Final support for this version)\nQEU :: Quest Engine Update'
};
