const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  if (params[1] === "hl") {
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(hl => {
        sql.run(`UPDATE hyperlevels SET hlvl = "${params[2]}" WHERE userId = "${person.id}"`)
      })
    }, 2000)
      message.reply(`Updated ${person} with HyperLevel of ${params[2]}`)
    return;
  }
  if (params[3] === undefined) return message.reply("Please see Help Menu for this command!")
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    let newlevel = params[1]
    let newtickt = params[2]
    let newcbyte = params[3]
    message.reply("Calculating...")
    setTimeout(() => {
      sql.run(`UPDATE scores SET level = "${newlevel}" WHERE userId = "${person.id}"`)
      setTimeout(() => {
        sql.run(`UPDATE scores SET tickets = "${newtickt}" WHERE userId = "${person.id}"`)
        setTimeout(() => {
          sql.run(`UPDATE scores SET chatBits = "${newcbyte}" WHERE userId = "${person.id}"`)
          message.reply(`${person}'s Data has been updated.`)
        }, 1000)
      }, 1000)
    }, 1000)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seed'],
  permLevel: 3
};

exports.help = {
  name: 'seedt',
  description: 'Allows Administrators to manually seed targets.',
  usage: 'seed [@user] <lvl> <tickets> <bytes>\nHyperlevel Seeding :: seed [@user] hl <hyperlevel>'
};
