const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
const Tran = require('../sys/TRANSACTIONS.js')
let readL = "readL"
let readH = "readH"
let TK = ":tickets:"
let CB = ":eye_in_speech_bubble:"
let LV = ":small_orange_diamond:"
let HL = ":radioactive:"
let QKEY = ":key2:"
let HDTK = ":pound:"

function runMessage(row, hl, mess, barCol) {
  mess.reply("Calculating!").then(m => m.edit({embed: {
    color: barCol,
    timestamp: new Date(),
    description: `Sabre Levels; v${settings.version}`,
  /*  footer: {
      icon_url: client.user.avatarURL,
      text: client.user.username
    },*/ // Footer was removed: promise rejection from client
    author: {
      name: mess.member.displayName,
      icon_url: mess.author.avatarURL
    },
    fields: [
      {
        name: `${LV}: Level`,
        value: "```" + row.level + "```",
        inline: true
      },
      {
        name: `${TK}: Tickets`,
        value: "```" + row.tickets + "```",
        inline: true
      },
      {
        name: `${CB}: Bytes`,
        value: "```" + row.chatBits + "```",
        inline: true
      },
      {
        name: `${HL}: Hyperlevel`,
        value: `\`\`\`diff\n+ ${hl.hlvl}\`\`\``,
        inline: true
      },
      {
        name: `${QKEY}: Quest Keys`,
        value: `\`\`\`diff\n+ ${hl.spaceA}\`\`\``,
        inline: true
      },
      {
        name: `${HDTK}: Dark Tickets`,
        value: `\`\`\`diff\n+ ${hl.spaceB}\`\`\``,
        inline: true
      },
      {
        name: "Ranking for: " + mess.author.tag + "\u200b",
        value: `System returned message in ${m.createdTimestamp - mess.createdTimestamp}ms.`
      }
    ]
  }}))
}

function handleHL(r, mess, barCol) {
  var uid = mess.author;
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(h => {
    if (!h) {
      console.log(chalk.redBright("RECOVERY =>"), chalk.yellowBright(`Table Creation in Read Mode.`))
      sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [uid.id, 0, 0, 0]).then(() => {
        sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(h => {
          runMessage(r, h, mess, barCol)
        })
      })
    } else {
      runMessage(r, h, mess, barCol)

    }
  }).catch(() => {
    console.error;
    console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creation in Read Mode.`))
    sql.run(`CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)`).then(() => {
      sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB)`, [uid.id, 0, 0, 0]);
    }).then(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(h => {
        runMessage(r, h, mess, barCol)

      })
    })
  })
}

exports.run = (client, message, params) => {
  if (!uid || uid === undefined) var uid = message.author; // therefor goes by message
  if (message.member === null) return;
  const permlvl = client.elevation(message)
  if (permlvl === 0) {
    var barCol = 0x36786A
  } else if (permlvl === 1) {
    var barCol = 0x366394
  } else if (permlvl === 2) {
    var barCol = 0x802D32
  } else if (permlvl === 3) {
    var barCol = 0x992D22
  } else if (permlvl === 4) {
    var barCol = 0x980098
  }
  let mess = message
  let keep = message

  //var row = Tran(message, 'readL', null, message.author, params)

  //var hl = Tran(message, 'readH', null, message.author, params)

  sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
    if (!r) {
      console.log(chalk.redBright("RECOVERY =>"), chalk.yellowBright(`Table Creation in Read Mode.`))
      sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [uid.id, 0, 0, 1]).then(() => {
        sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
          handleHL(r, mess, barCol)
        })
      })
    } else {
      handleHL(r, mess, barCol)
    }
  }).catch(() => {
    console.error;
    console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creation in Read Mode.`))
    sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
      sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [uid.id, 0, 0, 1]);
    }).then(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
        handleHL(r, mess, barCol)
      })
    })
  })


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels2', 'lvl2', 'rank2'],
  permLevel: 4
};

exports.help = {
  name: 'levelNew',
  description: 'Displays a user\'s Sabre Level.',
  usage: 'levelNew'
};
