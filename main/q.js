const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  console.log(client.user)
  let person = message.mentions.members.first();
  if (person === undefined) return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels', 'lvl', 'rank'],
  permLevel: 0
};

exports.help = {
  name: 'q',
  description: 'Talk to Sabre.',
  usage: 'q [stuff]'
};
