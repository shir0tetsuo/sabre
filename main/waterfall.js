// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

function DropNumber() {
  return Math.floor(Math.random() * 12)
}

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
  //message.reply(`you have started a **New Game**.${ncout}`)
  message.channel.send({
    embed: {
      color: 0xcbc300,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      title: `Waterfall`,
      description: `Here are your cards!`,
      fields: [
        {
          name: `You started a **New Round!**`,
          value: `${ncout}`
      }
      ]
    }
  })
}

function resetGame(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE) {
  sql.get(`SELECT * FROM waterfall WHERE userId="${message.author.id}"`).then(ndata => {
    if (ndata.userScore < ndata.userHiscore) {
      setTimeout(() => {
        sql.run(`UPDATE waterfall SET userHiscore = "${ndata.userScore}" WHERE userId = "${message.author.id}"`)
      }, 2100)
    }
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET card = "0" WHERE userId = "${message.author.id}"`)
    }, 2300)
    if (ndata.userDsp !== message.author.tag) {
      setTimeout(() => {
        sql.run(`UPDATE waterfall SET userDsp = "${message.author.tag}" WHERE userId="${message.author.id}"`)
      }, 2500)
    }
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET userScore = "0" WHERE userId = "${message.author.id}"`)
    }, 2700)
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardAdata = "${cAv}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardA = "${cA}" WHERE userId = "${message.author.id}"`).then(() => {
          sql.run(`UPDATE waterfall SET cardBdata = "${cBv}" WHERE userId = "${message.author.id}"`).then(() => {
            sql.run(`UPDATE waterfall SET cardB = "${cB}" WHERE userId = "${message.author.id}"`).then(() => {
              sql.run(`UPDATE waterfall SET cardCdata = "${cCv}" WHERE userId = "${message.author.id}"`).then(() => {
                sql.run(`UPDATE waterfall SET cardC = "${cC}" WHERE userId = "${message.author.id}"`).then(() => {
                  sql.run(`UPDATE waterfall SET cardDdata = "${cDv}" WHERE userId = "${message.author.id}"`).then(() => {
                    sql.run(`UPDATE waterfall SET cardD = "${cD}" WHERE userId = "${message.author.id}"`).then(() => {
                      sql.run(`UPDATE waterfall SET cardEdata = "${cEv}" WHERE userId = "${message.author.id}"`).then(() => {
                        sql.run(`UPDATE waterfall SET cardE = "${cE}" WHERE userId = "${message.author.id}"`)
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    }, 2900)
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET userTurnProgress = "0" WHERE userId="${message.author.id}"`)
    }, 3100)
    setTimeout(() => {
      newCards(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE)
    })
  })
}

function showCards(message, game) {

  var printC = ``;
  var selectedC = ``;

  if (game.userCard * 1 == 0) {
    printC += `\n${game.cardA} \`<<\`\n`
    selectedC += `${game.cardA}`
  } else {
    printC += `\n${game.cardA}\n`
  }

  if (game.userCard * 1 == 1) {
    printC += `${game.cardB} \`<<\`\n`
    selectedC += `${game.cardB}`
  } else {
    printC += `${game.cardB}\n`
  }

  if (game.userCard * 1 == 2) {
    printC += `${game.cardC} \`<<\`\n`
    selectedC += `${game.cardC}`
  } else {
    printC += `${game.cardC}\n`
  }

  if (game.userCard * 1 == 3) {
    printC += `${game.cardD} \`<<\`\n`
    selectedC += `${game.cardD}`
  } else {
    printC += `${game.cardD}\n`
  }

  if (game.userCard * 1 == 4) {
    printC += `${game.cardE} \`<<\``
    selectedC += `${game.cardE}`
  } else {
    printC += `${game.cardE}\n`
  }

  //  message.reply(`Here are your cards. ${printC}\n\`Turn: ${game.userScore}\`\n\`Card: ${game.userCard*1 + 1}\`\n\nTo continue, use \`${settings.prefix}waterfall [higher/lower/hi/lo]\``)
  message.channel.send({
    embed: {
      color: 0x236a88,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      title: `Waterfall`,
      description: `Here are your cards!`,
      fields: [{
          name: `\u200b`,
          value: `${printC}`,
          inline: true
        },
        {
          name: `\u200b`,
          value: `\`\`\`ml\nTurn: ${game.userScore}\nCard: ${game.userCard*1 + 1}\`\`\`\n${selectedC} \`<<\``,
          inline: true
        },
        {
          name: `Next Card: \`Higher\` or \`Lower\` Value?`,
          value: `Type \`${settings.prefix}waterfall [higher/lower/hi/lo]\` to continue.`
        }
      ]
    }
  })
}

function gameOver(message, game) {
  setTimeout(() => {
    message.reply(`\`Well Played! It only took ${game.userScore} Cards to beat that round!\``)
    sql.run(`UPDATE waterfall SET userTurnProgress = "1" WHERE userId = "${message.author.id}"`)
  }, 2000)
}

function incrementPoints(message, game) {
  setTimeout(() => {
    sql.run(`UPDATE waterfall SET userScore = "${game.userScore*1 + 1}" WHERE userId = "${message.author.id}"`)
  }, 1800)
}
function incrementUserCard(message, game) {
  if (game.userCard == '4') {
    gameOver(message, game)
  } else {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET userCard = "${game.userCard*1 + 1}"`)
    }, 2000)
  }
}

function resetUserCard(message, game) {
  setTimeout(() => {
    sql.run(`UPDATE waterfall SET userCard = "0"`)
  }, 2200)
}

function swapCard(message, game, TrickCardValue, TrickCard) {
  if (game.userCard == '0') {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardAdata = "${TrickCardValue}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardA = "${TrickCard}" WHERE userId = "${message.author.id}"`)
      })
    }, 2150)
  } else if (game.userCard == '1') {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardBdata = "${TrickCardValue}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardB = "${TrickCard}" WHERE userId = "${message.author.id}"`)
      })
    }, 2150)
  } else if (game.userCard == '2') {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardCdata = "${TrickCardValue}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardC = "${TrickCard}" WHERE userId = "${message.author.id}"`)
      })
    }, 2150)
  } else if (game.userCard == '3') {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardDdata = "${TrickCardValue}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardD = "${TrickCard}" WHERE userId = "${message.author.id}"`)
      })
    }, 2150)
  } else if (game.userCard == '4') {
    setTimeout(() => {
      sql.run(`UPDATE waterfall SET cardEdata = "${TrickCardValue}" WHERE userId = "${message.author.id}"`).then(() => {
        sql.run(`UPDATE waterfall SET cardE = "${TrickCard}" WHERE userId = "${message.author.id}"`)
      })
    }, 2150)
  }
}

