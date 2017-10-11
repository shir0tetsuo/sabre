const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  if (hou >= 18) {
    message.reply(`Evening!`)
  } else if (hou >= 12) {
    message.reply(`Afternoon!`)
  } else if (hou >= 7) {
    message.reply(`Morning!`)
  } else if (hou >= 0) {
    message.reply(`Night!`)
  }
};
// NOTE: This can be implemented for using time of day with intervals

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tod'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'timeofday',
  description: '',
  usage: ''
};
