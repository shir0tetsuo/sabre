const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
function lootUpdate(mess) {
  sql.get(`SELECT * FROM loot WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE loot SET last = "${new Date().getTime()}" WHERE userId = ${mess.author.id}`)
  })
}

function lootScore(message) {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    var lootBoxTickets = Math.floor((row.tickets/5)+500)
    var lootBoxBits = Math.floor((row.chatBits/5)+700)
    if (lootBoxBits > 2000000) var lootBoxBits = 2000000
    if (lootBoxTickets > 1500000) var lootBoxTickets = 1500000
    setTimeout(() => {
      sql.run(`UPDATE scores SET tickets = "${row.tickets*1 + lootBoxTickets*1}" WHERE userId = "${message.author.id}"`)
      sql.run(`UPDATE scores SET chatBits = "${row.chatBits*1 + lootBoxBits*1}" WHERE userId = "${message.author.id}"`)
    }, 2000)
    message.channel.send(`:gem: ${message.author} Gained **${lootBoxTickets}${curren} / ${lootBoxBits}${chatBit} from Daily!!!**`)
  })
}

exports.run = (client, message, params) => {
  // may add level requirement later
  message.channel.send("Calculating!").then(m => {
    sql.get(`SELECT * FROM loot WHERE userId = "${message.author.id}"`).then(row => {
      let future = row.last*1 + 86400000
      if (new Date().getTime() >= future) {
        lootUpdate(message);
        //winnings calc through fn
        lootScore(message);
      } else if (row.last === "NULL") {
        lootUpdate(message);
        //winnings calc through fn
        lootScore(message);
      } else {
        var distance = future - new Date().getTime()
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        message.channel.send(`...${message.author} needs to wait **${hours} h ${minutes} m ${seconds} s** to use this command again!`)
      }
    })

  })

};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lootbox'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'daily',
  description: 'Get some Daily Loot.',
  usage: 'daily'
};
