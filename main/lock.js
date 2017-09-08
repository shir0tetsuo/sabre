const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
function availLock(message) {
  sql.get(`SELECT * FROM avail WHERE userId = "${message.author.id}"`).then(row => {
    if (row.avail === 0) {
    sql.run(`UPDATE avail SET avail = "1" WHERE userId = ${message.author.id}`)
    message.reply(`\`Account Unlocked\` Users can now mention you freely.`)
    } else {
    sql.run(`UPDATE avail SET avail = "0" WHERE userId = ${message.author.id}`)
    message.reply(`\`Account Locked\` Users mentioning you will be responded with an AFK Message.`)
    }
  })
}

exports.run = (client, message, params) => {
  availLock(message)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['available'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'lock',
  description: 'Changes your account AFK Status. Users will be responded with an AFK Message.',
  usage: 'lock'
};
