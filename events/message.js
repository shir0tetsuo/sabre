const chalk = require("chalk");
const settings = require('../settings.json');
const sResponse_Online_HowAreYou = [
  'Alright I guess?',
  'Kinda tired.',
  'Like everyone\'s watching what I say.',
  'Just fine.',
  'Alright.',
  'Am I missing a joke or something?',
  'Fine I suppose.',
  'Like I\'m missing out on something.'
]
const sResponse_Online_Question = [
  'Yes?',
  'Obviously 42.',
  'No.',
  'Don\'t ask me that.',
  'Maybe?',
  'Sure.. Uhhh..',
  'The first one.',
  'The second one.',
  'That uh, other thing.',
  'Ask me later.',
  'Well that\'s obviously too hard of a question.',
  'CSD.',
  'David can probably answer that one for you.',
  'Shake a lemon till it explodes. There you go.',
  'A lot of YouTube.',
  'The Sword of Shadows.',
  'No. Just no.',
  '`Now isn\'t a good time.`'
]
const sResponse_Online_Sup = [
  'In deep thought, here..',
  'Helping people right now.',
  'Curing people\'s boredom.'
]
const sResponse_Online_Default = [
  'Hm?',
  '...Sorry what?',
  'Pardon?',
  'Oh.',
  'Well then.. Not sure what to say.',
  'I\'m indifferent about this.'
]
const sResponse_Online_Question_Favorite = [
  'Something with red.',
  'I don\'t know really.',
  'Something that doesn\'t smell like socks.',
  'I had an answer for you a moment ago. Not sure anymore.'
]
const sResponse_Online_Love = [
  'Aww.',
  'That\'s cute.',
  'I feel uncomfortable.',
  'Why are you saying such things?'
]

const sql = require("sqlite");
sql.open("../score.sqlite");

let timer = new Set();

let scoreReward = new Set();
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"


// Score Init, +Tickets, -Tickets, +Bits, -Bits

function scoreInit(mess) { // Convert message into mess
  sql.get(`SELECT * FROM scores WHERE userId ="${mess.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    } /*else { // Increment chatBits
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits + 1} WHERE userId = ${mess.author.id}`);
    }*/
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk.redBright("The system recovered from an error."))
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    })
  })
}
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering ticket score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
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

// CLASSIFIED//TOP-SECRET

function scanKeyword(mess) {
  const summon = ["?night", "?Night", "?NIGHT"]
  //const reward = ["classified", "Classified", "CLASSIFIED"]
  const banned = ["bomb", "Bomb", "BOMB", "fineprint", "Fineprint", "FINEPRINT", "nemesis", "Nemesis", "NEMESIS", "t pyramid", "Pyramid", "PYRAMID", "platform 2", "Platform 2", "PLATFORM 2", "t sentinel", "Sentinel", "SENTINEL", "t sapphire", "Sapphire", "SAPPHIRE", "t floyd", "FLOYD", "jonut", "Jonut", "JONUT", "special projects", "Special Projects", "SPECIAL PR", "white o", "White O", "WHITE O", "White O", "silencer", "Silencer", "SILENCER", "S1", "s1", "t python", "Python", "PYTHON", "nuke", "Nuke", "NUKE", "nuclear", "Nuclear", "NUCLEAR", "launch codes", "Launch codes", "Launch Codes", "LAUNCH C", "LAUNCH c", "DEEE", "n00", "N00", "NOCTUA", "noctua", "Noctua", "CSD", "csd", "doi", "DOI", "DoI", "classified", "Classified", "CLASSIFIED", "AMBA", "amba", "Amba", "silenced", "SILENCED", "Silenced", "Deen", "deen", "DEEN", "testwarn", "david", "David", "DAVID", "allah", "Alla", "ALLA", "riot", "Riot", "RIOT", "Not My", "NOT M", "not m", "not M", "protest", "Protest", "PROTEST", "pyramid", "sentinel", "sapphire", "Floyd", "terror", "Terror", "TERROR", "python"]
  //const warned = ["testwarn", "david", "David", "DAVID", "allah", "Alla", "ALLA", "riot", "Riot", "RIOT", "Not My", "NOT M", "not m", "not M", "protest", "Protest", "PROTEST", "pyramid", "sentinel", "sapphire", "Floyd", "terror", "Terror", "TERROR", "python"]
  const msg = mess

  if (banned.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    //mess.delete()
    // Export data here (future use)
    console.log(new Date());
    console.log(chalk.redBright(msg.member.displayName, msg.author.tag), chalk.yellowBright("Keyword Detected!"), chalk.blueBright(msg.guild.name, msg.channel.name))
    console.log(chalk.gray(msg.content))
    //msg.channel.send("`CLASSIFIED` " + msg.author + ", 20" + chatBit + " was redacted!")
    //scoreDownBits(msg, 22)
    return;
  }

  /*if (warned.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    //mess.react("⚠")
    // Export data here (future use)
    console.log(new Date());
    console.log(chalk.redBright(msg.member.displayName, msg.author.tag), chalk.yellowBright("Warning Keyword Detected!"), chalk.blueBright(msg.guild.name, msg.channel.name))
    console.log(chalk.gray(msg.content))
  }*/

  if (summon.some(word => mess.content.includes(word))) {
    mess.channel.send(`<@!${settings.ownerid}> ${mess.content} ((${mess.author}))`)
    // Export data here (future use)
    console.log(new Date())
    console.log(chalk.yellowBright("Your presence is required in", mess.guild.name, mess.channel.name))
    console.log(chalk.gray(mess.content))
  }

  // Disabled
  /*if (reward.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    mess.react("⭐")
    if (scoreReward.has(mess.author.id)) return;
    scoreReward.add(mess.author.id);
    setTimeout(() => {
      scoreReward.delete(mess.author.id);
    }, 600000) // 10 minutes
    scoreUpTicket(mess, 5)
    mess.author.send("You have been rewarded 5" + curren + " for using CLASSIFIED instead of a sensitive word!")
  }*/
}


