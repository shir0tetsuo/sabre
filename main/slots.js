const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
////////////////////////////////////////////////////////////////////////////////
// Function to serve as randomization component for arrays
function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}
////////////////////////////////////////////////////////////////////////////////
// Assign possible variance
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
  'up',
  'hearts',
  'diamonds',
  'dizzy'
]
/* Notes:
  Make slots cost 10 bytes to play.
  Apply more visuals and padding!
  Do cris-cross comparisons as well.
  Bombs anywhere will make you lose bytes.
  Apply something colorful for win/lose situations.
  Possibly power-ups? Such as up = next roll 2x reward?
  Apply some SQL stuff to keep track of all the powerups.
  let bombs = 0
  let radioactive = 0
  let free = 0
    //message.channel.send(`${message.member.displayName}`)
    Reactions!
*/
exports.run = (client, message, params) => {
  //////////////////////////////////////////////////////////////////////////////
  // Create blank visualization rows
  let top_vis = '';
  let mid_vis = '';
  let low_vis = '';
  //////////////////////////////////////////////////////////////////////////////
  // Initialize counters
  let frog = 0
  let full_moon = 0
  let sunny = 0
  let tickets = 0
  let anchor = 0
  let spades = 0
  let clubs = 0
  let eye_in_speech_bubble = 0
  let bomb = 0
  let large_orange_diamond = 0
  let radioactive = 0
  let seven = 0
  let free = 0
  let up = 0
  let hearts = 0
  let diamonds = 0
  let dizzy = 0
  //////////////////////////////////////////////////////////////////////////////
  // Randomization Floor (Where most of the magic happens)
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

  var full_row = top_100 + ' ' + top_010 + ' ' + top_001 + ' ' + mid_100 + ' ' + mid_010 + ' ' + mid_001 + ' ' + low_100 + ' ' + low_010 + ' ' + low_001
  var full_row = full_row.split(' ')
  //////////////////////////////////////////////////////////////////////////////
  // Calculate object value
  for (var i = 0; i < full_row.length; i++) {
    var Object = full_row[i]
    if (Object == 'frog') {
      frog += 1;
    } else if (Object == 'full_moon') {
      full_moon += 1;
    } else if (Object == 'sunny') {
      sunny += 1;
    } else if (Object == 'tickets') {
      tickets += 1;
    } else if (Object == 'anchor') {
      anchor += 1;
    } else if (Object == 'spades') {
      spades += 1;
    } else if (Object == 'clubs') {
      clubs += 1;
    } else if (Object == 'eye_in_speech_bubble') {
      eye_in_speech_bubble += 1;
    } else if (Object == 'bomb') {
      bomb += 1;
    } else if (Object == 'large_orange_diamond') {
      large_orange_diamond += 1;
    } else if (Object == 'radioactive') {
      radioactive += 1;
    } else if (Object == 'seven') {
      seven += 1;
    } else if (Object == 'free') {
      free += 1;
    } else if (Object == 'up') {
      up += 1;
    } else if (Object == 'hearts') {
      hearts += 1;
    } else if (Object == 'diamonds') {
      diamonds += 1;
    } else if (Object == 'dizzy') {
      dizzy += 1;
    }
  }
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
  // Parse response messages (Suggest output system)
  // Formula for Bomb Calculation: (wins)/bombs
  // Formula for Radioactive Calculation: (bombs)-Radioactive
  message.reply('`BETA` This is solely for testing purposes.' + `\n${top_vis}\n${mid_vis}\n${low_vis}\nBOMBS: ${bomb}`)
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", bomb)
};
////////////////////////////////////////////////////////////////////////////////
// Basic information about the plugin
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
