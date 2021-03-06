const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/score.sqlite");

const ActFour = (['1', '2', '3', '4'])
const ActFive = (['1', '2', '3', '4', '5'])
const ActSix = (['1', '2', '3', '4', '5', '6'])
const ActTen = (['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

var mach = "Autonomous Sparring Mechanism"
var RTe = "Reply time expired."

var DLText = `\n`;
DLText += `:one: The ${mach} will have **no barriers.**\n`
DLText += `:two: The ${mach} will have a **Class I Barrier** capable of defending against basic psychic attacks.\n`
DLText += `:three: The ${mach} will have a **Class II Barrier** capable of defending against light attacks.\n`
DLText += `:four: The ${mach} will have a **Class III Barrier** capable of defending against strong attacks.\n`
DLText += `:five: The ${mach} will have a **Class III Barrier** and **Regenerative Capability** for maximum difficulty.\n`
DLText += `:six: The ${mach} will have a **Class IV Barrier**, A barrier with the capacity of attacking on its own upon attack.\n`

var SPDText = `\n`;
SPDText += `:one: The ${mach} will stay as **still as a tree.**\n`
SPDText += `:two: The ${mach} will **walk around somewhat casually.**\n`
SPDText += `:three: The ${mach} will **run around.**\n`
SPDText += `:four: The ${mach} will **sprint like Jackie Chan on drugs.**\n`
SPDText += `:five: The ${mach} will be capable of **flash-stepping.** Good luck.\n`

var ATKText = `\n`;
ATKText += `:one: The ${mach} **cannot attack.**\n`
ATKText += `:two: The ${mach} **hits with a long toilet paper roll.**\n`
ATKText += `:three: The ${mach} **hits with greater force.** Like Jackie Chan.\n`
ATKText += `:four: The ${mach} **materializes close-range weaponry.** Hold onto your drink, bucko.\n`
ATKText += `:five: The ${mach} **can use long-range attacks (like elements) in moderation.** Kinda like Super Saiyan Goku.\n`
ATKText += `:six: The ${mach} **uses close and long range attacks, elemental attacks, and kinesis.** All that, and it still won't kill you (but it'll hurt... a lot.)`

var INTText = `\n`;
INTText += `:one: The ${mach} **is dumbfounded.** It probably can't dodge anything, and really has no idea what it's doing (but still follows guidelines). It might hit you with shear luck.\n`
INTText += `:two: The ${mach} **posesses average intelligence.** A smarter and more patient cookie. It can dodge stuff, just don't expect it to do math.\n`
INTText += `:three: The ${mach} **is a master of its domain.** A slightly dumber Whis.\n`
INTText += `:four: The ${mach} **is like facing a Jedi Master.** Oh, and it can now use flight and illusions. Seriously, get out your lucky rabbit's foot.\n`
INTText += `:five: The ${mach} **increases in difficulty and adapts to the user.** This would be suicide, if it were allowed to kill you that is.\n`

function Tally(message) {
  setTimeout(() => {
    sql.get(`SELECT * FROM SparComp WHERE userId = "masterstat"`).then(r => {
      if (!r) {
        sql.run(`INSERT INTO SparComp (userId, record) VALUES (?, ?)`, ["masterstat", 1])
      } else {
        sql.run(`UPDATE SparComp SET record = "${r.record*1 + 1}" WHERE userId = "masterstat"`)
      }
    }).catch(() => {
      console.error;
      console.log(chalk.redBright("RECOVERY =>"), "New DB for Masterstat in SparComp added.")
      sql.run(`CREATE TABLE IF NOT EXISTS SparComp (userId TEXT, record INTEGER)`).then(() => {
        sql.run(`INSERT INTO SparComp (userId, record)`, ["masterstat", 1])
      })
    })
  }, 2000)
  setTimeout(() => {
    sql.get(`SELECT * FROM SparComp WHERE userId = "${message.author.id}"`).then(r => {
      if (!r) {
        sql.run(`INSERT INTO SparComp (userId, record) VALUES (?, ?)`, [message.author.id, 1])
      } else {
        sql.run(`UPDATE SparComp SET record = "${r.record*1 + 1}" WHERE userId = "${message.author.id}"`)
      }
    }).catch(() => {
      console.error;
      console.log(chalk.redBright("RECOVERY =>"), "New DB for User in SparComp added.")
      sql.run(`CREATE TABLE IF NOT EXISTS SparComp (userId TEXT, record INTEGER)`).then(() => {
        sql.run(`INSERT INTO SparComp (userId, record)`, [message.author.id, 1])
      })
    })
  }, 4000)
}

module.exports = (message) =>  {
    message.reply(`Please state a time limit between 1-10 minutes.`)
    message.channel.awaitMessages(TL => TL.author.id === message.author.id && ActTen.some(word => TL.content.startsWith(word)), {
      max: 1,
      time: 60000,
      errors: ['time'],
    })
    .then(FinishedTime => {
      LimitQuery = FinishedTime.first().content;
      if (LimitQuery === "1") {
        var limiter = 60000
      } else if (LimitQuery === "2") {
        var limiter = 120000
      } else if (LimitQuery === "3") {
        var limiter = 180000
      } else if (LimitQuery === "4") {
        var limiter = 240000
      } else if (LimitQuery === "5") {
        var limiter = 300000
      } else if (LimitQuery === "6") {
        var limiter = 360000
      } else if (LimitQuery === "7") {
        var limiter = 420000
      } else if (LimitQuery === "8") {
        var limiter = 480000
      } else if (LimitQuery === "9") {
        var limiter = 540000
      } else if (LimitQuery === "10") {
        var limiter = 600000
      } else {
        message.reply(`\`Internal Error\``)
        return;
      }
      message.reply(`Please state the level of defense. ${DLText}`)
      message.channel.awaitMessages(DS => DS.author.id === message.author.id && ActSix.some(word => DS.content.startsWith(word)), {
        max: 1,
        time: 60000,
        errors: ['time'],
      })
      .then(() => {
        message.reply(`Please state the level of speed. ${SPDText}`)
        message.channel.awaitMessages(SS => SS.author.id === message.author.id && ActFive.some(word => SS.content.startsWith(word)), {
          max: 1,
          time: 60000,
          errors: ['time'],
        })
        .then(() => {
          message.reply(`Please state the level of attack. ${ATKText}`)
          message.channel.awaitMessages(AS => AS.author.id === message.author.id && ActSix.some(word => AS.content.startsWith(word)), {
            max: 1,
            time: 60000,
            errors: ['time'],
          })
          .then(() => {
            message.reply(`Please state the level of intelligence. ${INTText}`)
            message.channel.awaitMessages(IS => IS.author.id === message.author.id && ActFive.some(word => IS.content.startsWith(word)), {
              max: 1,
              time: 60000,
              errors: ['time'],
            })
            .then(() => {
              message.reply(`**your sparring specifications have been collected!** Good luck!`)
              console.log(`${mach} INVOKED FOR ${message.member.displayName} (${limiter}ms)`)
              setTimeout(() => {
                message.reply(`**Expiry!** The construct and ${mach} has been dematerialized.`)
                Tally(message);
                console.log(`${mach} DEMATERIALIZED FOR ${message.member.displayName} (${limiter}ms)`)
              }, limiter)
            })
            .catch(() => {
              console.error;
              console.log(`${mach} BREAK IS`)
              message.reply(`${RTe}`)
            })
          })
          .catch(() => {
            console.error;
            console.log(`${mach} BREAK AS`)
            message.reply(`${RTe}`)
          })
        })
        .catch(() => {
          console.error;
          console.log(`${mach} BREAK SS`)
          message.reply(`${RTe}`)
        })
      })
      .catch(() => {
        console.error;
        console.log(`${mach} BREAK DS`)
        message.reply(`${RTe}`)
      })
    })
    .catch(() => {
      console.error;
      console.log(`${mach} BREAK null`)
      message.reply(`${RTe}`)
    })
}
