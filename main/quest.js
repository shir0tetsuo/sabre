// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let hkey = ":key2:"

/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
let qVendor = '\u2324' // ⌤
let qWarp = '\u2398'
let qUser = '\u24C5' // Ⓟ
let topLeft = '\u2554'
let topRight = '\u2557'
let botLeft = '\u255A'
let botRight = '\u255D'
let horz = '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550' // 10 spaces
let vert = '\u2551'
let lightshadeFill = '\u2591\u2591\u2591\u2591'
let lightshade = '\u2591'
let medshade = '\u2592'
let darkshade = '\u2593'
let mysteriousObject = '\u25A8'

function getKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 - keys*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}
function giveKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + keys*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}

function getColor(hl) {
  if (hl.hlvl >= 5) {
    return 0x5FEFBF
  } else if (hl.hlvl >= 0) {
    return 0x34d1a2
  }
}

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    if (message.author.id === settings.ownerid && params[0] === 'devmode' && params[1] >= 1) {
      giveKey(message, params[1])
      return message.reply(`\`Done.\``)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.spaceA*1 >= 1) {
      var header = '```md',
        footer = '```',
        questColor = getColor(hl);
      let content = '';
      content += `/* ${message.member.displayName} *\n`
      content += `< You spent 1 Quest Key >\n`
      content += `> HLVL: ${hl.hlvl}, HQKY: ${hl.spaceA*1 - 1}, HDTK: ${hl.spaceB}.\n\n`
      if (hl.hlvl >= 0) {
        content += `> ${topLeft}${horz}${topRight}\n`
        content += `> ${vert}${lightshadeFill}${qVendor}${lightshadeFill}${vert}\n`
        content += `> ${vert}${lightshadeFill}${qUser}${lightshadeFill}${vert}\n`
        content += `> ${botLeft}${horz}${botRight}\n`
      }
      content += `< ${qUser} = ${message.author.username}#${message.author.discriminator} >\n`


      message.reply({embed: {
        color: questColor,
        timestamp: new Date(),
        author: {
          name: `${client.user.username}'s Forest`,
          icon_url: client.user.avatarURL
        },
        footer: {
          text: `${message.author.username}#${message.author.discriminator}`
        },
        fields: [
          {
            name: `-1 ${hkey}: You seek adventures in the Dark Forest.`,
            value: `${header}\n${content}\n${footer}`
          }
        ]
      }})
      getKey(message, 1);
    } else {
      return message.reply(`\`ERROR\` You don't have any keys.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['q'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'quest',
  description: 'Let Sabre\'s Forest take you away. (HK1)',
  usage: 'quest\nPL4O :: quest devmode [num] = give keys'
};
