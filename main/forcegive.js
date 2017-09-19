const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.mentions.members.first() !== undefined) {
    let output = '';
    let users = message.mentions.users.map(m => m.id)
    for (var i = 0; i < users.length; i++) {
      output += `ID: ${users[i]}`
    }
    message.channel.send(output)
  } else {
    message.reply(`\`ERROR\` No user defined`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fgive'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'forcegive',
  description: 'Allows administrators to force ticket/byte incrementation.',
  usage: 'forcegive [@user] [t/b] [amount]'
};
