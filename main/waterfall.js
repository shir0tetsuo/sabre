const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
////////////////////////////////////////////////////////////////////////////////
// function floor
function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}
function convertToInt(wfRow, wfRVL) {
  for (var i = 0; i < wfRow.length; i++) {
    var cardX = wfRow[i]
    if (cardX == 'a') {
      wfRVL[i] = a
    } else if (cardX == 'one') {
      wfRVL[i] = one
    } else if (cardX == 'two') {
      wfRVL[i] = two
    } else if (cardX == 'three') {
      wfRVL[i] = three
    } else if (cardX == 'four') {
      wfRVL[i] = four
    } else if (cardX == 'five') {
      wfRVL[i] = five
    } else if (cardX == 'six') {
      wfRVL[i] = six
    } else if (cardX == 'seven') {
      wfRVL[i] = seven
    } else if (cardX == 'eight') {
      wfRVL[i] = eight
    } else if (cardX == 'nine') {
      wfRVL[i] = nine
    } else if (cardX == 'keycap_ten') {
      wfRVL[i] = keycap_ten
    } else if (cardX == 'regional_indicator_j') {
      wfRVL[i] = regional_indicator_j
    } else if (cardX == 'regional_indicator_q') {
      wfRVL[i] = regional_indicator_q
    } else if (cardX == 'regional_indicator_k') {
      wfRVL[i] = regional_indicator_k
    }
  }
  console.log(wfRVL)
}
////////////////////////////////////////////////////////////////////////////////
// symbol floor
const cards = [
  'a',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'keycap_ten',
  'regional_indicator_j',
  'regional_indicator_q',
  'regional_indicator_k'
]
////////////////////////////////////////////////////////////////////////////////
// value floor
let a = 0
let one = 1
let two = 2
let three = 3
let four = 4
let five = 5
let six = 6
let seven = 7
let eight = 8
let nine = 9
let keycap_ten = 10
let regional_indicator_j = 11
let regional_indicator_q = 12
let regional_indicator_k = 13
////////////////////////////////////////////////////////////////////////////////
// exports
exports.run = (client, message, params) => {
  if (params[0] === undefined) return message.reply("`ERROR` Can't play option-less.")
  if (params[0] === "usage" || params[0] === "help") {
    message.channel.send({embed: {
      color: 0x4D94E6,
      timestamp: new Date(),
      footer: {
        text: "Waterfall Usage"
      },
      author: {
        name: message.member.displayName + " --- Waterfall Card Game Instructions",
        icon_url: message.author.avatarURL
      },
      fields: [
        {
          name: "How the Game Works",
          value: "A set of 5 cards are randomly generated. Your objective is to clear the game's 5 cards."
        },
        {
          name :"Whatnow?",
          value: "You can clear a card and move onto the next by guessing if the next card that will replace the current card will be higher or lower valued."
        },
        {
          name: "What happens if I get it wrong?",
          value: "You have to go back to the beginning and start over."
        },
        {
          name: "What happens if the card is the same value?",
          value: "You continue but are penalized."
        },
        {
          name: "Commands?",
          value: "See " + settings.prefix + "help waterfall"
        }
      ]
    }})
  } else if (params[0] === 'new') {
    ////////////////////////////////////////////////////////////////////////////
    // initialization
    var visualization = ''
    var cardA = Rand(cards)
    var cardB = Rand(cards)
    var cardC = Rand(cards)
    var cardD = Rand(cards)
    var cardE = Rand(cards)
    var wfRow = `${cardA} ${cardB} ${cardC} ${cardD} ${cardE}`
    console.log(wfRow)
    var wfRow = wfRow.split(' ')
    for (var i = 0; i < wfRow.length; i++) {
      visualization += `:${wfRow[i]}: `
    }
    var wfRVL = wfRow
    convertToInt(wfRow, wfRVL)
    ////////////////////////////////////////////////////////////////////////////
    // returns ${visualization} and ${wfRVL}
    message.reply(`${visualization}`)
  }
};

// need this to go back to permLevel 1
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wf'],
  permLevel: 4
};

exports.help = {
  name: 'waterfall',
  description: 'Waterfall Game. COMING SOON',
  usage: 'waterfall [new/end/usage/view/high/low]'
};
