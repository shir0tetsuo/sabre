const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  sql.run(`DELETE FROM hyperlevels WHERE userId = "${message.author.id}"`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['debhlvl'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'debughlvl',
  description: 'Deletes bugged entries.',
  usage: 'debughlvl\nWarning :: This deletes extra SQL entries for your user.'
};
