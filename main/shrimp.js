const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

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
      sql.run("INSERT INTO shrimp (userId, userDisplay, shrimpScore) VALUES (?, ?, ?)", [mess.author.id, mess.member.displayName, 0]);
    }
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk.redBright("The system recovered from an error (New Shrimp Entry)."))
    sql.run("CREATE TABLE IF NOT EXISTS shrimp (userId TEXT, userDisplay TEXT, shrimpScore INTEGER)").then(() => {
      sql.run("INSERT INTO shrimp (userId, userDisplay, shrimpScore) VALUES (?, ?, ?)", [mess.author.id, mess.member.displayName, 0]);
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
    sql.run(`UPDATE shrimp SET userDisplay = "${mess.member.displayName}" WHERE userId = ${mess.author.id}`)
    sql.run(`UPDATE shrimp SET shrimpScore = "${xval}" WHERE userId = ${mess.author.id}`)
  })
}

exports.run = (client, message, params) => {
  shrimpInit(message);
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
  var tallyScore = judge1 + ' ' + judge2 + ' ' + judge3 + ' ' + judge4 + ' ' + judge5
  var tallyScore = tallyScore.split(' ')
  for (i = 0; i < tallyScore.length; i++) {
    var numero = "NU" + tallyScore[i]
    if (tallyScore[i] == 1) {
      var numero = "This judge is not amused. They can't finish their meal."
    }
    if (tallyScore[i] == 2) {
      var numero = "This judge finds that there is something fairly lacking with this shrimp."
    }
    if (tallyScore[i] == 3) {
      var numero = "This judge likes the preparation, but still finds it sub-par."
    }
    if (tallyScore[i] == 4) {
      var numero = "This judge doesn't find it the worst, but can do better."
    }
    if (tallyScore[i] == 5) {
      var numero = "This judge finds it within acceptable parameters."
    }
    if (tallyScore[i] == 6) {
      var numero = "This judge somewhat likes it, but is not the best they've had."
    }
    if (tallyScore[i] == 7) {
      var numero = "This judge rather enjoyed the meal."
    }
    if (tallyScore[i] == 8) {
      var numero = "This judge **really** enjoyed it!"
    }
    if (tallyScore[i] == 9) {
      var numero = "A tear was brought to their eyes before saying **'This is a meal from Heaven!'**"
    }
    if (tallyScore[i] == 10) {
      var numero = "The meal was **so good**, they had a heart attack and was rushed to the hospital!"
    }
  }
  let output = `${message.author} ${Rand(cooktype)} dat Shrimp. Made some ${Rand(returned)}\n\n`
  output += `__The judges have a seat at the table.__\n\n`
  output += `Judge 1: ${NU1} They give a ${judge1}\n`
  output += `Judge 2: ${NU2} They give a ${judge2}\n`
  output += `Judge 3: ${NU3} They give a ${judge3}\n`
  output += `Judge 4: ${NU4} They give a ${judge4}\n`
  output += `Judge 5: This judge is very salty. ${NU5} They give a ${judge5}\n\n`
  output += `Your overall score: ${judge1 + judge2 + judge3 + judge4 + judge5}`
  message.channel.send(output)
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
  usage: 'shrimp'
};
