const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  let randomness = Math.floor(Math.random() ^ 10)
  message.channel.send(`Generating some Randomness.\n\`${randomness}\``)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['random'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'rng',
  description: 'Invoke mathematical monkeys to fling numbers.',
  usage: 'rng'
};
