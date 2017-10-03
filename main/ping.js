const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

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
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(dbs => {
      var openAperture = new Date()
      var milliOA = now.getMilliseconds(),
        secOA = now.getSeconds(),
        minOA = now.getMinutes(),
        houOA = now.getHours();
      scoreUpBits(message, 1)
      var scoreAperture = new Date()
      var milliSA = now.getMilliseconds(),
        secSA = now.getSeconds(),
        minSA = now.getMinutes(),
        houSA = now.getHours();
      let output = '';
      let mess = message;
      output += `${hou}H ${min}M ${sec}S ${milli}ms CLOCK START\n`
      output += `${houOA}H ${minOA}M ${secOA}S ${milliOA}ms READ FILE\n`
      output += `${houSA}H ${minSA}M ${secOA}S ${milliOA}ms FILE WRITE\n`
      output += `${scoreAperture.getTime() - now.getTime()}ms to process.`
    message.reply("Calculating!").then(m => m.edit({embed: {
      color: 0xebe100,
      timestamp: new Date(),
      description: "Lag Panel",
      author: {
        name: client.user.username,
        value: client.user.avatarURL
      },
      fields: [
        {
          name: `:small_orange_diamond: Database I/O`,
          value: `${output}`
        },
        {
          name: `:small_orange_diamond: Server I/O`,
          value: `\`\`\`${m.createdTimestamp - mess.createdTimestamp}ms.\`\`\``,
          inline: true
        },
        {
          name: `:small_orange_diamond: RAM`,
          value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``,
          inline: true
        }
      ]
    }}))
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lag'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'ping',
  description: 'Diagnostic utility.',
  usage: 'ping'
};
