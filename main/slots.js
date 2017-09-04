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
  let top_vis = '';
  let mid_vis = '';
  let low_vis = '';
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
  var top_row = top_100 + ' ' + top_010 + ' ' + top_001
  var top_row = top_row.split(' ')
  var mid_row = mid_100 + ' ' + mid_010 + ' ' + mid_001
  var mid_row = mid_row.split(' ')
  var low_row = low_100 + ' ' + low_010 + ' ' + low_001
  var low_row = low_row.split(' ')
  //top_row = top_row.map(function(bombs){return ++bombs;});
  for (var i = 0; i < top_row.length; i++) {
    if (top_row[i] == 'bomb') {
      bombs += 1;
    }
  }
  for (var i = 0; i < mid_row.length; i++) {
    if (mid_row[i] == 'bomb') {
      bombs += 1;
    }
  }
  for (var i = 0; i < low_row.length; i++) {
    if (low_row[i] == 'bomb') {
      bombs += 1;
    }
  }

  // Join the rows back together and apply formatting
  for (var i = 0; i < top_row.length; i++) {
    top_vis += `:${top_row[i]}: `
  }
  for (var i = 0; i < mid_row.length; i++) {
    mid_vis += `:${mid_row[i]}: `
  }
  for (var i = 0; i < low_row.length; i++) {
    low_vis += `:${low_row[i]}: `
  }
  message.reply('`BETA` This is solely for testing purposes.' + `\n${top_vis}\n${mid_vis}\n${low_vis}`)
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", bombs)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 4
};

exports.help = {
  name: 'slots',
  description: 'COMING SOON',
  usage: 'slots'
};
