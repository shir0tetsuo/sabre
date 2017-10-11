const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
exports.run = (client, message, params) => {
  if (params[0] === "ticket" || params[0] === "t" || params[0] === "tickets" || params[0] === "byte" || params[0] === "b" || params[0] === "bytes") {
    if (params[1] === undefined) return message.reply("You must specify an amount!")
    let betfloor = Math.floor(Math.random() * 100)
    if (params[0] === "ticket" || params[0] === "tickets" || params[0] === "t") {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (params[1] <= row.tickets) {
          if (params[1] > 1000000) {
            return message.reply(`\`ERROR\` Cannot coin over 1 Million Tickets`)
          }
          if (betfloor >= 50) {
            let newcount = row.tickets*1 + params[1]*1
            message.reply("`Super!` You **gained** " + params[1] + curren + "!")
            setTimeout(() => {
              sql.run(`UPDATE scores SET tickets = ${newcount} WHERE userId = "${message.author.id}"`)
            }, 2000)
          } else {
            let newcount = row.tickets*1 - params[1]*1
            message.reply("`Ouchh!` You **lost** " + params[1] + curren + "!")
            setTimeout(() => {
              sql.run(`UPDATE scores SET tickets = ${newcount} WHERE userId = "${message.author.id}"`)
            })
          }
        } else return message.reply(`You don't have enough ${curren}!`)
      })
    } else if (params[0] === "byte" || params[0] === "bytes" || params[0] === "b") {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (params[1] <= row.chatBits) {
          if (params[1] > 1500000) {
            return message.reply(`\`ERROR\` Cannot coin over 1.5 Million Bytes`)
          }
          if (betfloor >= 50) {
            let newcount = row.chatBits*1 + params[1]*1
            message.reply("`Epic!` You **gained** " + params[1] + chatBit + "!")
            setTimeout(() => {
              sql.run(`UPDATE scores SET chatBits = ${newcount} WHERE userId = "${message.author.id}"`)
            }, 2000)
          } else {
            let newcount = row.chatBits*1 - params[1]*1
            message.reply("`Snap!` You **lost** " + params[1] + chatBit + "!")
            setTimeout(() => {
              sql.run(`UPDATE scores SET chatBits = ${newcount} WHERE userId = "${message.author.id}"`)
            }, 2000)
          }
        } else return message.reply(`You don't have enough ${chatBit}!`)
      })
    }
  } else {
    message.reply("The argument was not understood!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['flip', 'coinflip'],
  permLevel: 0
};

exports.help = {
  name: 'coin',
  description: 'Flip a Coin! Bet some Tickets or Bytes!',
  usage: 'coin [tickets/bytes/t/b] <amount>'
};
