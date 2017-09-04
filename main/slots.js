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
  let valfrog = 5
  let full_moon = 0
  let valfull_moon = 5
  let sunny = 0
  let valsunny = 5
  let tickets = 0
  let valtickets = 10
  let anchor = 0
  let valanchor = 6
  let spades = 0
  let valspades = 4
  let clubs = 0
  let valclubes = 4
  let eye_in_speech_bubble = 0
  let valeye_in_speech_bubble = 20
  let bomb = 0
  let large_orange_diamond = 0
  let vallarge_orange_diamond = 15
  let radioactive = 0
  let seven = 0
  let valseven = 14
  let free = 0
  let valfree = 20
  let up = 0 // value calculated by level
  let valup = 15
  let hearts = 0
  let valhearts = 12
  let diamonds = 0
  let valdiamonds = 12
  let dizzy = 0
  let valdizzy = 15

  let prize_tickets = 0
  let prize_chatbit = 0
  let msgoutput = ''
  let multiplier = 1
  let matchrow = 0
  let matchcol = 0
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
  // msgoutput, rowoutput

  //////////////////////////////////////////////////////////////////////////////
  // ROW Conditions
  if (top_100 === top_010 && top_010 === top_001) {
    top_vis += `\`<----\``
    msgoutput += `Holy Smokes! The top row matches!\n`
    matchrow += 1
    multiplier += 2
  }
  if (mid_100 === mid_010 && mid_010 === mid_001) {
    mid_vis += `\`<----\``
    msgoutput += `Oh My! The middle row matches!\n`
    matchrow += 1
    multiplier += 4
  }
  if (low_100 === low_010 && low_010 === low_001) {
    low_vis += `\`<----\``
    msgoutput += `Snap! The bottom row matches!\n`
    matchrow += 1
    multiplier += 1
  }
  //////////////////////////////////////////////////////////////////////////////
  // COLUMN conditions

  //////////////////////////////////////////////////////////////////////////////
  // CRISS-CROSS Conditions

  //////////////////////////////////////////////////////////////////////////////
  // SPECIAL Conditions (bombs, powerups, etc
  if (free !== 0) {
    var calculation = free * valfree
    msgoutput += `You gained ${calculation}${curren} for free from your ${free}:free:\n`
    prize_tickets += calculation
  }
  if (radioactive !== 0 && bomb >= radioactive) {
    bomb -= radioactive
    msgoutput += `Ohh! Looks like some :bomb: were defused from :radioactive:!`
  }
  if (up !== 0 && matchrow !== 0) {
    var calculation = (up) + 200 * matchrow
    msgoutput += `SUPER! You gained a ${calculation}${chatBit} bonus!`
    prize_chatbit += calculation
  }
  if (bomb !== 0) {
    var newcb = prize_chatbit/bomb
    prize_chatbit = newcb
    var newtk = prize_tickets/bomb
    prize_tickets = newtk
    msgoutput += `Ouch! The :bomb:s caused you to lose ${bomb} x ${curren}/${chatBit}!`
  }
  // here is the munged visual data
  let rowoutput = `${top_vis}\n${mid_vis}\n${low_vis}`
  let gains = `You gained: ${prize_tickets}${curren} & ${prize_chatbit}${chatBit}`
  //message.reply('`BETA` This is solely for testing purposes.' + `\n${top_vis}\n${mid_vis}\n${low_vis}\nBOMBS: ${bomb}`)
  /*
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", bomb)
  */
  message.reply({embed: {
    color: 0xE27100,
    timestamp: new Date(),
    description: `Rolling! Rolling! Rolling!`,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    }
  }}).then(message => {
    setTimeout(() => {
      let msg = message
      message.delete()
      msg.reply({embed: {
        color: 0xE27100,
        timestamp: new Date(),
        description: rowoutput,
        author: {
          name: msg.member.displayName,
          icon_url: msg.author.avatarURL
        },
        fields: [
          {
            name: '\u200b',
            value: msgoutput
          }
        ],
        footer: {
          name: gains
        }
      }})
    }, 3000)
  }).
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
