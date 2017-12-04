// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  var post = `\`\`\`diff\n`
  post += `- ${settings.prefix}stfu (undo) [mention]\n`
  post += `-- Obfuscates user input for 30 minutes.\n\n`
  post += `- ${settings.prefix}exfiliate [mention] (reason)\n`
  post += `-- Harsh Banhammer.\n\n`
  post += `+ DIVINE INTERVENTION tools require AUTHORIZATION and AUTHENTICATION.`
  post += `\`\`\``
  message.channel.send(`${post}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dtools'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'divinetools',
  description: 'Lists available DIVINE INTERVENTION tools.',
  usage: 'divinetools'
};
