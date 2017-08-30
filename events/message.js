const chalk = require("chalk");
const settings = require('../settings.json');

const sql = require("sqlite");
sql.open("../score.sqlite");

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
    }, 3000) // 3 seconds
}}
  // end self deleting channel lines
  if (!message.content.startsWith(settings.prefix)) return;
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
