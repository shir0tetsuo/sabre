// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
const Tran = require('../sys/TRANSACTIONS.js')

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.spaceA*1 >= 5) {
      var person = message.mentions.members.first();
      var RandomTk = Math.floor(Math.random() * (1500000 - 30000) + 30000)
      if (!person || person === undefined || person === null) {
        message.channel.send(`OOOOOH! WOOOOAAAAAAAH! HELLOOOO! Here's ${RandomTk} Sabre Tickets! (-2 :pound:) ${message.author}!`)
        Tran(message, "hdtk", -5)
        Tran(message, "tk", RandomTk)

      } else {
        Tran(message, "hdtk", 5, person)
        Tran(message, "hdtk", -5)
        message.channel.send(`${person} was given 5 DARK TICKETS! :pound:`)
      }
    } else {
      return message.reply(`\`ERROR\` You need 5 Dark Tickets.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['spk', 'spook'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'spooky',
  description: 'Give or Spend Dark Tickets for Sabre Tickets (HDTK5)',
  usage: 'spooky [@user]'
};
