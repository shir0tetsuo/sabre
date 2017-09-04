//var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first()
  sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
    sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 0, 'NULL']);
  })
    sql.run(`UPDATE warning SET times = 0 WHERE userid = "${person.id}"`)
    sql.run(`UPDATE warning SET date = "NULL" WHERE userid = "${person.id}"`)
    message.channel.send(`${person} had their warnings reset.`)
    return;
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uw', 'clear'],
  permLevel: 2
};

exports.help = {
  name: 'unwarn',
  description: 'Throws someone\'s warnings out the window.',
  usage: 'unwarn [@user]'
};
