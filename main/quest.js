// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function getKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 - keys*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.spaceA*1 >= 1) {
      message.reply(`Spent 1 :key2:`)
      getKey(message, 1);
    } else {
      return message.reply(`\`ERROR\` You don't have any keys.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['q'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'quest',
  description: 'Let Sabre\'s Forest take you away. (HK1)',
  usage: 'quest'
};
