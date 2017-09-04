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

const slots = [
  'frog',
  'full_moon',
  'sunny',
  'tickets',
  'anchor',
  'spades',
  'clubs',
  'eye_in_speech_bubble',
  'bomb'
]

exports.run = (client, message, params) => {
  let bombs = 0
  let wins = 0
  //message.channel.send(`${message.member.displayName}`)
  let top_100 = Rand(slots)
  let top_010 = Rand(slots)
  let top_001 = Rand(slots)
  let mid_100 = Rand(slots)
  let mid_010 = Rand(slots)
  let mid_001 = Rand(slots)
  let low_100 = Rand(slots)
  let low_010 = Rand(slots)
  let low_001 = Rand(slots)
  var top_row = top_100 + top_010 + top_001
  var top_row = top_row.split(' ')
  var mid_row = mid_100 + mid_010 + mid_001
  var mid_row = mid_row.split(' ')
  var low_row = low_100 + low_010 + low_001
  var low_row = low_row.split(' ')
  //top_row = top_row.map(function(bombs){return ++bombs;});
  top_row = top_row.map(item => item.includes('bomb'){return ++bombs;});
  mid_row = mid_row.map(item => item.includes('bomb'){return ++bombs;});
  low_row = low_row.map(item => item.includes('bomb'){return ++bombs;});
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", bombs)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['xdev'],
  permLevel: 4
};

exports.help = {
  name: 'stt',
  description: '\'Send To Terminal\' Logs some stuff to the console.',
  usage: 'stt [stuff]'
};
