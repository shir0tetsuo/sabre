const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
let curren = ":tickets:"

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}

exports.run = (client, message, params) => {
  var rpsmat = [ { ans: "rock" }, { ans: "paper" }, { ans: "scissors" } ];
  var rpsmat = rpsmat[Math.floor(Math.random() * rpsmat.length)];
  if (params[0] === null) return message.reply("Need `rock / paper / scissors`!");
  let rpsinput = params[0]
  let botwin = "Ha! I won against you with "
  let botlose = "Ouch! I lost because I had "
  let wintk = ", You gained 5" + curren
  if (rpsinput === "rock" || rpsinput === "paper" || rpsinput === "scissors") {
    if (rpsinput === rpsmat.ans) {
      message.reply(rpsmat.ans + " was also my answer!")
    } else if (rpsinput === "rock" && rpsmat.ans === "paper") {
      message.reply(botwin + rpsmat.ans)
    } else if (rpsinput === "rock" && rpsmat.ans === "scissors") {
      message.reply(botlose + rpsmat.ans + wintk)
            scoreUpTicket(message, 200)
    } else if (rpsinput === "paper" && rpsmat.ans === "rock") {
      message.reply(botlose + rpsmat.ans + wintk)
            scoreUpTicket(message, 200)
    } else if (rpsinput === "paper" && rpsmat.ans === "scissors") {
      message.reply(botwin + rpsmat.ans)
    } else if (rpsinput === "scissors" && rpsmat.ans === "paper") {
      message.reply(botlose + rpsmat.ans + wintk)
            scoreUpTicket(message, 200)
    } else if (rpsinput === "scissors" && rpsmat.ans === "rock") {
      message.reply(botwin + rpsmat.ans)
    }
  } else {
    message.reply("The argument was not understood!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rps'],
  permLevel: 1
};

exports.help = {
  name: 'botrps',
  description: 'Play Rock Paper Scissors against the Bot.',
  usage: 'botrps <rock/paper/scissors>'
};
