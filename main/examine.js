const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let TK = ":tickets:"
let CB = ":eye_in_speech_bubble:"
let LV = ":small_orange_diamond:"
let HL = ":large_orange_diamond:"
let QKEY = ":key2:"
let HDTK = ":pound:"

function returnAuthorMessage(client, message, params, person, sl, hl, w) {
  console.log("LAST STEP", person.id, sl, hl, w)
  var SabreLevelContent = `< LV ${sl.level} >\n`
  SabreLevelContent += `* TK ${sl.tickets}\n`
  SabreLevelContent += `* CB ${sl.chatBits}`
  var HyperLevelContent = `< HL ${hl.hlvl} >\n`
  HyperLevelContent += `> QK ${hl.spaceA}\n`
  HyperLevelContent += `* DT ${hl.spaceB}`

  message.author.send({embed: {
    color: 0x99185f,
    timestamp: new Date(),
    description: `Examine Tool (${settings.version})`,
    author: {
      name: person.tag,
      icon_url: person.avatarURL // could be person.user.avatarURL
    },
    fields: [
      {
        name: `Sabre Level Data`,
        value: `\`\`\`md\n${SabreLevelContent}\`\`\``,
        inline: true
      },
      {
        name: `Hyper Level Data`,
        value: `\`\`\`md\n${HyperLevelContent}\`\`\``,
        inline: true
      },
      {
        name: `Warnings`,
        value: `\`\`\`md\n${w}\`\`\``
      }
    ]
  }})
}

function handleHL(client, message, params, person, sl) {
  console.log("HANDLE START", person.id, sl)
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(hl => {
    if (!hl) {
      console.log(chalk.redBright("RECOVERY =>"), chalk.yellowBright(`Table Creation in Read Mode.`))
      sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [person.id, 0, 0, 0]).then(() => {
        sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(hl => {
          handleW(client, message, params, person, sl, hl)
        })
      })
    } else {
      handleW(client, message, params, person, sl, hl)

    }
  }).catch(() => {
    console.error;
    console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creation in Read Mode.`))
    sql.run(`CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)`).then(() => {
      sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB)`, [person.id, 0, 0, 0]);
    }).then(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(hl => {
        handleW(client, message, params, person, sl, hl)

      })
    })
  })
}


// there is no database handling, to condense space!
function handleW(client, message, params, person, sl, hl) {
  sql.get(`SELECT * FROM warning WHERE userId = "${person.id}"`).then(w => {
    var wOut = '';
    if (!w) {
      wOut += `> This user was never warned.`
    } else {
      wOut += `< Last Warned on ${w.date} (x${w.times}) >`
    }
    returnAuthorMessage(client, message, params, person, sl, hl, wOut)
  }).catch(() => {
    var wOut = '* Database Read Error'
    returnAuthorMessage(client, message, params, person, sl, hl, wOut)
  })
}

exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined || message.mentions.members.first() === null || !message.mentions.members.first()) {
    var person = message.mentions.members.first();
      sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(sl => {
        if (!sl) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.yellowBright(`Table Creation in Read Mode.`))
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [person.id, 0, 0, 1]).then(() => {
            sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(sl => {
              handleHL(client, message, params, person, sl)
            })
          })
        } else {
          handleHL(client, message, params, person, sl)
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creation in Read Mode.`))
        sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [person.id, 0, 0, 1]);
        }).then(() => {
          sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(sl => {
            handleHL(client, message, params, person, sl)
          })
        })
      })
  }

  /*
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  //let output = '';
  const millisJoined = new Date().getTime() - person.joinedAt.getTime();
  const daysJoined = Math.floor(millisJoined / 1000 / 60 / 60 / 24);
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    //output += `${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}\n`
    //output += `User joined ${daysJoined} Days Ago (${message.guild.name}).\n`
    message.author.send(`${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}\nUser joined: ${daysJoined} Days Ago (${message.guild.name})`)
  })
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(row => {
    if (!row) {
      message.author.send(`This user does not have a hyperlevel.`)
    } else {
      message.author.send(`HLVL: ${row.hlvl}, HQKY: ${row.spaceA}, HDTK: ${row.spaceB}.`)
    }
  })
  sql.get(`SELECT * FROM warning WHERE userId = "${person.id}"`).then(row => {
    if (!row) {
      message.author.send("This user has never received a warning.")
      //output += `This user has never received a warning.\n`
    } else {
      message.author.send(`Date Warned: ${row.date} - User has ${row.times} warnings.`)
      //output += `Date Warned: ${row.date} - User has ${row.times} warnings tallied.`
    }
  })
  //message.author.send(output)
  */

};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['inspect', 'exam', 'insp'],
  permLevel: 2
};

exports.help = {
  name: 'examine',
  description: 'Displays a Users Sabre Level Data / Warning Counter.',
  usage: 'examine [@user]'
};
