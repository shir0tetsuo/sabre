// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

const msgArray = [
  //  00  : New Quest
  'Area 1: Dark Forest'
]

function Rand(array) {
  return array[Math.floor(Math.random() * array.length)]
}
function loDam() {
  return Math.floor(Math.random() * (15 - 1) - 1)
}
function medDam() {
  return Math.floor(Math.random() * (33 - 16) - 16)
}
function hiDam() {
  return Math.floor(Math.random() * (50 - 33) - 33)
}

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  setTimeout(() => {
    sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
      sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
    })
  }, 2000)
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  setTimeout(() => {
    sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
    })
  }, 2000)
}
function hSpaceAUpdate(m) {
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      if (!hl) {
        return message.reply(`\`Internal Error\``)
      } else {
        sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + 1*1}" WHERE userId = "${m.author.id}"`)
        console.log(chalk.greenBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; +1 Key`))
      }
    })
  }, 2000)
}
function hSpaceBUpdate(m) {
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      if (!hl) {
        return message.reply(`\`Internal Error\``)
      } else {
        sql.run(`UPDATE hyperlevels SET spaceB = "${hl.spaceB*1 + 1*1}" WHERE userId = "${m.author.id}"`)
        console.log(chalk.greenBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; +1 Dark Ticket`))
      }
    })
  }, 2000)
}

function newQChapter(m) {
  setTimeout(() => {
    sql.get(`SELECT * FROM qchapter WHERE userId = "${m.author.id}"`).then(q => {
      if (!q) {
        m.reply(`\`WARN Table Creation\``)
        console.log(chalk.redBright(`New quest db for ${m.member.displayName}`))
        sql.run(`INSERT INTO qchapter (userId, chap, inBattle, micro, hp) VALUES (?, ?, ?, ?, ?)`, [m.author.id, 1, 0, 0, 100])
      }
    }).catch(() => {
      console.error;
      console.log(chalk.redBright(`Database qchapter for quests created.`))
      m.reply(`\`WARN Database Creation\``)
      sql.run(`CREATE TABLE IF NOT EXISTS qchapter (userId TEXT, chap INTEGER, inBattle INTEGER, micro INTEGER, hp INTEGER)`).then(() => {
        sql.run(`INSERT INTO qchapter (userId, chap, inBattle, micro, hp) VALUES (?, ?, ?, ?, ?)`, [m.author.id, 1, 0, 0, 100])
      })
    })
  }, 2000)
}

function updateChapterNum(m, chID) {
  if (!chID) var chID = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM qchapter WHERE userId = "${m.author.id}"`).then(q => {
      sql.run(`UPDATE qchapter SET chap = "${chID}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}
function updateChapterBattleState(m, state) {
  if (!state) var state = 0;
  setTimeout(() => {
    sql.get(`SELECT * FROM qchapter WHERE userId = "${m.author.id}"`).then(q => {
      sql.run(`UPDATE qchapter SET inBattle = "${state}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}
function updateChapterMicro(m, mID) {
  if (!mID) var mID = 0;
  setTimeout(() => {
    sql.get(`SELECT * FROM qchapter WHERE userId = "${m.author.id}"`).then(q => {
      sql.run(`UPDATE qchapter SET micro = "${mID}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}
function updateUserHP(m, hmod) {
  if (!hmod) var hmod = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM qchapter WHERE userId = "${m.author.id}"`).then(q => {
      sql.run(`UPDATE qchapter SET hp = "${q.hp*1 + hmod*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}

function hpGuage(hp) {
  var icoA = ':green_heart:',
    icoB = ':yellow_heart:',
    icoC = ':heart:',
    pfix = `\`HP: ${hp}\` `;
  // A = high HP, B = med HP, C = low HP
  if (hp >= 90) {
    return `${pfix}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}`
  }
  if (hp >= 80) {
    return `${pfix}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}`
  }
  if (hp >= 70) {
    return `${pfix}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}`
  }
  if (hp >= 60) {
    return `${pfix}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}${icoA}`
  }
  if (hp >= 50) {
    return `${pfix}${icoB}${icoB}${icoB}${icoB}${icoB}${icoB}`
  }
  if (hp >= 40) {
    return `${pfix}${icoB}${icoB}${icoB}${icoB}${icoB}`
  }
  if (hp >= 30) {
    return `${pfix}${icoB}${icoB}${icoB}${icoB}`
  }
  if (hp >= 20) {
    return `${pfix}${icoB}${icoB}${icoB}`
  }
  if (hp >= 10) {
    return `${pfix}${icoC}${icoC}`
  }
  if (hp >= 1) {
    return `${pfix}${icoC}`
  }
}

////////////////////////////////////////////////////////////////////////////////
// This is where the magic happens.
/*

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
if (chapter === 1)
  - Chapter Area
  - Chapter Encounter Math

*/
function questFloor(m, q, params) {
  let content = '';
  var cno = q.chap,
    cmi = q.micro,
    cbs = q.battleState,
    chp = q.hp,
    uin = params,
    message = m,
    uid = m.author.id;
  if (cno == 1 && cmi == 0) {
    content += `${hpGuage(chp)}\n`
    content += `You arrive in the Dark Forest.\n`
    content += `\`More to come\``
    m.reply(`${msgArray[0]}\n${content}`)
    updateChapterMicro(m, 1)
  }
  if (cno == 1 && cmi == 1) {
    content += `${hpGuage(chp)}\n`
    content += `You are in the Dark Forest.\n`
    content += `\`More to come\``
    m.reply(`${msgArray[0]}\n${content}`)
  }
}

exports.run = (client, message, params) => {
  newQChapter(message);
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.hlvl !== 0) {
      /*

        Command data here
        <Extensions go on top>

      */
      sql.get(`SELECT * FROM qchapter WHERE userId = "${message.author.id}"`).then(q => {
        var cno = q.chap,
          cmi = q.micro,
          chp = q.hp,
          cbs = q.battleState; // microstate affects quest key requirement
        if (cmi >= 1) {
          // NOTE: Continue quest
          //////////////////////////////////////////////////////////////////////
          questFloor(message, q, params);
          ///////////////////////////////////////////////////////////////////EOF
        } else {
          if (hl.spaceA*1 >= 1) {
            // NOTE: Incomplete! Add deduction for key and generate quest data.
            ////////////////////////////////////////////////////////////////////
            return message.reply(`1 :key2: was spent.`)
            questFloor(message, q, params);
            // deduct here
            /////////////////////////////////////////////////////////////////EOF
          } else {
            return message.reply(`\`ERROR\` You don't have a quest key.`)
          }
        }

      })
    } else {
      return message.reply(`\`ERROR\` HyperLevel isn't high enough.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hq'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'quest',
  description: '(HL1)',
  usage: 'quest'
};
