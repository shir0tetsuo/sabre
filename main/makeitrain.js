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
  if (message.author.id === settings.ownerid && params[1] === "set" && params[2].isInteger() === true) {
    sql.run(`UPDATE makeitjacky SET tickets = "${params[2]}" WHERE place = "here"`)
    message.reply(`Jackpot updated (${params[2]} ${curren})`)
  }
  let person = message.mentions.members.first()
  if (person === undefined) return message.reply("No user was @mentioned!")
  if (person.id === message.author.id) return message.reply("You can't buy yourself a ticket! Ironic right?")
  var winner = Math.random()
  console.log(new Date())
  console.log(chalk.blueBright(message.guild.name, message.channel.name))
  console.log(chalk.bgMagenta.black(message.member.displayName, "put tickets into the pile. Floor:", Math.floor(winner*100)))
  if (winner < 0.03) {
    console.log(chalk.greenBright(`JACKPOT: ${message.guild.name} ${message.channel.name}`))
    sql.get(`SELECT * FROM makeitjacky WHERE place = "here"`).then(jackpot => {
      message.channel.send(`${person} won a pile of ${jackpot.tickets}${curren}!!!!! It's his lucky day!`)
      sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
        sql.run(`SELECT * FROM scores SET tickets = ${row.tickets*1 + jackpot.tickets} WHERE userId = "${person.id}"`)
      })
    }).then(row => {
      sql.run(`UPDATE makeitjacky SET tickets = 500 WHERE place = "here"`)
    })
  } else {
    sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
      if (row.tickets >= 5) {
        sql.get(`SELECT * FROM makeitjacky WHERE place = "here"`).then(jackpot => {
          var pile = jackpot.tickets*1 + 5
          message.reply(`Put 5${curren} into the prize pile. The pile is ${pile}${curren} high! Ain't that fancy?`)
          scoreDownTicket(message, 5)
          sql.run(`UPDATE makeitjacky SET tickets = ${pile} WHERE place = "here"`)
        })
      } else return message.reply(`You don't have enough ${curren}!`)
    })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mir', 'lotto'],
  permLevel: 0
};

exports.help = {
  name: 'makeitrain',
  description: 'Stack of Tickets! Buy someone a Lottery Ticket!',
  usage: 'makeitrain [@user]\nUpdate Pile (PL4O) :: makeitrain set (integer)'
};
