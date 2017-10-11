var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person=message.mentions.members.first()
  if (params[1] === "unwarn") {
    sql.run(`UPDATE warning SET times = 0 WHERE userid = "${person.id}"`)
    sql.run(`UPDATE warning SET date = "NULL" WHERE userid = "${person.id}"`)
    message.channel.send(`${person} had their warnings reset.`)
    return;
  }
  if (params[1] === undefined) return message.reply("No Warning Statement!")
  //console.log(person.id)
  let msg = message
  exec('/root/NC/utils/NorthStar/sabre.discord.js/sys/printdate.s',
    function(error, stdout, stderr) {
      let grabdate = stdout
      sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
        sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 2, grabdate]);
      }) // Create a new entry for the persons ID if no warnings were given
      sql.get(`SELECT * FROM warning WHERE userId ="${person.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 2, grabdate]) //same as above
          let actual = row.times*1 + 2
          message.delete()
          msg.channel.send(msg.content.substring(2,128) + " - ``You have " + actual + " Warnings! Warned by `` " + msg.author)
        } else {
          //console.log(row.userid, row.times, row.date)
            if (grabdate === row.date) {
              sql.run(`UPDATE warning SET times = ${row.times*1 + 2} WHERE userid = "${person.id}"`)
              let actual = row.times*1 + 2
              message.delete()
              msg.channel.send(msg.content.substring(2,128) + " - ``You have " + actual + " Warnings! Warned by `` " + msg.author)
              if (row.times >= 3) {
                msg.channel.send("``Warnings Exceeded!!! ``" + person + " `` had too many warnings today!``")
              }
              //message.channel.send(`${person} has ${row.times} warnings`)
            } else { // let actual be 1 because it's a new day
              sql.run(`UPDATE warning SET times = 2 WHERE userid = "${person.id}"`)
              sql.run(`UPDATE warning SET date = "${grabdate}" WHERE userid = "${person.id}"`)
              let actual = 2
              message.delete()
              msg.channel.send(msg.content.substring(2,128) + " - ``You have " + actual + " Warnings! Warned by `` " + msg.author)
              }
        } // if the row does not exist
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("The system recovered from an error."))
        sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
          sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [person.id, 2, grabdate]);
          let actual = 2
          message.delete()
          msg.channel.send(msg.content.substring(2,128) + " - ``You have " + actual + " Warnings! Warned by `` " + msg.author)
      })
      console.log("Successfully recovered from an error. (A new entry was probably made.)")
    })
  }) //end exec

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['suwarn'],
  permLevel: 2
};

exports.help = {
  name: 'superwarn',
  description: 'Warns A user they are doing something wrong.',
  usage: 'superwarn [@user] [description/unwarn]'
};
