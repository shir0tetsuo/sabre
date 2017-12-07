// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  let seeRole = message.guild.roles.find("name", "O_O");
  if (!seeRole || seeRole === undefined) return;
  if(message.member.roles.has(seeRole.id)) {
    message.member.removeRole(seeRole).catch(console.error);
  } else {
    message.member.addRole(seeRole).catch(console.error);
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['s'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'see',
  description: 'Enables or Disables O_O Role',
  usage: 'see'
};
