// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function TimerDelay(person) {
  setTimeout(() => {
    sql.run(`UPDATE stfu SET bit = "0" WHERE userId = "${person.id}"`)
  }, 1800000)
}

exports.run = (client, message, params) => {
  if (message.mentions.members.first() !== undefined && message.mentions.members.first() !== null) {
    if (message.author.id !== settings.ownerid && message.author.id !== settings.starid && message.author.id !== settings.mimyid) return message.channel.send(`Ohhh, Sorry! This is one of those... Special commands that require authorization. Nice try.`)
    var person = message.mentions.members.first()
    if (params[0] === 'undo') {
      sql.run(`SELECT * FROM stfu WHERE userId = "${person.id}"`).then(shh => {
        if (!shh) return;
        setTimeout(() => {
          sql.run(`UPDATE stfu SET bit = "0" WHERE userId = "${person.id}"`)
          message.reply(`${person} was unsilenced.`)
        }, 2000)
      })
    }
    sql.get(`SELECT * FROM stfu WHERE userId = "${person.id}"`).then(shh => {
      if (!shh) {
        sql.run(`INSERT INTO stfu (userId, bit) VALUES (?, ?)`, [person.id, 1]).then(() => {
          TimerDelay(person)
        })
      } else {
        sql.run(`UPDATE stfu SET bit = "1" WHERE userId = "${person.id}"`).then(() => {
          TimerDelay(person)
        })
      }
    }).catch(() => {
      sql.run(`CREATE TABLE IF NOT EXISTS stfu (userId TEXT, bit INTEGER)`).then(() => {
        sql.run(`INSERT INTO stfu (userId, bit)`, [person.id, 1]).then(() => {
          TimerDelay(person)
        })
      })
    })
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['shush'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'stfu',
  description: 'User has been naughty. Obfuscates all text for half an hour.',
  usage: 'stfu (undo) [user]'
};
