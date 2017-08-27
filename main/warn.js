var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  if (message.mentions.members.first() < 1) return message.reply("No User Mentioned!")
  let person=message.mentions.members.first()
  if (params[1] === "unwarn") {
    sql.run(`UPDATE warning SET times = 0 WHERE userid = "${person.id}"`)
    sql.run(`UPDATE warning SET date = "NULL" WHERE userid = "${person.id}"`)
    message.channel.send(`${person} had their warnings reset.`)
    return;
  }
  if (params[1] === undefined) return message.reply("No Warning Statement!")
  //console.log(person.id)
  exec('/root/NC/utils/NorthStar/sabre.discord.js/sys/printdate.s',
    function(error, stdout, stderr) {
      let grabdate = stdout
      sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
        sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 1, grabdate]);
      }) // Create a new entry for the persons ID if no warnings were given
      sql.get(`SELECT * FROM warning WHERE userId ="${person.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 1, grabdate]) //same as above
              message.channel.send(message.content + " - ``You have " + row.times + " Warnings!``")
        } else {
          //console.log(row.userid, row.times, row.date)
            if (grabdate === row.date) {
              sql.run(`UPDATE warning SET times = ${row.times*1 + 1} WHERE userid = "${person.id}"`)
              message.channel.send(message.content + " - ``You have " + row.times + " Warnings!``")
              if (row.times >= 4) {
                message.channel.send("``Warnings Exceeded!!! " + person + " had too many warnings today!``")
              }
              //message.channel.send(`${person} has ${row.times} warnings`)
            } else {
              sql.run(`UPDATE warning SET times = 1 WHERE userid = "${person.id}"`)
              sql.run(`UPDATE warning SET date = "${grabdate}" WHERE userid = "${person.id}"`)
              message.channel.send(message.content + " - ``You have " + row.times + " Warnings!``")            }
        } // if the row does not exist
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("The system recovered from an error."))
        sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
          sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 1, grabdate]);
      })
      console.log("Successfully recovered from an error.")
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
  usage: 'warn [mention] [description/unwarn]'
};
