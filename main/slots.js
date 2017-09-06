const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

////////////////////////////////////////////////////////////////////////////////
// Imported Level Mathematics
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering byte score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}

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
  // Simplistic deduction of bits per usage
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) return message.reply("This command isn't available to you yet.")
    if (row.chatBits < 10) return message.reply(`You don't have enough ${chatBit}! (Requires 10)`)
    scoreDownBits(message, 10)
  })
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
  let valclubs = 4
  let eye_in_speech_bubble = 0
  let valeye_in_speech_bubble = 20
  let bomb = 0
  let large_orange_diamond = 0
  let vallarge_orange_diamond = 15
  let radioactive = 0
  let seven = 0
  let valseven = 28
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
  let react_star = 0
  let react_bomb = 0
  let react_seven = 0
  let react_radio = 0
  let react_heart = 0
  let react_ticket = 0
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
      react_seven += 1;
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
  // column conditions
  if (top_100 === mid_100 && mid_100 === low_100) {
    top_vis += `\`!!\``
    mid_vis += `\`!!\``
    low_vis += `\`!!\``
    msgoutput += `Shazamo! The left column matches!\n`
    matchcol += 1
    multiplier += 2
  }
  if (top_010 === mid_010 && mid_010 === low_010) {
    top_vis += `\`!!\``
    mid_vis += `\`!!\``
    low_vis += `\`!!\``
    msgoutput += `Alakazam! The middle column matches!\n`
    matchcol += 1
    multiplier += 5
  }
  if (top_001 === mid_001 && mid_001 === low_001) {
    top_vis += `\`!!\``
    mid_vis += `\`!!\``
    low_vis += `\`!!\``
    msgoutput += `Ridonculous! The right column matches!\n`
    matchcol += 1
    multiplier += 2
  }
  //////////////////////////////////////////////////////////////////////////////
  // cris-cross conditions
  if (top_100 === mid_010 && mid_010 === low_001) {
    top_vis += `\`\\\\\``
    mid_vis += `\`\\\\\``
    low_vis += `\`\\\\\``
    msgoutput += `Hey cool! Top-left to bottom-right matches!\n`
    matchcol += 1
    multiplier += 2
  }
  if (top_001 === mid_010 && mid_010 === low_100) {
    top_vis += `//`
    mid_vis += `//`
    low_vis += `//`
    msgoutput += `I see! Top-right to bottom-left matches!\n`
    matchcol += 1
    multiplier += 2
  }
  //////////////////////////////////////////////////////////////////////////////
  // special conditions
  if (top_100 === top_001 && top_001 === low_001 && low_001 === low_100) {
    top_vis += `---`
    low_vis += `---`
    msgoutput += `Neato! The corners match!\n`
    matchcol += 1
    matchrow += 1
    multiplier += 1
  }
  //////////////////////////////////////////////////////////////////////////////
  // SPECIAL Conditions (bombs, powerups, etc
  if (free !== 0) {
    var calculation = free * valfree
    msgoutput += `You gained ${calculation}${curren} for free from your ${free} :free:\n`
    prize_tickets += calculation
    react_ticket += 1
  }
  if (radioactive !== 0 && bomb >= radioactive) {
    bomb -= radioactive
    react_radio += 1
    msgoutput += `Ohh! Looks like some :bomb: were defused from :radioactive:!\n`
  }
  if (up !== 0 && matchrow !== 0) {
    var calculation = (up * 200) * matchrow
    msgoutput += `SUPER! You gained a ${calculation}${chatBit} bonus!\n`
    prize_chatbit += calculation
    react_heart += 1
  }

  if (matchrow !== 0 || matchcol !== 0) {
    cross = (matchrow + matchcol) * multiplier
    prize_chatbit += (valfrog * frog) * cross
    prize_tickets += (valfull_moon * full_moon) * cross
    prize_tickets += (valsunny * sunny) * cross
    prize_tickets += (valtickets * tickets) * cross
    prize_chatbit += (valanchor * anchor) * cross
    prize_tickets += (valspades * spades) * cross
    prize_chatbit += (valclubs * clubs) * cross
    prize_chatbit += (valeye_in_speech_bubble * eye_in_speech_bubble) * cross
    prize_tickets += (vallarge_orange_diamond * large_orange_diamond) * cross
    prize_chatbit += radioactive * (multiplier * 30)
    prize_tickets += (valseven * seven) * cross
    prize_tickets += (valfree * free) * cross
    prize_tickets += (valup * up) * cross * matchcol
    react_star += 1
  }
  if (bomb >= 2) {
    var newcb = prize_chatbit/bomb
    prize_chatbit = Math.floor(newcb)
    var newtk = prize_tickets/bomb
    prize_tickets = Math.floor(newtk)
    msgoutput += `Ouch! The :bomb:s caused you to lose some ${curren}/${chatBit}!`
    react_bomb += 1
  }
  // here is the munged visual data
  let rowoutput = `${top_vis}\n${mid_vis}\n${low_vis}`
  let gains = `${prize_tickets}${curren} & ${prize_chatbit}${chatBit}`
  //message.reply('`BETA` This is solely for testing purposes.' + `\n${top_vis}\n${mid_vis}\n${low_vis}\nBOMBS: ${bomb}`)
  /*
  console.log(top_row)
  console.log(mid_row)
  console.log(low_row)
  console.log("BOMBS:", bomb)
  */

  if (!msgoutput) {
    msgoutput += `Nothing interesting happened.`
  }
  //////////////////////////////////////////////////////////////////////////////
  // Append prizes to user's level data
  if (prize_tickets !== 0) {
    scoreUpTicket(message, prize_tickets)
  }
  if (prize_chatbit !== 0) {
    scoreUpBits(message, prize_chatbit)
  }
  message.reply({embed: {
      color: 0xE27100,
      timestamp: new Date(),
      description: rowoutput,
      author: {
        name: message.member.displayName,
        icon_url: message.author.avatarURL
      },
      fields: [
        {
          name: '\u200b',
          value: msgoutput
        },
        {
          name: 'Winnings:',
          value: gains
        }
      ],
      footer: {
        icon_url: client.user.avatarURL,
        text: "slots"
      }
    }}).then(message => {
      if (react_bomb !== 0) {
        message.react("💣")
      }
      if (react_star !== 0) {
        message.react("⭐")
      }
      if (react_seven !== 0) {
        message.react("🎉")
      }
      if (react_radio !== 0) {
        message.react("☢")
      }
      if (react_heart !== 0) {
        message.react("♥")
      }
      if (react_ticket !== 0) {
        message.react("🎟")
      }
    })
};
////////////////////////////////////////////////////////////////////////////////
// Basic information about the plugin
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['slot'],
  permLevel: 1
};

exports.help = {
  name: 'slots',
  description: 'Try your luck! Roll the machine! Requires 10 Bytes',
  usage: 'slots'
};
