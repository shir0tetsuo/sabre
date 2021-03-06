// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
const Tran = require ('../sys/TRANSACTIONS.js')
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

const cv = [
  ':a:',
  ':two:',
  ':three:',
  ':four:',
  ':five:',
  ':six:',
  ':seven:',
  ':eight:',
  ':nine:',
  ':regional_indicator_j:',
  ':regional_indicator_k:',
  ':regional_indicator_q:'
]
const enumerator = [
  ':hearts:',
  ':spades:',
  ':diamonds:',
  ':clubs:'
]

exports.run = (client, message, params) => {
  var AvaCmd = (['left', 'right'])
  var enumeration = Rand(enumerator)
  var card = Rand(cv)
  var prizeChance = Math.floor(Math.random() * 100)
  var prizeActual = Math.floor(Math.random() * (3000 - 1000) + 1000)
  var handActual = Math.floor(Math.random() * 11)
  console.log(handActual, "(left = 5+)")
  message.channel.send({embed:{
    color: 0x6ede2a,
    timestamp: new Date(),
    description: `Which hand?`,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `I'm holding 2 cards.`,
        value: `Can you guess which hand is holding the same card you have?`
      },
      {
        name: `Your card:`,
        value: `${card}${enumeration}`
      },
      {
        name: `Type`,
        value: `\`left\` or \`right\` to guess!`
      }
    ]
  }})
  .then(() => {
    message.channel.awaitMessages(response => response.author.id === message.author.id && AvaCmd.some(word => response.content.toLowerCase().startsWith(word)), {
      max: 1,
      time: 20000,
      errors: ['time'],
    })
    .then((collected) => {
      //console.log(collected.first().content)
      if (handActual >= 5) {
        var trueHand = 'left'
      } else {
        var trueHand = 'right'
      }
      if (trueHand === collected.first().content.toLowerCase()) {
        if (prizeChance >= 75) {
          message.reply(`Snap! You guessed it! That hand had ${card}${enumeration}!\n\`You receive an award of ${prizeActual}\`:tickets:`)
          Tran(message, "tk", prizeActual)
        } else {
          message.reply(`Snap! You guessed it! That hand had ${card}${enumeration}!`)
        }
      } else {
        message.reply(`You got :black_joker: the wrong card!`)
      }
    })
    .catch(() => {
      message.reply(`Uh oh, I dropped the cards..`)
    })
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cg'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'cardguess',
  description: 'Guess which hand Sabre is holding the correct card!',
  usage: 'cardguess\nleft or right :: valid responses'
};
