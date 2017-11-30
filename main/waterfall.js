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

function DropNumber() {
  return Math.floor(Math.random() * 12)
}

//const Integer = [
//  ':a:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':regional_indicator_j:', ':regional_indicator_q:', ':regional_indicator_k:'
//]
const CType = [
  ':hearts:', ':spades:', ':clubs:', ':diamonds:'
]

function SolveEquiv(val) {
  if (val == 0) {
    return `:a:${Rand(CType)}`
  } else if (val == 1) {
    return `:two:${Rand(CType)}`
  } else if (val == 2) {
    return `:three:${Rand(CType)}`
  } else if (val == 3) {
    return `:four:${Rand(CType)}`
  } else if (val == 4) {
    return `:five:${Rand(CType)}`
  } else if (val == 5) {
    return `:six:${Rand(CType)}`
  } else if (val == 6) {
    return `:seven:${Rand(CType)}`
  } else if (val == 7) {
    return `:eight:${Rand(CType)}`
  } else if (val == 8) {
    return `:nine:${Rand(CType)}`
  } else if (val == 9) {
    return `:regional_indicator_j:${Rand(CType)}`
  } else if (val == 10) {
    return `:regional_indicator_q:${Rand(CType)}`
  } else if (val == 11) {
    return `:regional_indicator_k:${Rand(CType)}`
  } else {
    return `:regional_indicator_k:${Rand(CType)}`
  }
}

function newCards(message, cardAdata, cardA, cardBdata, cardB, cardCdata, cardC, cardDdata, cardD, cardEdata, cardE) {
  var ncout = ``;
  ncout += `\n${cardA} \`<<\`\n`
  ncout += `${cardB}\n`
  ncout += `${cardC}\n`
  ncout += `${cardD}\n`
  ncout += `${cardE}\n`
  message.reply(`you have started a **New Game**.${ncout}`)
}

function showCards(message, game) {

  var printC = ``;

  if (game.userCard === '0') {
    printC += `\n${game.cardA} \`<<\`\n`
  } else {
    printC += `\n${game.cardA}\n`
  }

  if (game.userCard === '1') {
    printC += `${game.cardB} \`<<\`\n`
  } else {
    printC += `${game.cardB}\n`
  }

  if (game.userCard === '2') {
    printC += `${game.cardC} \`<<\`\n`
  } else {
    printC += `${game.cardC}\n`
  }

  if (game.userCard === '3') {
    printC += `${game.cardD} \`<<\`\n`
  } else {
    printC += `${game.cardD}\n`
  }

  if (game.userCard === '4') {
    printC += `${game.cardE} \`<<\``
  } else {
    printC += `${game.cardE}\n`
  }

  message.reply(`Here are your cards. ${printC}\n\`Turn: ${game.userScore}\`\n\`Card: ${game.userCard*1 + 1}\`\n\nTo continue, use \`${settings.prefix}waterfall [higher/lower/hi/lo]\``)

}

exports.run = (client, message, params) => {
  /* var cA = `${Rand(Integer)}${Rand(CType)}`
  var cB = `${Rand(Integer)}${Rand(CType)}`
  var cC = `${Rand(Integer)}${Rand(CType)}`
  var cD = `${Rand(Integer)}${Rand(CType)}`
  var cE = `${Rand(Integer)}${Rand(CType)}` */
  var cAv = DropNumber()
  var cA = SolveEquiv(cAv)
  var cBv = DropNumber()
  var cB = SolveEquiv(cBv)
  var cCv = DropNumber()
  var cC = SolveEquiv(cCv)
  var cDv = DropNumber()
  var cD = SolveEquiv(cDv)
  var cEv = DropNumber()
  var cE = SolveEquiv(cEv)
  sql.get(`SELECT * FROM waterfall WHERE userId = "${message.author.id}"`).then(game => {

    // there is one spoon
    if (!game) {
      // userId = unique identifier
      // userDsp = tag
      // userHiscore = Completed in X least times
      // userScore = Increments
      // userTurnProgress = Finished a Game
      // userCard = Which card the user is on
      // cardXdata = Cards Value
      // cardX = Actual Card
      sql.run(`INSERT INTO waterfall (userId, userDsp, userHiscore, userScore, userTurnProgress, userCard, cardAdata, cardA, cardBdata, cardB, cardCdata, cardC, cardDdata, cardD, cardEdata, cardE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, message.author.tag, 100, 0, 0, 0, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE]).then(() => {
        newCards(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE)
      })

      // there are two spoons
    } else {
      showCards(message, game)
    }

  }).catch(() => {
    sql.run(`CREATE TABLE IF NOT EXISTS waterfall (userId TEXT, userDsp TEXT, userHiscore INTEGER, userScore INTEGER, userTurnProgress INTEGER, userCard INTEGER, cardAdata INTEGER, cardA TEXT, cardBdata INTEGER, cardB TEXT, cardCdata INTEGER, cardC TEXT, cardDdata INTEGER, cardD TEXT, cardEdata INTEGER, cardE TEXT)`).then(() => {
      sql.run(`INSERT INTO waterfall (userId, userDsp, userHiscore, userScore, userTurnProgress, userCard, cardAdata, cardA, cardBdata, cardB, cardCdata, cardC, cardDdata, cardD, cardEdata, cardE)`, [message.author.id, message.author.tag, 100, 0, 0, 0, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE])
    }).then(() => {
      newCards(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE)
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
