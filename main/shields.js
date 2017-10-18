// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (params[2] !== undefined && params[3] === undefined) {
    var link = `https://img.shields.io/badge/${params[0]}-${params[1]}-${params[2]}.png`
    msg = message;
    message.delete()
    msg.channel.send(`${link}\n\`${msg.author.username}#${msg.author.discriminator}\``)
  } else {
    message.reply(`\`ERROR!\` Invalid Format! Try \`some%20words something 66AC666\``)
  }
};
// if Number.isInteger(num) === true
/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['shl'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'shields',
  description: 'Make a shield thing.',
  usage: 'shields [something%20here] [something%20there] [HTMLColor(#000000)]'
};
