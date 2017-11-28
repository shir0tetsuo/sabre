// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let noHS = new Set();

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

/*

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
              May add items. But quest items are good enough so far.
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

*/

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (noHS.has(message.author.id)) {
      return message.reply(`\`Slots are locked. Try again in a while.\``)
    } else {
      noHS.add(message.author.id)
      setTimeout(() => {
        noHS.delete(message.author.id)
      }, 1800000)
      if (hl.hlvl !== 0) {
        const cMath = Math.round(Math.random() * (2000 - 100) + 100); // return number between 100-2000
        if (cMath >= 1800) {
          var cName = 'Obtained 1 :key2:',
            cVal = `You can use the \`${settings.prefix}quest\` command with this key.`
            hSpaceAUpdate(message);
        } else if (cMath >= 1500) {
          var cName = 'Obtained 1 :pound:',
            cVal = `You can use the \`${settings.prefix}darkshop\` command with this ticket.`
            hSpaceBUpdate(message);
        } else if (cMath >= 1200) {
          var cName = `Obtained 3000 ${curren}`,
            cVal = `Lucky you`
            scoreUpTicket(message, 3000)
        } else if (cMath >= 1000) {
          var cName = `Obtained 8000 ${chatBit}`,
            cVal = `Lucky you`
            scoreUpBits(message, 8000)
        } else {
          var cName = 'Sorry',
            cVal = 'Nothing Obtained.'
        }
        message.channel.send({embed: {
          color: 0x4fe63b,
          timestamp: new Date(),
          author: {
            name: message.member.displayName,
            icon_url: message.author.avatarURL
          },
          fields: [
            {
              name: `${cName}`,
              value: `${cVal}`
            }
          ]
        }})
      } else {
        return message.reply(`\`ERROR\` HyperLevel isn't high enough.`)
      }
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hs'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'hyperslot',
  description: 'Win keys and dark tickets. (HL1)',
  usage: 'hyperslot'
};
