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
  var enumeration = Rand(enumerator)
  var card = Rand(cv)
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
      }
    ]
  }})
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
