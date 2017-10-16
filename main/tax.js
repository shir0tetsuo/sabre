// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  if (message.author.id !== settings.ownerid) {
    return message.reply(`\`FATAL\` You are not the owner!`)
  } else {
    sql.run(`UPDATE scores SET tickets = "${params[0]}"`)
    message.reply(`\`WARNING\` Everyone's tickets were updated to ${params[0]}.`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tax'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'tax',
  description: 'Fix a big mistake. OWNER ONLY!',
  usage: 'tax [newseed]'
};
