const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    let newlevel = Math.floor(row.level*1)
    let newtickt = Math.floor(row.tickets*1)
    let newcbyte = Math.floor(row.chatBits*1)
    sql.run(`UPDATE scores SET level = "${newlevel}" WHERE userId = "${person.id}"`)
    sql.run(`UPDATE scores SET tickets = "${newtickt}" WHERE userId = "${person.id}"`)
    sql.run(`UPDATE scores SET chatBits = "${newcbyte}" WHERE userId = "${person.id}"`)
    message.reply(`${person}'s Data has been updated.'`)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fix', 'round'],
  permLevel: 2
};

exports.help = {
  name: 'fixlvl',
  description: 'Invokes mathematical monkeys to fix broken levels. PermLVL 2.',
  usage: 'fixlvl [@user]'
};
