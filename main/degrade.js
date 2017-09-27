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
function colorCalc(int) {
  if (int >= 90) return 0xcd3b00
  if (int >= 60) return 0xaa9e04
  if (int >= 25) return 0xfff500
  if (int >= 0) return 0xa7f516
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (row.level >= 12 && row.tickets >= 1000) {
      let output = `${message.member.displayName} ran the **D E G R A D E** Command...\n`;
      let dgchance = Math.floor(Math.random() * 100)
      let thePercent = (100 - dgchance*1)
      output += `You are the ${thePercent}%.\n`
      embedColor = colorCalc(dgchance);
      message.channel.send({ embed: {
        color: embedColor,
        timestamp: new Date(),
        author: {
          name: message.author.displayName,
          icon_url: message.author.avatarURL
        },
        description: output,
        fields: [
          {
            name: `Something.`,
            value: `Something.`
          }
        ]
      }})
      setTimeout(() => {
        scoreDownTicket(message, 1000)
      }, 2000)
    } else {
      return message.reply("You don't have enough tickets or you are not Level 12!")
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['dgrd'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'degrade',
  description: 'Like Russian Roulette, but more intense! (SL12)(1000TK)',
  usage: 'degrade'
};
