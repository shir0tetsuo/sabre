const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  if (params[1] === undefined) return message.reply("No Value Specified!")
  const permlvl = client.elevation(message)
  if (params[1]*1 < 1 && permlvl !== 4) return message.reply(`\`You are not allowed to take tickets!\``)
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (params[1] <= row.tickets) {
      sql.run(`UPDATE scores SET tickets = "${row.tickets - params[1]*1}" WHERE userId = "${message.author.id}"`)
      sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(secondrow => {
        sql.run(`UPDATE scores SET tickets = "${secondrow.tickets*1 + params[1]*1}" WHERE userId = "${person.id}"`)
        message.reply("`SUCCESS!` " + `${params[1]} was given to ${person}; You have ${row.tickets*1 - params[1]*1}${curren} Remaining!`)
      }).catch(() => { // Error message generates new table instead
        console.error;
        console.log(chalk.redBright("The system recovered from an error during giveTicket."))
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [person.id, params[1], 0, 1]);
        })
      })
    } else {
      message.reply("You don't have enough!")
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['giveTicket', 'giveticket', 'givetk', 'giveTickets'],
  permLevel: 1
};

exports.help = {
  name: 'givetickets',
  description: 'Give away some Tickets!',
  usage: 'givetickets [@user] <number>'
};
