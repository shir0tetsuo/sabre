const sql = require("sqlite");
sql.open("../../score.sqlite");
const settings = require('../../settings.json');
const chalk = require('chalk');
////////////////////////////////////////////////////////////////////////////////
/*
 ////////// Transaction Master Reference Guide /////////////////////////////////
// REQUIRE the transaction file
 const Tran = require('../sys/TRANSACTIONS.js')

See level file

// WRITE a Transaction
  @message-user
  Tran(message, 'tk/cb/lv/hl/qkey/hdtk', 1, message.author, params)
  @mention
  var person = message.mentions.members.first()
  Tran(message, 'tk/cb/lv/hl/qkey/hdtk', 1, person, params)
*/
let readL = "readL"
let readH = "readH"
let TK = ":tickets:"
let CB = ":eye_in_speech_bubble:"
let LV = ":small_orange_diamond:"
let HL = ":radioactive:"
let QKEY = ":key2:"
let HDTK = ":pound:"

module.exports = (message, type, value, uid, client, params) => {
  // This makes sure it doesn't break
  //////////////////////////////////////////////////////////////////////////////
  if (!uid || uid === undefined) var uid = message.author; // therefor goes by message
  // uid = person NOT person.id
  if (!value || value === undefined) var value = 1;
  if (value == 1 && type === 'lv') var value = 0;
  if (value == 1 && type === 'hl') var value = 0;
  if (value !== -1) var value = Math.round(value)
  if (value >= 1000000000000000000) var value = 1000000000000000000
  //////////////////////////////////////////////////////////////////////////////
  console.log(chalk.gray(`${new Date()} transaction (${type} ${value}) ${message.channel.name} ${message.guild.name}`))

  ////////////////////////////////////////////////////////////////////////////////
  // Write Mode
  ////////////////////////////////////////////////////////////////////////////////
  if (type === "tk") {
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [uid.id, value * 1, 0, 1]);
          return;
        } else {
          if (r.tickets <= 0) {
            sql.run(`UPDATE scores SET tickets = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE scores SET tickets = "${r.tickets*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [uid.id, value * 1, 0, 1]);
        })
      })
    }, 2000)
  }
  if (type === "cb") {
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [uid.id, 1, 0, value * 1]);
          return;
        } else {
          if (r.chatBits * 1 <= 0) {
            sql.run(`UPDATE scores SET chatBits = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE scores SET chatBits = "${r.chatBits*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [uid.id, 1, 0, value * 1]);
        })
      })
    }, 2000)

  }
  if (type === "lv") {
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [uid.id, 1, value * 1, 1]);
          return;
        } else {
          if (r.level * 1 <= -1) {
            sql.run(`UPDATE scores SET level = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE scores SET level = "${r.level*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [uid.id, 1, value * 1, 1]);
        })
      })
    }, 2000)
  }
  if (type === "hl") {
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [uid.id, value * 1, 0, 0]);
          return;
        } else {
          if (r.hlvl * 1 <= -1) {
            sql.run(`UPDATE hyperlevels SET hlvl = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE hyperlevels SET hlvl = "${r.hlvl*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)`).then(() => {
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB)`, [uid.id, value * 1, 0, 0]);
        })
      })
    }, 2000)
  }
  if (type === "qkey") {
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [uid.id, 1, value * 1, 0]);
          return;
        } else {
          if (r.spaceA * 1 <= -1) {
            sql.run(`UPDATE hyperlevels SET spaceA = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE hyperlevels SET spaceA = "${r.spaceA*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)`).then(() => {
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB)`, [uid.id, 1, value * 1, 0]);
        })
      })
    }, 2000)
  }
  if (type === "hdtk") {
    setTimeout(() => {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB) VALUES (?, ?, ?, ?)`, [uid.id, 1, 0, value * 1]);
          return;
        } else {
          if (r.spaceB * 1 <= -1) {
            sql.run(`UPDATE hyperlevels SET spaceB = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE hyperlevels SET spaceB = "${r.spaceB*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS hyperlevels (userId TEXT, hlvl INTEGER, spaceA TEXT, spaceB TEXT)`).then(() => {
          sql.run(`INSERT INTO hyperlevels (userId, hlvl, spaceA, spaceB)`, [uid.id, 1, 0, value * 1]);
        })
      })
    }, 2000)
  }
  if (type === "sfWin") {
    setTimeout(() => {
      sql.get(`SELECT * FROM fighting WHERE userId = "${uid.id}"`).then(f => {
        if (!f) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright("Table Creation."))
          sql.run(`INSERT INTO fighting (userId, sfWin, sfLoss, questWin, questLoss) VALUES (?, ?, ?, ?, ?)`, [uid.id, value*1, 0, 0, 0]);
          return;
        } else {
          if (f.sfWin * 1 <= -1) {
            sql.run(`UPDATE fighting SET sfWin = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE fighting SET sfWin = "${sfWin*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creation.`))
        sql.run(`CREATE TABLE IF NOT EXISTS fighting (userId TEXT, sfWin INTEGER, sfLoss INTEGER, questWin INTEGER, questLoss INTEGER)`).then(() => {
          sql.run(`INSERT INTO fighting (userId, sfWin, sfLoss, questWin, questLoss)`, [uid.id, value*1, 0, 0, 0])
        })
      })
    }, 2000)
  }
}
