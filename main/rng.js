const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function generateRandomness(xlen) {
  if (!xlen) var xlen = 8
    var charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

exports.run = (client, message, params) => {
  if (Number.isInteger(params[0]*1) !== true && params[0] !== undefined) return message.reply(`That's not a number!`)
  if (params[0] > 1950) return message.reply(`Too long! Woah! Keep it under 1950 Characters plz.`)
  message.channel.send(`**Generating Randomness!**\n\`${generateRandomness(params[0])}\``)
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
  usage: 'rng [integer]'
};
