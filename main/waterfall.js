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

function increaseHi(message, game) {
  sql.run(`UPDATE waterfallB SET hiScore = "${game.hiScore*1} + 1" WHERE userId = "${message.author.id}"`)
}

function Play(cl, ms, pr, game) {
  var cardput = ``;
  /* var cardput = `\n${game.cardA}\n`
  cardput += `${game.cardB}\n`
  cardput += `${game.cardC}\n`
  cardput += `${game.cardD}\n`
  cardput += `${game.cardE}`
  ms.reply(`${cardput}`) */
  if (game.turn === '0') {
    cardput = `${game.cardA} \`<<\`\n`
  } else {
    cardput = `${game.cardA}\n`
  }
  if (game.turn === '1') {
    cardput = `${game.cardB} \`<<\`\n`
  } else {
    cardput = `${game.cardB}\n`
  }
  if (game.turn === '2') {
    cardput = `${game.cardC} \`<<\`\n`
  } else {
    cardput = `${game.cardC}\n`
  }
  if (game.turn === '3') {
    cardput = `${game.cardD} \`<<\`\n`
  } else {
    cardput = `${game.cardD}\n`
  }
  if (game.turn === '4') {
    cardput = `${game.cardE} \`<<\`\n`
  } else {
    cardput = `${game.cardE}\n`
  }

  ms.reply(`${cardput}\n**${message.member.displayName}**, turn: \`0${game.drink}\``)

  //increaseHi(ms, game)
}
// objective to get least drinks as possible

exports.run = (client, message, params) => {
  var cA = `${Rand(Integer)}${Rand(CType)}`
  var cB = `${Rand(Integer)}${Rand(CType)}`
  var cC = `${Rand(Integer)}${Rand(CType)}`
  var cD = `${Rand(Integer)}${Rand(CType)}`
  var cE = `${Rand(Integer)}${Rand(CType)}`
  sql.get(`SELECT * FROM waterfallB WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) { // there is one spoon
      console.log(`CREATED New WaterfallB Table ${message.guild.name} ${message.channel.name} ${message.author.tag}`)
      sql.run(`INSERT INTO waterfallB (userId, tag, cardA, cardB, cardC, cardD, cardE, hiScore, turn, drink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, message.author.tag, cA, cB, cC, cD, cE, 100, 0, 1])
      .then(() => {
        sql.get(`SELECT * FROM waterfallB WHERE userId = "${message.author.id}"`).then(row => {
          Play(client, message, params, row)
        })
      })
    } else { // there are two spoons
      Play(client, message, params, row)
    }
  }).catch(() => { // there is no spoon
    console.error;
    console.log(`NEW DB WATERFALL ADDED SUCCESSFULLY`)
    sql.run(`CREATE TABLE IF NOT EXISTS waterfallB (userId TEXT, tag TEXT, cardA TEXT, cardB TEXT, cardC TEXT, cardD TEXT, cardE TEXT, hiScore INTEGER, turn INTEGER, drink INTEGER)`).then(() => {
      sql.run(`INSERT INTO waterfallB (userId, tag, cardA, cardB, cardC, cardD, cardE, hiScore, turn, drink)`, [message.author.id, message.author.tag, cA, cB, cC, cD, cE, 100, 0, 1])
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
