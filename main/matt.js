// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function generateRandomness(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function Rand() {
  // where data is the array
  let imposeMath = Math.floor(Math.random() * 101)
  if (imposeMath >= 99) return `X`
  if (imposeMath >= 98) return `m`
  if (imposeMath >= 97) return `o`
  if (imposeMath >= 95) return `.`
  if (imposeMath >= 93) return `=`
  if (imposeMath >= 90) return `+`
  if (imposeMath >= 89) return `S`
  if (imposeMath >= 88) return `E`
  if (imposeMath >= 87) return `/`
  if (imposeMath >= 85) return `${generateRandomness()}`
  if (imposeMath !== -1) return ` `
  //return data[Math.floor(Math.random() * data.length)]
}

function RandArray(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

responseArray = [
  'Simple.',
  'Strange.',
  'Odd.',
  'Mesmarizing.',
  'Silly.',
  'Uncomfortable.',
  'Blocky.',
  'High-Tech.',
  'Stupid.',
  'Crazy.',
  'Fantastic.',
  'Creepy.',
  'like David\'s Cryptographs.',
  'Super.',
  'Splendid.',
  'Wunderbar.',
  'Fancy.',
  'Spoofy.',
  'Spicy.',
  'Beefy.'
]

exports.run = (client, message, params) => {
  var RanDart = `\`\`\`ml\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\n==`
  for (i = 0; i < 20; i++) {
    RanDart += Rand()
  }
  RanDart += `\`\`\``

  message.channel.send({embed: {
    color: 0x00fafa,
    description: `\u200b`,
    fields: [
      {
        name: `\`Looks ${RandArray(responseArray)}\``,
        value: `${RanDart}`
      }
    ]
  }})
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['mat'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'matt',
  description: 'Generates ASCII Art ..Thing',
  usage: 'matt'
};
