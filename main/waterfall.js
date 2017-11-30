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

//function increaseHi(message, game) {
//  sql.run(`UPDATE waterfallB SET hiScore = "${game.hiScore*1} + 1" WHERE userId = "${message.author.id}"`)
//}

function PlayGame(client, message, params, game) {
  var cardput = ``;
  var cardput = `\n${game.cardA}\n`
  cardput += `${game.cardB}\n`
  cardput += `${game.cardC}\n`
  cardput += `${game.cardD}\n`
  cardput += `${game.cardE}`
  message.reply(`${cardput}`)
}

exports.run = (client, message, params) => {
  var cA = `${Rand(Integer)}${Rand(CType)}`
  var cB = `${Rand(Integer)}${Rand(CType)}`
  var cC = `${Rand(Integer)}${Rand(CType)}`
  var cD = `${Rand(Integer)}${Rand(CType)}`
  var cE = `${Rand(Integer)}${Rand(CType)}`
  sql.get(`SELECT * FROM waterf WHERE userId = "${message.author.id}"`).then(gm => {
    if (!gm) {
      console.log(chalk.redBright(`Populating tables ${cardA} ${cardB} ${cardC} ${cardD} ${cardE}`))
      sql.run(`INSERT INTO waterf (userId, userDsp, userTurn, userHiscore, cardA, cardB, cardC, cardD, cardE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, message.author.tag, 0, 100, cA, cB, cC, cD, cE])
      .then(() => {
        PlayGame(client, message, params, gm)
      })
    } else {
      console.log(chalk.redBright(`Continuing match ${cardA} ${cardB} ${cardC} ${cardD} ${cardE}`))
      PlayGame(client, message, params, gm)
    }
  }).catch(() => {
    console.error;
    sql.run(`CREATE TABLE IF NOT EXISTS waterf (userId TEXT, userDsp TEXT, userTurn INTEGER, userHiscore INTEGER, cardA TEXT, cardB TEXT, cardC TEXT, cardD TEXT, cardE TEXT)`).then(() => {
      console.log(chalk.greenBright(`waterf CREATED: Populated ${message.author.id} ${message.author.tag} 0 100 ${cA} ${cB} ${cC} ${cD} ${cE}`))
      sql.run(`INSERT INTO waterf (userId, userDsp, userTurn, userHiscore, cardA, cardB, cardC, cardD, cardE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, message.author.tag, 0, 100, cA, cB, cC, cD, cE])
    }).then(() => {
      PlayGame(client, message, params, gm)
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
