const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let noShrimp = new Set();

function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

const cooktype = [
  'barbecue\'d',
  'boiled',
  'broiled',
  'baked',
  'sautee\'d',
  'toasted',
  'roasted',
  'chopped up',
  'sashimi\'d'
]
const returned = [
  'Shrimp-Kabobs!',
  'Shrimp Creole!',
  'Shrimp Gumbo!',
  'Pan Fried Shrimp!',
  'Deep Fried Shrimp!',
  'Stir-Fried Shrimp!',
  'Pineapple Shrimp!',
  'Lemon Shrimp!',
  'Coconut Shrimp!',
  'Pepper Shrimp!',
  'Shrimp Soup!',
  'Shrimp Stew!',
  'Shrimp Salad!',
  'Ordinary Shrimp!'
]
const shrimpTally = [
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1'
]
const shrimpUnfair = [
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1'
]

function shrimpInit(mess) { // Convert message into mess
  sql.get(`SELECT * FROM shrimp WHERE userId ="${mess.author.id}"`).then(row => {
    if (!row) {
      let udn = mess.author.username + mess.author.discriminator
      sql.run("INSERT INTO shrimp (userId, userDisplay, shrimpScore) VALUES (?, ?, ?)", [mess.author.id, udn, 0]);
    }
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk.redBright("The system recovered from an error (New Shrimp Entry)."))
    sql.run("CREATE TABLE IF NOT EXISTS shrimp (userId TEXT, userDisplay TEXT, shrimpScore INTEGER)").then(() => {
      let udn = mess.author.username + mess.author.discriminator
      sql.run("INSERT INTO shrimp (userId, userDisplay, shrimpScore) VALUES (?, ?, ?)", [mess.author.id, udn, 0]);
    })
  })
}
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function shrimpUpdate(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM shrimp WHERE userId = "${mess.author.id}"`).then(row => {
    let udn = mess.author.username + mess.author.discriminator
    sql.run(`UPDATE shrimp SET userDisplay = "${udn}" WHERE userId = ${mess.author.id}`)
    sql.run(`UPDATE shrimp SET shrimpScore = "${xval}" WHERE userId = ${mess.author.id}`)
  })
}
function Respond(int) {
  if (!int) var int = 1
  if (int == 1) return "This judge is not amused. They can't finish their meal."
  if (int == 2) return "This judge finds that there is something fairly lacking with this shrimp."
  if (int == 3) return "This judge likes the preparation, but still finds it sub-par."
  if (int == 4) return "This judge doesn't find it the worst, but can do better."
  if (int == 5) return "This judge finds it within acceptable parameters."
  if (int == 6) return "This judge somewhat likes it, but is not the best they've had."
  if (int == 7) return "This judge rather enjoyed the meal."
  if (int == 8) return "This judge **really** enjoyed it!"
  if (int == 9) return "A tear was brought to their eyes before saying **'This is a meal from Heaven!'**"
  if (int == 10) return "The meal was **so good**, they had a heart attack and was rushed to the hospital!"
}

exports.run = (client, message, params) => {
  shrimpInit(message);
  if (params[0] === "score") {
    let output = `__Top 6 Shrimp Chefs!__`
    sql.all(`SELECT * FROM shrimp ORDER BY shrimpScore DESC LIMIT 6`).then(data => {
      output += `\`\`\`asciidoc\n`
      output += data.map(m => `${m.shrimpScore} :: ${m.userDisplay}`).join('\n')
      output += `\`\`\``
      message.channel.send(output)
    })
  } else {
    var judgeVariance = Math.round(Math.random() * 100)
    var judge1 = Rand(shrimpTally)
    var judge2 = Rand(shrimpTally)
    var judge3 = Rand(shrimpTally)
    var judge4 = Rand(shrimpTally)
    if (judgeVariance >= 90) {
      var judge5 = Rand(shrimpTally)
    } else {
      var judge5 = Rand(shrimpUnfair)
    }
    let output = `${message.author} ${Rand(cooktype)} dat Shrimp. Made some ${Rand(returned)}\n\n`
    if (noShrimp.has(message.author.id)) {
      output += `You must wait a few minutes to be judged again.`
      message.channel.send(output)
    } else {
      noShrimp.add(message.author.id);
      setTimeout(() => {
        noShrimp.delete(message.author.id);
      }, 300000)
      output += `__The judges have a seat at the table.__\n\n`
      output += `Judge 1: ${Respond(judge1)} They give a ${judge1}!\n`
      output += `Judge 2: ${Respond(judge2)} They give a ${judge2}!\n`
      output += `Judge 3: ${Respond(judge3)} They give a ${judge3}!\n`
      output += `Judge 4: ${Respond(judge4)} They give a ${judge4}!\n`
      output += `Judge 5: This judge is very salty. ${Respond(judge5)} They give a ${judge5}!\n\n`
      let overall = judge1*1 + judge2*1 + judge3*1 + judge4*1 + judge5*1
      output += `Your overall score: ${overall} /50\n`
      let prizeValue = (overall * 20)
      output += `You gained ${prizeValue}${curren}!`
      message.channel.send(output)
      setTimeout(() => {
        shrimpUpdate(message, overall)
        scoreUpTicket(message, prizeValue)
      }, 2000)
    }
  }

  //message.channel.send(`${message.author} ${Rand(cooktype)} dat Shrimp. Made some ${Rand(returned)}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['shrmp'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'shrimp',
  description: 'Make different kinds of Shrimp.',
  usage: 'shrimp\nShrimp High Score :: shrimp score'
};
