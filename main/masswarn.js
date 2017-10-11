const sql = require("sqlite");
var exec = require('child_process').exec;
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
function warn(message, uid) {
  exec('/root/NC/utils/NorthStar/sabre.discord.js/sys/printdate.s',
  function(error, stdout, stderr) {
    let grabdate = stdout
    sql.get(`SELECT * FROM warning WHERE userid = "${uid}"`).then(warn => {
      if (!warn) {
        sql.run(`INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)`, [uid, 1, grabdate])
      } else {
        sql.run(`UPDATE warning SET times = ${warn.times*1 + 1} WHERE userid = "${uid}"`)
      }
    })
  })
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  if (!message.mentions.members.first() || message.mentions.members.first() === undefined) {
    return message.reply(`\`ERROR\` Nobody was mentioned!`)
  }
  var users = message.mentions.members.map(m => m.id)
  for (var i = 0; i < users.length; i++) {
    warn(message, users[i])
  }
  var usersFull = message.mentions.members.map(m => `\`Warning\` ${m}`).join('\n')
  let msg = message
  message.delete()
  msg.channel.send(`\`\`\`markdown\n[!]: Attention\`\`\`\n${usersFull}\n\n\`You have been warned for a reason. Cease immediately.\`\n${msg.author}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['massw'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'masswarn',
  description: 'Mass warn a bunch of users.',
  usage: 'masswarn (@users)'
};
