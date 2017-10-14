const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require('chalk');

// tk tickets
// b bytes
// qkey questkeys
// dtk darktickets
module.exports = (message, type, value) =>  {
  if (!message) return console.log(console.error, "Fatal Error: No Callback")
  if (!value) var value = 1;

  if (type === 'tk') {
    console.log(chalk.gray(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; +${value} Tickets`))
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (!row) return message.reply(`\`INTERNAL ERROR\` Transaction Failed.`)
        sql.run(`UPDATE scores SET tickets = ${row.tickets + value*1}`)
      })
    }, 2000)

  } else if (type === 'b')  {
    console.log(chalk.gray(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; +${value} Bytes`))
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (!row) return message.reply(`\`INTERNAL ERROR\` Transaction Failed.`)
        sql.run(`UPDATE scores SET chatBits = ${row.chatBits + value*1}`)
      })
    }, 2000)

  } else if (type === 'qkey') {
    console.log(chalk.blueBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; +${value} Quest Keys`))
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
        if (!hl) return message.reply(`\`INTERNAL ERROR\` Transaction Failed.`)
        sql.run(`UPDATE hyperlevels SET spaceA = ${hl.spaceA*1 + value*1}`)
      })
    }, 2000)
  } else if (type === "dtk") {
    console.log(Chalk.blueBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; +${value} Dark Tickets`))
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
        if (!hl) return message.reply(`\`INTERNAL ERROR\` Transaction Failed.`)
        sql.run(`UPDATE hyperlevels SET spaceB = ${hl.spaceB*1 + value*1}`)
      })
    }, 2000)
  }
}
