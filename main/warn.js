var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person=message.mentions.members.first()
  exec('/root/NC/utils/NorthStar/sabre.discord.js/sys/printdate.s',
    function(error, stdout, stderr) {
      let grabdate = stdout
    })
  sql.get(`SELECT * FROM warning WHERE userId ="${person.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 1, grabdate])
    } else {
        if (grabdate === row.date) {
          sql.run(`UPDATE warning SET times = ${row.times*1 + 1} WHERE userid = "${person.id}"`)
          if (row.times*1+1 >= 4) {
            mess.reply(`Warnings Exceeded!!! ${person} had too many warnings!`)
          }
        } else {
          sql.run(`UPDATE warning SET times = 1 WHERE userid = "${person.id}"`)
          sql.run(`UPDATE warning SET date = "${grabdate}" WHERE userid = "${person.id}"`)
        }
    } // if the row does not exist
  }).catch(() => {
    console.error;
    console.log(chalk.redBright("The system recovered from an error."))
    sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
      sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [message.author.id, 0, "Sun Aug 26"]);

  })
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warning'],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Warns A user they are doing something wrong. 3 Warnings. PermLVL 2.',
  usage: 'warn [mention] [description]'
};
