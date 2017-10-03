const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  // Everything that happens
  msg = message
  if (message.guild.id !== settings.alaskaguild) return;
  message.delete()
  msg.channel.send("Server Startup! https://www.roblox.com/games/318692041/Anchorage-Alaska")
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['start', 'ssu'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'startup',
  description: 'Displays Alaska server Startup Message.',
  usage: 'startup'
};