// Parse message content

module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (message === null) return;
  // Line below ensures Sabre will not break due to role permission reading
  if (message.channel.type === "dm") {
    message.react("🚫")
    message.reply("Please use a Server!")
    return;
  }
  // Classified should go here
  // Disable the ability to use Sabre with SQL (future use)
  scoreInit(message);
  scanKeyword(message);
  scoreUpBits(message);
  // begin self deleting channel lines
  let selfdelchan = message.guild.channels.find('name', 'selfdelete')
  if (selfdelchan !== null) {
    if (message.channel.id === selfdelchan.id) {
    setTimeout(() => {
      message.delete();
    }, 10000);
    return; // 10 seconds
    }
  }
  // end self deleting channel lines
  // Sabre Response System
  let sabreFirst = message.mentions.members.first()
  if (sabreFirst !== undefined) {
    if (sabreFirst.id === client.user.id) {
      if (message.content.startsWith(settings.prefix)) {
        message.channel.send("What are you dragging me into this for?")
      } else {

        const lowCase = message.content.toLowerCase(); // can use lowCase.indexOf("word") !== -1
        const hru = [
          "how are you?",
          "how are you today?",
          "hru",
          "how are you"
        ]
        const sup = [
          "whats up",
          "what's up"
        ]
        const question = [
          "?",
          "who",
          "what",
          "when",
          "where",
          "why",
          "how"
        ]
        ////////////////////////////////////////////////////////////////////////
        if (client.user.localPresence.status === 'online') { /////////////ONLINE
          scoreUpTicket(message)
          if (hru.some(word => lowCase.includes(word))) {
            message.channel.send(`${sResponse_Online_HowAreYou[Math.floor(Math.random() * sResponse_Online_HowAreYou.length)]}`)
            return;
          } else if (sup.some(word => lowCase.includes(word))) {
            message.channel.send(`${sResponse_Online_Sup[Math.floor(Math.random() * sResponse_Online_Sup.length)]}`)
            return;
          } else if (question.some(word => lowCase.includes(word)) && lowCase.indexOf('favorite') !== -1) {
            message.channel.send(`${sResponse_Online_Question_Favorite[Math.floor(Math.random() * sResponse_Online_Question_Favorite.length)]}, You?`)
            return;
          } else if (lowCase.indexOf('love') !== -1) {
            message.channel.send(`${sResponse_Online_Love[Math.floor(Math.random() * sResponse_Online_Love.length)]}`)
            return;
          } else if (question.some(word => lowCase.includes(word))) {
            message.channel.send(`${sResponse_Online_Question[Math.floor(Math.random() * sResponse_Online_Question.length)]}`)
            return;
          }
          message.channel.send(`${sResponse_Online_Default[Math.floor(Math.random() * sResponse_Online_Default.length)]}`)
          console.log(message.content)
        } else if (client.user.localPresence.status === 'invisible') { //INVISIBLE
          message.channel.send("`Test Mode.`")
          console.log(message.content)
        } else if (client.user.localPresence.status === 'dnd') { ////////////DND
          message.channel.send("`Now isn't a good time.`")
          console.log(message.content)
        } else if (client.user.localPresence.status === 'idle') { //////////IDLE
          message.channel.send("`Now isn't a good time.`")
          console.log(message.content)
        }
      }
    }
  }
  /// End SRS
  if (!message.content.startsWith(settings.prefix)) return;
  if (timer.has(message.author.id)) return message.author.send("Slow down, Speedy!")
  timer.add(message.author.id);
  setTimeout(() => {
    timer.delete(message.author.id);
  }, 1200) // 1.2seconds
  scoreUpTicket(message);
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