function chooseCards(message, guess, game) {
  if (guess === "higher" || guess === "hi") var polarity = 1
  if (guess === "lower" || guess === "lo") var polarity = 0
  var TrickCardValue = DropNumber()
  var TrickCard = SolveEquiv(TrickCardValue)
  var examineValue = ``;
  var examineCard = ``;
  if (game.userCard * 1 == 0) {
    examineValue += `${game.cardAdata}`
    examineCard += `${game.cardA}`
  } else if (game.userCard * 1 == 1) {
    examineValue += `${game.cardBdata}`
    examineCard += `${game.cardB}`
  } else if (game.userCard * 1 == 2) {
    examineValue += `${game.cardCdata}`
    examineCard += `${game.cardC}`
  } else if (game.userCard * 1 == 3) {
    examineValue += `${game.cardDdata}`
    examineCard += `${game.cardD}`
  } else if (game.userCard * 1 == 4) {
    examineValue += `${game.cardEdata}`
    examineCard += `${game.cardE}`
  }
  if (TrickCardValue*1 == examineValue*1) {
    swapCard(message, game, TrickCardValue, TrickCard)
    incrementPoints(message, game)
    incrementUserCard(message, game)
    setTimeout(() => {
      message.reply({embed: {
        color: 0x46f600,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Waterfall`,
        fields: [
          {
            name: `Lucky`,
            value: `${TrickCard} is equally valuable as ${examineCard}\n\`You proceed to the next card.\``
          }
        ]
      }})
    }, 2220)
  } else if (TrickCardValue*1 > examineValue*1 && polarity == 1) {
    swapCard(message, game, TrickCardValue, TrickCard)
    incrementPoints(message, game)
    incrementUserCard(message, game)
    setTimeout(() => {
      message.reply({embed: {
        color: 0x46f600,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Waterfall`,
        fields: [
          {
            name: `Success`,
            value: `${TrickCard} is higher valued than ${examineCard}\n\`You proceed to the next card.\``
          }
        ]
      }})
    }, 2220)
  } else if (TrickCardValue*1 > examineValue*1 && polarity == 0) {
    swapCard(message, game, TrickCardValue, TrickCard)
    incrementPoints(message, game)
    resetUserCard(message, game)
    setTimeout(() => {
      message.reply({embed: {
        color: 0xc71210,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Waterfall`,
        fields: [
          {
            name: `Failure`,
            value: `${TrickCard} is higher valued than ${examineCard}\n\`You must start again!\``
          }
        ]
      }})
    }, 2220)
  } else if (TrickCardValue*1 < examineValue*1 && polarity == 0) {
    swapCard(message, game, TrickCardValue, TrickCard)
    incrementPoints(message, game)
    incrementUserCard(message, game)
    setTimeout(() => {
      message.reply({embed: {
        color: 0x46f600,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Waterfall`,
        fields: [
          {
            name: `Success`,
            value: `${TrickCard} is lower valued than ${examineCard}\n\`You proceed to the next card.\``
          }
        ]
      }})
    }, 2220)
  } else if (TrickCardValue*1 < examineValue*1 && polarity == 1) {
    swapCard(message, game, TrickCardValue, TrickCard)
    incrementPoints(message, game)
    resetUserCard(message, game)
    setTimeout(() => {
      message.reply({embed: {
        color: 0xc71210,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Waterfall`,
        fields: [
          {
            name: `Failure`,
            value: `${TrickCard} is lower valued than ${examineCard}\n\`You must start again!\``
          }
        ]
      }})
    }, 2220)
  } else {
    message.reply(`\`FATAL ERROR! YOU SHOULD NEVER SEE THIS MESSAGE!\``)
  }
}

exports.run = (client, message, params) => {
  if (params[0] === "score") {
    message.reply(`This feature isn't available yet.`)
    return;
  }
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
        newCards(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE) // TurnProgress when 1 means game is over (and thus can be displayed on the leaderboard)
      })

      // there are two spoons

      // reset needs to manual update new stats (check)
    } else {
      // if this is a 1 it means the user wants to go again (end of round flag)
      if (game.userTurnProgress * 1 == 1) {
        message.reply(`\`Please wait while I shuffle the cards...\``)
        resetGame(message, cAv, cA, cBv, cB, cCv, cC, cDv, cD, cEv, cE)
      } else {
        if (params[0] === "higher" || params[0] === "hi" || params[0] === "lower" || params[0] === "lo") {
          chooseCards(message, params[0], game)
        } else {
          showCards(message, game)
        }
      }
    }

  }).catch(() => { // this only runs once so who cares!
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
