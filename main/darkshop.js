// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) return message.reply(`\`ERROR\` Cannot find hyperlevel data.`)
    var AvailableKeys = '';
    if (hl.spaceA*1 >= 20) {
      AvailableKeys += `20 :key2: \`3,000,000 Sabre Tickets\``
    }
    if (hl.spaceA*1 >= 10) {
      AvailableKeys += `10 :key2: \`1,250,000 Sabre Tickets\``
    }
    if (hl.spaceA*1 >= 5) {
      AvailableKeys += `5 :key2: \`500,000 Sabre Tickets\``
    }
    if (hl.spaceA*1 >= 1) {
      AvailableKeys += `1 :key2: \`240,000 Sabre Tickets\``
    }
    if (hl.spaceA*1 === 0) {
      AvailableKeys += `You don't have any keys.`
    }
    message.channel.send(`${AvailableKeys}`)
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['dshop', 'hshop'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'darkshop',
  description: 'Coming Soon. (HL1)',
  usage: 'darkshop'
};
