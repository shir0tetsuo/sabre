const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (params[0] === message.mentions.members.first()) {
    let person === message.mentions.members.first();
    let pLen === params[0].length + 1;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels', 'lvl', 'rank'],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: 'Talk to Sabre.',
  usage: 'q [stuff]'
};
