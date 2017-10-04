const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  msg = message;
  message.delete()
  msg.channel.send(`\`${msg.member.displayName}\` ${msg.params.join(' ')}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['m'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'messg',
  description: 'Allows user to speak as Sabre.',
  usage: 'messg [message]'
};
