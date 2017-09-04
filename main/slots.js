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
  'bomb',
  'large_orange_diamond',
  'radioactive',
  'seven',
  'free',
  'up'
]

/* Notes:
  Make slots cost 10 bytes to play.
  Apply more visuals and padding!
  Do cris-cross comparisons as well.
  Bombs anywhere will make you lose bytes.
  Apply something colorful for win/lose situations.
  Possibly power-ups? Such as up = next roll 2x reward?
  Apply some SQL stuff to keep track of all the powerups.
*/

function calculate(obj) {
  if (obj === 'bomb') {
    var objBombs += 1;
  } else if (obj === 'radioactive') {
    var objRadioactive += 1;
  }
}


exports.run = (client, message, params) => {
  let top_vis = '';
  let mid_vis = '';
  let low_vis = '';
  let objBombs = 0
  let objRadioactive = 0
  let objFree = 0
  //message.channel.send(`${message.member.displayName}`)
  //////////////////////////////////////////////////////////////////////////////
  // Random Floor
  let top_100 = Rand(slots)
  let top_010 = Rand(slots)
  let top_001 = Rand(slots)
  let mid_100 = Rand(slots)
  let mid_010 = Rand(slots)
  let mid_001 = Rand(slots)
  let low_100 = Rand(slots)
  let low_010 = Rand(slots)
  let low_001 = Rand(slots)
  //////////////////////////////////////////////////////////////////////////////
  // Split into arrays
  var top_row = top_100 + ' ' + top_010 + ' ' + top_001
  var top_row = top_row.split(' ')
  var mid_row = mid_100 + ' ' + mid_010 + ' ' + mid_001
  var mid_row = mid_row.split(' ')
  var low_row = low_100 + ' ' + low_010 + ' ' + low_001
  var low_row = low_row.split(' ')

  //////////////////////////////////////////////////////////////////////////////
  // Calculate object value
  for (var i = 0; i < top_row.length; i++) {
    calculate(top_row[i]) // --> +1 for whatever
  }
  /*
  for (var i = 0; i < top_row.length; i++) {
    var Object = top_row[i]
    if (Object == 'bomb') {
      objBombs += 1;
    } else if (Object == 'radioactive') {

    }
  }
  for (var i = 0; i < mid_row.length; i++) {
    var Object = mid_row[i]
    if (Object == 'bomb') {
      bombs += 1;
    }
  }
  for (var i = 0; i < low_row.length; i++) {
    var Object = low_row[i]
    if (Object == 'bomb') {
      bombs += 1;
    }
  }
  */

  //////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////
  // Parse response messages
  message.reply('`BETA` This is solely for testing purposes.' + `\n${top_vis}\n${mid_vis}\n${low_vis}`)
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", objBombs)
  console.log("RADIOACTIVE:", objRadioactive)
  console.log("FREE:", objFree)
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
