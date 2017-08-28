const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
exports.run = (client, message, params) => {
  if (params[0] === "ticket" || params[0] === "tickets" || params[0] === "byte" || params[0] === "bytes") {
    if (params[1] === undefined) return message.reply("You must specify an amount!")
    let betfloor = Math.floor(Math.random() * 100)
    if (params[0] === "ticket" || params[0] === "tickets") {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (params[1] <= row.tickets) {
          if (betfloor >= 50) {
            message.reply("`Super!` You **gained** " + params[1] + curren + "!")
            sql.run(`UPDATE scores SET tickets = "${row.tickets*1 + param[1]*1}" WHERE userId = "${message.author.id}"`)
          } else {
            message.reply("`Ouchh!` You **lost** " + params[1] + curren + "!")
            sql.run(`UPDATE scores SET tickets = "${row.tickets*1 - param[1]*1}" WHERE userId = "${message.author.id}"`)
          }
        } else return message.reply(`You don't have enough ${curren}!`)
      })
    } else if (params[0] === "byte" || params[0] === "bytes") {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (params[1] <= row.chatBits) {
          if (betfloor >= 50) {
            message.reply("`Epic!` You **gained** " + params[1] + chatBit + "!")
            sql.run(`UPDATE scores SET chatBits = "${row.chatBits*1 + params[1]*1}" WHERE userId = "${message.author.id}"`)
          } else {
            message.reply("`Snap!` You **lost** " + params[1] + chatBit + "!")
            sql.run(`UPDATE scores SET chatBits = "${row.chatBits*1 - params[1]*1} WHERE userId = "${message.author.id}"`)
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
  permLevel: 1
};

exports.help = {
  name: 'coin',
  description: 'Displays the mentioned object as a snowflake. PermLVL 1.',
  usage: 'coin [tickets/bytes] <amount>'
};
