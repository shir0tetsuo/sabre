const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering ticket score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
  })
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering byte score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) {
      return message.reply(`\`ERROR\` You don't have a level.`)
    }
    if (row.level > 9001) {
      message.reply(`${message.author}\n\`\`\`markdown\n[+1 Hyperlevel]: You have been prestiged.\`\`\``)
      setTimeout(() => {
        sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
          if (!hl) {
            sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [message.author.id, 1, 0, 0]);
          }
          sql.run(`UPDATE hyperlevels SET hlvl = "${hl.hlvl*1 + 1}"`)
        }).catch(() => {
          console.error;
          console.log(chalk.redBright("!!! The system recovered from an error (database creation for hyperlevels)"))
          sql.run("CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)").then(() => {
            sql.run("INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, 0])
          })
        })
        sql.run(`UPDATE scores SET level = "10" WHERE userId = "${message.author.id}"`)
      }, 2000)
      return;
    } else {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
        if (!hl) {
          return message.reply(`\`ERROR\` You are not prestiged.`)
        } else {
          return message.reply(`\`\`\`markdown\n[Hyperlevel]: ${hl.hlvl}\`\`\``)
        }
      })
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hlvl'],
  permLevel: 0
};
// NOTE: Add to seed and exam and leaderboard
// NOTE: ADD BANK and FIX SHRIMP and FIX DUCK and FIX ROULETTE CAUSE IT DEDUCTS TOO MUCH
/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'hyperlevel',
  description: 'Users with a level over 9000 can earn prestige levels.',
  usage: 'hyperlevel'
};