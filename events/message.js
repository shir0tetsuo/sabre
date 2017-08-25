const chalk = require("chalk");
const settings = require('../settings.json');

const sql = require("sqlite");
sql.open("../scores.sqlite");

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
    console.log(chalk_err("The system recovered from an error."))
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
  console.log("Lowering ticket score by", xval*1, mess.author.id)
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
  console.log("Lowering byte score by", xval*1, mess.author.id)
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
  const reward = ["classified", "Classified", "CLASSIFIED"]
  const banned = ["bomb", "Bomb", "BOMB", "amba", "Amba", "AMBA", "fineprint", "Fineprint", "FINEPRINT", "nemesis", "Nemesis", "NEMESIS", "t pyramid", "Pyramid", "PYRAMID", "john", "John", "JOHN", "deen", "Deen", "DEEN", "JD", "platform 2", "Platform 2", "PLATFORM 2", "t sentinel", "Sentinel", "SENTINEL", "t sapphire", "Sapphire", "SAPPHIRE", "t floyd", "FLOYD", "special projects", "Special Projects", "SPECIAL PR", "white o", "White O", "WHITE O", "White O", "silencer", "Silencer", "SILENCER", "silenced", "Silenced", "SILENCED", "S1", "s1", "t python", "Python", "PYTHON", "noctua", "Noctua", "NOCTUA", "nuke", "Nuke", "NUKE", "nuclear", "Nuclear", "NUCLEAR", "launch codes", "Launch codes", "Launch Codes", "LAUNCH C", "LAUNCH c"]
  const warned = ["testwarn", "david", "David", "DAVID", "allah", "Alla", "ALLA", "riot", "Riot", "RIOT", "Not My", "NOT", "not", "protest", "Protest", "PROTEST", "pyramid", "sentinel", "sapphire", "Floyd", "terror", "Terror", "TERROR", "python"]
  const msg = mess

  if (summon.some(word => mess.content.includes(word))) {
    mess.channel.send(`<@!${settings.ownerid}> ${mess.content} ((${mess.author}))`)
    // Export data here (future use)
    console.log(new Date())
    console.log(chalk.yellowBright("Your presence is required in", mess.guild.name, mess.channel.name))
    console.log(chalk.gray(mess.content))
  }

  if (reward.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    mess.react("⭐")
    if (scoreReward.has(mess.author.id)) return;
    scoreReward.add(mess.author.id);
    setTimeout(() => {
      scoreReward.delete(mess.author.id);
    }, 600000) // 10 minutes
    scoreUpTicket(mess, 5)
    mess.author.send("You have been rewarded 5" + curren + " for using CLASSIFIED instead of a sensitive word!")
  }

  if (banned.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    mess.delete()
    // Export data here (future use)
    console.log(new Date());
    console.log(chalk.redBright(au.member.displayName, au.author.tag), chalk.yellowBright("Banned Keyword Detected!"))
    console.log(chalk.gray(au.content))
    au.channel.send("`CLASSIFIED` " + au.author + ", 20" + chatBit + " was redacted!")
    scoreDownBits(au, 22)
    return;
  }

  if (warned.some(word => mess.content.includes(word)) && mess.guild.id === settings.alaskaguild) {
    mess.react("⚠")
    // Export data here (future use)
    console.log(new Date());
    console.log(chalk.redBright(au.member.displayName, au.author.tag), chalk.yellowBright("Warning Keyword Detected!"))
    console.log(chalk.gray(au.content))
  }
}

// Parse message content

module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (message === null) return;
  // Classified should go here
  // Disable the ability to use Sabre with SQL (future use)
  scoreInit(message);
  scanKeyword(message);
  scoreUpBits(message);
  if (!message.content.startsWith(settings.prefix)) return;
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
