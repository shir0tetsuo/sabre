const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
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

exports.run = (client, message, params) => {
  var blammo = [ { text: "BLAMMO!" }, { text: "WHAMMY-WHAMMED!" }, { text: "BOMBBOOZLED!" }, { text: "OHHH, NOOOOO!" }, { text: "POP goes the DYNAMITE!" } ]
  var blammo = blammo[Math.floor(Math.random() * blammo.length)]
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    let chancefloor = Math.floor(Math.random() * 100) // >17%
    if (chancefloor > 16) {
      let prize = Math.floor(row.tickets/14) + 15
      let newbit = Math.floor(row.chatBits/10)
      scoreUpTicket(message, prize)
      scoreUpBits(message, newbit)
      let winlose = "**gained**"
      var condColor = 0x36B236
      let condMessage = "Take a breather. You got through this round."
    } else {
      let prize = Math.floor(row.tickets/10)
      let newbit = Math.floor(row.chatBits/20)
      scoreDownTicket(message, prize)
      scoreDownBits(message, newbit)
      let winlose = "**lost**"
      var condColor = 0xCF4F36
      let condMessage = blammo.text
    }
      message.reply({embed: {
        color: condColor,
        timestamp: new Date(),
        description: `${message.member.displayName} pulls the trigger.`,
        author: {
          name: message.member.displayName,
          icon_url: message.author.avatarURL
        },
        fields: [
          {
            name: "CLICK!",
            value: condMessage
          },
          {
            name: `You ${winlose} ${prize}${curren}/${newbit}${chatBit}`
          }
        ]
      }})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['russian'],
  permLevel: 0
};

exports.help = {
  name: 'roulette',
  description: 'Play a Game of Russian Roulette.',
  usage: 'roulette'
};
