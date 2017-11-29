// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

const Integer = [
  ':a:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':regional_indicator_j:', ':regional_indicator_q:', ':regional_indicator_k:'
]
const CType = [
  ':hearts:', ':spades:', ':clubs:', ':diamonds:'
]

function Play(cl, ms, pr, game) {
  var cardput = `${game.cardA}\n`
  cardput += `${game.cardB}\n`
  cardput += `${game.cardC}\n`
  cardput += `${game.cardD}\n`
  cardput += `${game.cardE}`
  ms.reply(`${cardput}`)
}

exports.run = (client, message, params) => {
  var cA = `${Rand(Integer)}${Rand(CType)}`
  var cB = `${Rand(Integer)}${Rand(CType)}`
  var cC = `${Rand(Integer)}${Rand(CType)}`
  var cD = `${Rand(Integer)}${Rand(CType)}`
  var cE = `${Rand(Integer)}${Rand(CType)}`
  sql.get(`SELECT * FROM waterfall WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) { // there is one spoon
      console.log(`CREATED New Waterfall Table ${message.guild.name} ${message.channel.name} ${message.author.tag}`)
      sql.run(`INSERT INTO waterfall (userId, tag, cardA, cardB, cardC, cardD, cardE, hiScore, turn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, message.author.tag, cA, cB, cC, cD, cE, 100, 0])
      .then(() => {
        sql.get(`SELECT * FROM waterfall WHERE userId = "${message.author.id}"`).then(row => {
          Play(client, message, params, row)
        })
      })
    } else { // there are two spoons
      Play(client, message, params, row)
    }
  }).catch(() => { // there is no spoon
    console.error;
    console.log(`NEW DB WATERFALL ADDED SUCCESSFULLY`)
    sql.run(`CREATE TABLE IF NOT EXISTS waterfall (userId TEXT, tag TEXT, cardA TEXT, cardB TEXT, cardC TEXT, cardD TEXT, cardE TEXT, hiScore INTEGER, turn INTEGER)`).then(() => {
      sql.run(`INSERT INTO waterfall (userId, tag, cardA, cardB, cardC, cardD, cardE, hiScore, turn)`, [message.author.id, message.author.tag, cA, cB, cC, cD, cE, 100, 0])
    }).then(() => {
      Play(client, message, params, row)
    })
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wf'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'waterfall',
  description: 'Card Game!',
  usage: 'waterfall [higher/lower/hi/lo/score]'
};
