const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.mentions.members.first() !== undefined && message.mentions.members.first() !== null) {
    message.channel.send(`:warning: ${message.content.split(1)}`)
  }
  message.channel.send(`@everyone :warning:`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'everyone',
  description: 'Tag everyone.',
  usage: 'everyone'
};
