const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (params[1] === message.mentions.members.first() || params[1] === undefined) {
    return message.reply(`\`ERROR\` See Manual!`)
  }
  var sliced = params.slice(1)
  data = sliced.join(' ').substring(0, 1024)
  if (message.mentions.members.first() !== undefined) {
    person = message.mentions.members.first()
    damage = Math.floor(Math.random() * 100)
    defence = Math.floor(Math.random() * 100) + 5
    nullchance = Math.floor(Math.random() * 100)
    let output = `${person} was attacked by ${message.author}!\n`;
    if (damage >= defence) {
      output += `${message.author} attempts to **strike ${person} with ${data}!**\n`
      if (nullchance >= 92) {
        output += `...but ${message.author}'s \`attack misses!\`\n`
      } else {
        output += `\`Strike Landed!\` **${person} was damaged!**`
      }
    } else if (damage < defence) {
      output += `...but ${message.author}'s \`attack fails!\`\n`
    }
    message.channel.send(output)
  } else {
    message.reply(`\`ERROR\` A user must be mentioned!`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['attackcalculator', 'calcatk'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'atkcalc',
  description: 'Basic RPG Attack Calculator.',
  usage: 'atkcalc [@user] [attack]'
};
